import "setimmediate";

import { COIN, X } from "@/bitmaps";
import {
  BUTTONS,
  COLORS,
  UPDATE_INTERVAL,
  UPDATES_PER_TICK,
} from "@/constants";
import {
  Block,
  Brick,
  Bush,
  Castle,
  Cloud,
  Flagpole,
  Hill,
  Mario,
  Pipe,
  QuestionBlock,
  Wall,
} from "@/entities";
import { Button, Entity, MS, Side, State } from "@/types";
import {
  clamp,
  gridUnits,
  gridUnitsPerSecondPerSecond,
  isMovable,
  oppositeSide,
  pixels,
} from "@/utils";

const EMPTY_BUTTONS = new Set<Button>();

export class Game {
  static initialTime = 400;

  static get initialState(): State {
    return {
      entities: [
        new Wall(0, 0, 69, 4),
        new Hill(0, 4, "large"),
        new Cloud(8, 12, "small"),
        new Bush(11, 4, "large"),
        new Hill(16, 4, "small"),
        new QuestionBlock(16, 7),
        new Cloud(19, 13, "small"),
        new Brick(20, 7),
        new QuestionBlock(21, 7),
        new Brick(22, 7),
        new QuestionBlock(22, 11),
        new Bush(23, 4, "small"),
        new QuestionBlock(23, 7),
        new Brick(24, 7),
        new Cloud(27, 12, "large"),
        new Pipe(28, 4, 2),
        new Cloud(36, 13, "medium"),
        new Pipe(38, 4, 3),
        new Bush(41, 4, "medium"),
        new Pipe(46, 4, 4),
        new Hill(48, 4, "large"),
        new Cloud(56, 12, "small"),
        new Pipe(57, 4, 4),
        new Bush(59, 4, "large"),
        new QuestionBlock(64, 8, false),
        new Hill(64, 4, "small"),
        new Cloud(67, 13, "small"),
        new Wall(71, 0, 15, 4),
        new Bush(71, 4, "small"),
        new Cloud(75, 12, "large"),
        new Brick(77, 7),
        new QuestionBlock(78, 7),
        new Brick(79, 7),
        new Brick(80, 11),
        new Brick(81, 11),
        new Brick(82, 11),
        new Brick(83, 11),
        new Brick(84, 11),
        new Cloud(84, 13, "medium"),
        new Brick(85, 11),
        new Brick(86, 11),
        new Brick(87, 11),
        new Bush(89, 4, "medium"),
        new Wall(89, 0, 64, 4),
        new Brick(91, 11),
        new Brick(92, 11),
        new Brick(93, 11),
        new Brick(94, 7),
        new Brick(94, 11),
        new Hill(96, 4, "large"),
        new Brick(100, 7),
        new Brick(101, 7),
        new Cloud(104, 12, "small"),
        new QuestionBlock(106, 7),
        new Bush(107, 4, "large"),
        new QuestionBlock(109, 7),
        new QuestionBlock(109, 11),
        new Hill(112, 4, "small"),
        new QuestionBlock(112, 7),
        new Cloud(115, 13, "small"),
        new Bush(119, 4, "small"),
        new Brick(119, 7),
        new Brick(121, 11),
        new Brick(122, 11),
        new Cloud(123, 12, "large"),
        new Brick(123, 11),
        new Brick(128, 11),
        new Brick(129, 11),
        new QuestionBlock(129, 11),
        new Brick(130, 11),
        new QuestionBlock(130, 11),
        new Brick(131, 11),
        new Cloud(132, 13, "medium"),
        new Block(134, 4),
        new Block(135, 4),
        new Block(135, 5),
        new Block(136, 4),
        new Block(136, 5),
        new Block(136, 6),
        new Bush(137, 4, "medium"),
        new Block(137, 4),
        new Block(137, 5),
        new Block(137, 6),
        new Block(137, 7),
        new Block(140, 4),
        new Block(140, 5),
        new Block(140, 6),
        new Block(140, 7),
        new Block(141, 4),
        new Block(141, 5),
        new Block(141, 6),
        new Block(142, 4),
        new Block(142, 5),
        new Block(143, 4),
        new Hill(144, 4, "large"),
        new Block(148, 4),
        new Block(149, 4),
        new Block(149, 5),
        new Block(150, 4),
        new Block(150, 5),
        new Block(150, 6),
        new Block(151, 4),
        new Block(151, 5),
        new Block(151, 6),
        new Block(151, 7),
        new Block(152, 4),
        new Cloud(152, 12, "small"),
        new Block(152, 5),
        new Block(152, 6),
        new Block(152, 7),
        new Wall(155, 0, 69, 4),
        new Block(155, 4),
        new Block(155, 5),
        new Block(155, 6),
        new Block(155, 7),
        new Block(156, 4),
        new Block(156, 5),
        new Block(156, 6),
        new Bush(157, 4, "small"),
        new Block(157, 4),
        new Block(157, 5),
        new Block(158, 4),
        new Hill(160, 4, "small"),
        new Pipe(163, 4, 2),
        new Cloud(163, 13, "small"),
        new Bush(167, 4, "small"),
        new Brick(168, 7),
        new Brick(169, 7),
        new QuestionBlock(170, 7),
        new Brick(171, 7),
        new Cloud(171, 12, "large"),
        new Pipe(179, 4, 2),
        new Cloud(180, 13, "medium"),
        new Block(181, 4),
        new Block(182, 4),
        new Block(182, 5),
        new Block(183, 4),
        new Block(183, 5),
        new Block(183, 6),
        new Block(184, 4),
        new Block(184, 5),
        new Block(184, 6),
        new Block(184, 7),
        new Block(185, 4),
        new Block(185, 5),
        new Block(185, 6),
        new Block(185, 7),
        new Block(185, 8),
        new Block(186, 4),
        new Block(186, 5),
        new Block(186, 6),
        new Block(186, 7),
        new Block(186, 8),
        new Block(186, 9),
        new Block(187, 4),
        new Block(187, 5),
        new Block(187, 6),
        new Block(187, 7),
        new Block(187, 8),
        new Block(187, 9),
        new Block(187, 10),
        new Block(188, 4),
        new Block(188, 5),
        new Block(188, 6),
        new Block(188, 7),
        new Block(188, 8),
        new Block(188, 9),
        new Block(188, 10),
        new Block(188, 11),
        new Block(189, 4),
        new Block(189, 5),
        new Block(189, 6),
        new Block(189, 7),
        new Block(189, 8),
        new Block(189, 9),
        new Block(189, 10),
        new Block(189, 11),
        new Hill(192, 4, "large"),
        new Block(198, 4),
        new Flagpole(198.4375, 5),
        new Cloud(200, 12, "small"),
        new Castle(202, 4),
        new Bush(205, 4, "small"),
        new Block(205, 4, false),
        new Hill(208, 4, "small"),
        new Cloud(211, 13, "small"),
        new Bush(215, 4, "small"),
        new Cloud(219, 12, "large"),

        new Mario(2.5625, 4, "small"),
      ].toSorted((a, b) => a.position.z - b.position.z),
      universe: {
        acceleration: {
          x: 0,
          y: gridUnitsPerSecondPerSecond(-75), // gravity
        },
        color: 0x4,
        length: {
          x: gridUnits(210),
          y: gridUnits(15),
        },
      },
      viewport: {
        length: {
          x: gridUnits(16),
          y: gridUnits(15),
        },
        position: {
          x: gridUnits(0),
          y: gridUnits(2),
        },
      },
    };
  }

