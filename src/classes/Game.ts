import "setimmediate";

import { COIN, X } from "@/bitmaps";
import { Level } from "@/classes";
import { BUTTONS, COLORS, FRAME_INTERVAL, FRAMES_PER_TICK } from "@/constants";
import { Mario } from "@/entities";
import { Button, Entity, Length, MS, Side } from "@/types";
import { clamp, gridUnits, isMovable, oppositeSide, pixels } from "@/utils";

export class Game {
  private buttons = new Set<Button>();
  private context: CanvasRenderingContext2D;
  private frameLagMs: MS = 0;
  private isPaused = false;
  private isStopped = false;
  private keys = new Set<string>();
  private prevLoopMs: MS = performance.now();

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
  level = new Level();
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
              if (!this.buttons.has(oppositeSide(button as Side) as Button)) {
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
                  oppositeSide(button as Side) === otherButton &&
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
    let offsetX = 0;
    for (let i = 0; i !== this.level.entities.length; i++) {
      const entity = this.level.entities[i];

      if (entity instanceof Mario) {
        if (
          entity.velocity.x > 0 &&
          entity.position.x + entity.length.x / 2 ===
            this.level.position.x + this.length.x / 2
        ) {
          offsetX = Math.trunc(entity.velocity.x * this.frameLagMs);
        }

        break;
      }
    }
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
        positionX - this.level.position.x - offsetX,
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

    // only update entities within viewport
    for (let i = 0; i !== this.level.entities.length; i++) {
      const entity = this.level.entities[i];

      if (
        entity.position.x <
          this.level.position.x + this.length.x + gridUnits(2) &&
        entity.position.x + entity.length.x >
          this.level.position.x - gridUnits(2)
      ) {
        entities.push(entity);
      }
    }

    // apply acceleration
    for (let i = 0; i !== this.level.entities.length; i++) {
      const entity = this.level.entities[i];

      if (isMovable(entity)) {
        entity.velocity.x += entity.acceleration.x * FRAME_INTERVAL;
        entity.velocity.y += entity.acceleration.y * FRAME_INTERVAL;

        // apply gravity
        // entity.velocity.y += this.state.universe.acceleration.y * UPDATE_INTERVAL;
      }
    }

    // @todo collision detection

    for (let i = 0; i !== this.level.entities.length; i++) {
      const entity = this.level.entities[i];

      if (isMovable(entity)) {
        // apply velocity
        entity.position.x += Math.trunc(entity.velocity.x * FRAME_INTERVAL);
        entity.position.y += Math.trunc(entity.velocity.y * FRAME_INTERVAL);
      }

      // update viewport
      if (entity instanceof Mario) {
        const entityCenterX = entity.position.x + entity.length.x / 2;
        const viewportCenterX = this.level.position.x + this.length.x / 2;
        const maxViewportPositionX = this.level.length.x - this.length.x;

        // follow entity with viewport
        if (entityCenterX > viewportCenterX) {
          this.level.position.x = clamp(
            entityCenterX - this.length.x / 2,
            this.level.position.x,
            maxViewportPositionX
          );
        }

        const minPositionX = this.level.position.x;
        const maxPositionX =
          this.level.position.x + this.length.x - entity.length.x;

        // prevent entity from overflowing viewport
        if (entity.position.x < minPositionX) {
          entity.position.x = minPositionX;

          if (entity.velocity.x < 0) {
            entity.velocity.x = 0;
          }
        } else if (entity.position.x > maxPositionX) {
          entity.position.x = maxPositionX;

          if (entity.velocity.x > 0) {
            entity.velocity.x = 0;
          }
        }
      }

      entity.update?.(this.level.frame, this.buttons);
    }
  };

  pause = (): void => {
    this.isPaused = true;
  };

  reset = (): void => {
    this.coins = 0;
    this.frameLagMs = 0;
    this.isPaused = false;
    this.level = new Level();
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
