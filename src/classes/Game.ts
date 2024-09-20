import "setimmediate";

import { COIN, X } from "@/bitmaps";
import { Level } from "@/classes";
import { BUTTONS, COLORS, FRAME_INTERVAL, FRAMES_PER_TICK } from "@/constants";
import { Mario } from "@/entities";
import {
  Button,
  CollidableEntity,
  Collision,
  Entity,
  Length,
  MovableEntity,
  MS,
  Position,
  Side,
} from "@/types";
import {
  clamp,
  getCollision,
  gridUnits,
  isCollidable,
  isMovable,
  opposite,
  pixels,
} from "@/utils";

export class Game {
  private buttons = new Set<Button>();
  private context: CanvasRenderingContext2D;
  private frameLagMs: MS = 0;
  private isPaused = false;
  private isStopped = false;
  private keys = new Set<string>();
  private prevLoopMs: MS = performance.now();

  mario = new Mario();
  coins = 0;
  keyBinding: Record<Button, Set<string>> = {
    a: new Set(["Shift", "z", "Z"]), //          run
    b: new Set([" ", "x", "X"]), //              jump
    down: new Set(["s", "S", "ArrowDown"]), //   crouch
    left: new Set(["a", "A", "ArrowLeft"]), //   left
    right: new Set(["d", "D", "ArrowRight"]), // right
    start: new Set(["Enter"]), //                pause
    up: new Set(["w", "W", "ArrowUp"]), //       -
  };
  length: Length = {
    x: gridUnits(16),
    y: gridUnits(15),
  };
  level = new Level(this.mario);
  // lives = 3;
  score = 0;

  constructor(canvas: HTMLCanvasElement) {
    canvas.height = this.length.y;
    canvas.width = this.length.x;

    this.context = canvas.getContext("2d")!;
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    for (let i = 0; i !== BUTTONS.length; i++) {
      const button = BUTTONS[i];

      if (this.keyBinding[button].has(e.key)) {
        e.preventDefault();

        if (!this.keys.has(e.key)) {
          switch (button) {
            case "a":
            case "b":
              this.buttons.add(button);
              break;
            case "down":
            case "left":
            case "right":
            case "up":
              if (!this.buttons.has(opposite(button as Side) as Button)) {
                this.buttons.add(button);
              }
              break;
            case "start":
              (this.isPaused ? this.unpause : this.pause)();
              break;
          }

          this.keys.add(e.key);
        }

        break;
      }
    }
  };

  private onKeyUp = (e: KeyboardEvent): void => {
    for (let i = 0; i !== BUTTONS.length; i++) {
      const button = BUTTONS[i];

      if (this.keyBinding[button].has(e.key)) {
        e.preventDefault();

        if (this.keys.has(e.key)) {
          switch (button) {
            case "a":
            case "b":
              this.buttons.delete(button);
              break;
            case "down":
            case "left":
            case "right":
            case "up":
              this.buttons.delete(button);

              for (let j = 0; j !== BUTTONS.length; j++) {
                const otherButton = BUTTONS[j];

                if (otherButton === button) {
                  continue;
                }

                if (
                  opposite(button as Side) === otherButton &&
                  this.keys.intersection(this.keyBinding[otherButton]).size
                ) {
                  this.buttons.add(otherButton);
                }
              }
              break;
            case "start":
              (this.isPaused ? this.unpause : this.pause)();
              break;
          }

          this.keys.delete(e.key);
        }

        break;
      }
    }
  };

  // @recursive
  // @see https://gameprogrammingpatterns.com/game-loop.html
  private loop = (): void => {
    if (this.isStopped) {
      return;
    }

    if (!this.isPaused) {
      const now = performance.now();
      const elapsedMs = now - this.prevLoopMs;

      this.prevLoopMs = now;
      this.frameLagMs += elapsedMs;

      while (this.frameLagMs >= FRAME_INTERVAL) {
        this.frameLagMs -= FRAME_INTERVAL;

        this.update();
      }

      this.render();
    }

    // this prevents blocking the main thread, as opposed to something like `while (true) {…}`
    // @todo move this into a webworker instead?
    setImmediate(this.loop);
  };