  private buttons = new Set<Button>();
  private context: CanvasRenderingContext2D;
  private isPaused = false;
  private isStopped = false;
  private keys = new Set<string>();
  private numUpdatesSinceTick = 0;
  private prevLoopMs: MS = performance.now();
  private updateLagMs: MS = 0;

  private get isTicking(): boolean {
    return !this.isLost && !this.isWon;
  }

  coins = 0;
  isLost = false;
  isWon = false;
  keyBinding: Record<Button, Set<string>> = {
    a: new Set(["Shift", "z", "Z"]), //          run
    b: new Set([" ", "x", "X"]), //              jump
    down: new Set(["s", "S", "ArrowDown"]), //   crouch
    left: new Set(["a", "A", "ArrowLeft"]), //   left
    right: new Set(["d", "D", "ArrowRight"]), // right
    start: new Set(["Enter"]), //                pause
    up: new Set(["w", "W", "ArrowUp"]), //       -
  };
  level = 1;
  score = 0;
  state = Game.initialState;
  time = Game.initialTime;
  world = 1;

  constructor(canvas: HTMLCanvasElement) {
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
      this.updateLagMs += elapsedMs;

      while (this.updateLagMs >= UPDATE_INTERVAL) {
        this.updateLagMs -= UPDATE_INTERVAL;

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

    // render universe
    this.context.canvas.height = this.state.viewport.length.y;
    this.context.canvas.width = this.state.viewport.length.x;
    this.context.canvas.style.backgroundColor =
      COLORS[this.state.universe.color];

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
    this.context.fillText(`${this.world}-${this.level}`, pixels(11), pixels(9));

    this.context.translate(gridUnits(3) + pixels(10), 0);
    this.context.fillText("TIME", 0, 0);
    this.context.fillText(
      String(this.time).padStart(3, "0"),
      pixels(6),
      pixels(9)
    );

    this.context.restore();

    // render entities
    for (let i = 0; i !== this.state.entities.length; i++) {
      const entity = this.state.entities[i];

      // only render entities within viewport, including a buffer to account for entities that may draw outside of their hitbox
      if (
        entity.position.x + entity.length.x <
          this.state.viewport.position.x - gridUnits(1) ||
        entity.position.x >
          this.state.viewport.position.x +
            this.state.viewport.length.x +
            gridUnits(1) ||
        entity.position.y + entity.length.y <
          this.state.viewport.position.y - gridUnits(1) ||
        entity.position.y >
          this.state.viewport.position.y +
            this.state.viewport.length.y +
            gridUnits(1)
      ) {
        continue;
      }

      this.context.save();
      this.context.translate(
        entity.position.x - this.state.viewport.position.x,
        this.state.viewport.length.y +
          this.state.viewport.position.y -
          entity.position.y -
          entity.length.y
      );

      entity.render(this.context);

      this.context.restore();
    }
  };

  private update = (): void => {
    // update time
    if (this.isTicking) {
      this.numUpdatesSinceTick++;

      if (this.numUpdatesSinceTick === UPDATES_PER_TICK) {
        this.numUpdatesSinceTick = 0;
        this.time--;

        if (this.time === 0) {
          this.isLost = true;
        }
      }
    }

    const buttons = this.isTicking ? this.buttons : EMPTY_BUTTONS;
    const entities: Entity[] = [];

    // only update entities within viewport
    for (let i = 0; i !== this.state.entities.length; i++) {
      const entity = this.state.entities[i];

      if (
        entity.position.x <
          this.state.viewport.position.x +
            this.state.viewport.length.x +
            gridUnits(2) &&
        entity.position.x + entity.length.x >
          this.state.viewport.position.x - gridUnits(2)
      ) {
        entities.push(entity);
      }
    }

    // apply acceleration
    for (let i = 0; i !== this.state.entities.length; i++) {
      const entity = this.state.entities[i];

      if (isMovable(entity)) {
        entity.velocity.x += entity.acceleration.x * UPDATE_INTERVAL;
        entity.velocity.y += entity.acceleration.y * UPDATE_INTERVAL;

        // apply gravity
        // movableEntity.velocity.y += this.state.universe.acceleration.y * UPDATE_INTERVAL;
      }
    }

    // @todo collision detection

    for (let i = 0; i !== this.state.entities.length; i++) {
      const entity = this.state.entities[i];

      if (isMovable(entity)) {
        // apply velocity
        entity.position.x += Math.trunc(entity.velocity.x * UPDATE_INTERVAL);
        entity.position.y += Math.trunc(entity.velocity.y * UPDATE_INTERVAL);
      }

      // update viewport
      if (entity instanceof Mario) {
        const entityCenterX = entity.position.x + entity.length.x / 2;
        const viewportCenterX =
          this.state.viewport.position.x + this.state.viewport.length.x / 2;
        const maxViewportPositionX =
          this.state.universe.length.x - this.state.viewport.length.x;

        // follow entity with viewport
        if (entityCenterX > viewportCenterX) {
          this.state.viewport.position.x = clamp(
            entityCenterX - this.state.viewport.length.x / 2,
            this.state.viewport.position.x,
            maxViewportPositionX
          );
        }

        const minPositionX = this.state.viewport.position.x;
        const maxPositionX =
          this.state.viewport.position.x +
          this.state.viewport.length.x -
          entity.length.x;

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

      entity.update?.(this.time, this.numUpdatesSinceTick, buttons);
    }
  };

  pause = (): void => {
    this.isPaused = true;
  };

  reset = (): void => {
    this.coins = 0;
    this.isLost = false;
    this.isPaused = false;
    this.isWon = false;
    this.level = 1;
    this.prevLoopMs = performance.now();
    this.score = 0;
    this.state = Game.initialState;
    this.time = Game.initialTime;
    this.updateLagMs = 0;
    this.world = 1;

    this.context.canvas.focus();
  };

  start = (): void => {
    this.context.canvas.addEventListener("keydown", this.onKeyDown);
    this.context.canvas.addEventListener("keyup", this.onKeyUp);

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