  private render = (): void => {
    this.context.reset();

    // render HUD
    this.context.save();
    this.context.font = `${pixels(11)}px PixelEmulator`;
    this.context.fillStyle = COLORS[0x2];
    this.context.translate(0, pixels(12));

    this.context.translate(pixels(24), 0);
    this.context.fillText("MARIO", 0, 0);
    this.context.fillText(String(this.score).padStart(6, "0"), 0, pixels(9));

    this.context.translate(gridUnits(4) + pixels(4), 0);
    this.context.drawImage(COIN, 0, pixels(9), pixels(5), pixels(-8));
    this.context.drawImage(X, pixels(8), pixels(9), pixels(5), pixels(-5));
    this.context.fillText(
      String(this.coins).padStart(2, "0"),
      pixels(16),
      pixels(9)
    );

    this.context.translate(gridUnits(2) + pixels(18), 0);
    this.context.fillText("WORLD", 0, 0);
    this.context.fillText(
      `${this.level.world}-${this.level.level}`,
      pixels(11),
      pixels(9)
    );

    this.context.translate(gridUnits(3) + pixels(10), 0);
    this.context.fillText("TIME", 0, 0);
    this.context.fillText(
      String(this.level.time).padStart(3, "0"),
      pixels(6),
      pixels(9)
    );

    this.context.restore();

    // render entities
    const frameLagOffsetX =
      this.mario.velocity.x > 0 &&
      this.mario.position.x + this.mario.length.x / 2 ===
        this.level.position.x + this.length.x / 2
        ? Math.trunc(this.mario.velocity.x * this.frameLagMs)
        : 0;

    for (let i = 0; i !== this.level.entities.length; i++) {
      const entity = this.level.entities[i];

      // only render entities within viewport, including a buffer to account for entities that may draw outside of their hitbox
      if (
        entity.position.x + entity.length.x <
          this.level.position.x - gridUnits(1) ||
        entity.position.x >
          this.level.position.x + this.length.x + gridUnits(1) ||
        entity.position.y + entity.length.y <
          this.level.position.y - gridUnits(1) ||
        entity.position.y > this.level.position.y + this.length.y + gridUnits(1)
      ) {
        continue;
      }

      let positionX = entity.position.x;
      let positionY = entity.position.y;

      if (isMovable(entity)) {
        positionX += Math.trunc(entity.velocity.x * this.frameLagMs);
        positionY += Math.trunc(entity.velocity.y * this.frameLagMs);
      }

      this.context.save();
      this.context.translate(
        positionX - this.level.position.x - frameLagOffsetX,
        this.length.y + this.level.position.y - positionY - entity.length.y
      );

      entity.render(this.context);

      this.context.restore();
    }
  };

  private update = (): void => {
    this.level.frame++;

    // update time
    if (this.level.time !== 0 && this.level.frame % FRAMES_PER_TICK === 0) {
      this.level.time--;

      if (this.level.time === 0) {
        this.level.isLost = true;
      }
    }

    const entities: Entity[] = [];

    for (let i = 0; i !== this.level.entities.length; i++) {
      const entity = this.level.entities[i];

      // only update entities within viewport
      if (
        entity.position.x <
          this.level.position.x + this.length.x + gridUnits(2) &&
        entity.position.x + entity.length.x >
          this.level.position.x - gridUnits(2)
      ) {
        entities.push(entity);

        if (isMovable(entity)) {
          // apply acceleration
          entity.velocity.x += entity.acceleration.x * FRAME_INTERVAL;
          entity.velocity.y += entity.acceleration.y * FRAME_INTERVAL;

          // apply gravity
          entity.velocity.y = clamp(
            entity.velocity.y + this.level.acceleration.y * FRAME_INTERVAL,
            -(entity.vmax?.y ?? Infinity),
            Infinity
          );
        }
      }
    }

    let collisionsByEntity = new Map<MovableEntity, Collision[]>();
    let remainingMs = FRAME_INTERVAL;

    do {
      collisionsByEntity = new Map();

      const projectedPositions = new Array<Position>(entities.length);

      for (let i = 0; i !== entities.length; i++) {
        const entity = entities[i];

        // apply velocity
        projectedPositions[i] = isMovable(entity)
          ? {
              x:
                entity.position.x + Math.trunc(entity.velocity.x * remainingMs),
              y:
                entity.position.y + Math.trunc(entity.velocity.y * remainingMs),
              z: entity.position.z,
            }
          : entity.position;
      }

      // collision detection
      for (let i = 0; i !== entities.length; i++) {
        const entity = entities[i];

        if (isMovable(entity) && isCollidable(entity)) {
          for (let j = i + 1; j < entities.length; j++) {
            const otherEntity = entities[j];

            if (!isCollidable(otherEntity)) {
              continue;
            }

            const collision = getCollision(
              entity,
              projectedPositions[i],
              otherEntity,
              projectedPositions[j]
            );

            if (collision !== null) {
              collisionsByEntity.get(entity)?.push(collision) ??
                collisionsByEntity.set(entity, [collision]);
            }
          }
        }
      }

      if (collisionsByEntity.size) {
        let earliestCollisionTime = remainingMs;

        // get earliest collision(s) time
        collisionsByEntity.forEach((collisions) => {
          for (let i = 0; i !== collisions.length; i++) {
            if (collisions[i].time < earliestCollisionTime) {
              earliestCollisionTime = collisions[i].time;
            }
          }
        });

        // update entities' positions up to earliest collision(s)
        for (let i = 0; i !== entities.length; i++) {
          const entity = entities[i];

          if (isMovable(entity)) {
            entity.position = {
              x:
                entity.position.x +
                Math.trunc(entity.velocity.x * earliestCollisionTime),
              y:
                entity.position.y +
                Math.trunc(entity.velocity.y * earliestCollisionTime),
              z: entity.position.z,
            };
          }
        }

        // call relevant entities' `collide` method
        for (let i = 0; i !== entities.length; i++) {
          const entity = entities[i];

          if (!isCollidable(entity)) {
            continue;
          }

          const earliestCollisions: Collision[] = [];

          if (isMovable(entity)) {
            const entityCollisions = collisionsByEntity.get(entity);

            if (entityCollisions) {
              for (let j = 0; j !== entityCollisions.length; j++) {
                if (entityCollisions[j].time === earliestCollisionTime) {
                  earliestCollisions.push(entityCollisions[j]);
                }
              }
            }
          }

          // eslint-disable-next-line no-loop-func
          collisionsByEntity.forEach((collisions, movableEntity) => {
            if (
              (movableEntity as Entity) === (entity as Entity) ||
              !isCollidable(movableEntity) ||
              collisions.length === 0
            ) {
              return;
            }

            for (let j = 0; j !== collisions.length; j++) {
              if (collisions[j].time === earliestCollisionTime) {
                const sides = new Set<Side>();

                collisions[j].sides.forEach((side) => {
                  sides.add(opposite(side));
                });

                earliestCollisions.push({
                  entity: movableEntity,
                  sides,
                  time: earliestCollisionTime,
                });
              }
            }
          });

          if (earliestCollisions.length !== 0) {
            entity.collide?.(earliestCollisions);
          }
        }

        remainingMs -= earliestCollisionTime;
      } else {
        for (let i = 0; i !== entities.length; i++) {
          const entity = entities[i];

          if (isMovable(entity)) {
            entity.position = projectedPositions[i];
          }
        }

        remainingMs = 0;
      }
    } while (remainingMs > 0);

    // update entities
    for (let i = 0; i !== entities.length; i++) {
      entities[i].update?.(this.level.frame, this.buttons);
    }

    // follow mario with viewport
    if (
      this.mario.position.x + this.mario.length.x / 2 >
      this.level.position.x + this.length.x / 2
    ) {
      this.level.position.x = clamp(
        this.mario.position.x + this.mario.length.x / 2 - this.length.x / 2,
        this.level.position.x,
        this.level.length.x - this.length.x
      );
    }

    // prevent mario from horizontally overflowing viewport
    if (this.mario.position.x < this.level.position.x) {
      this.mario.position.x = this.level.position.x;

      if (this.mario.velocity.x < 0) {
        this.mario.velocity.x = 0;
      }
    } else if (
      this.mario.position.x >
      this.level.position.x + this.length.x - this.mario.length.x
    ) {
      this.mario.position.x =
        this.level.position.x + this.length.x - this.mario.length.x;

      if (this.mario.velocity.x > 0) {
        this.mario.velocity.x = 0;
      }
    }
  };

  pause = (): void => {
    this.isPaused = true;
  };

  reset = (): void => {
    this.mario = new Mario();
    this.coins = 0;
    this.frameLagMs = 0;
    this.isPaused = false;
    this.level = new Level(this.mario);
    this.prevLoopMs = performance.now();
    this.score = 0;

    this.context.canvas.style.backgroundColor = COLORS[this.level.color];
    this.context.canvas.focus();
  };

  start = (): void => {
    this.context.canvas.addEventListener("keydown", this.onKeyDown);
    this.context.canvas.addEventListener("keyup", this.onKeyUp);
    this.context.canvas.style.backgroundColor = COLORS[this.level.color];
    this.context.canvas.focus();

    this.prevLoopMs = performance.now();

    this.loop();
  };

  stop = (): void => {
    this.isStopped = true;

    this.context.canvas.removeEventListener("keydown", this.onKeyDown);
    this.context.canvas.removeEventListener("keyup", this.onKeyUp);
  };

  unpause = (): void => {
    this.isPaused = false;
  };
}
