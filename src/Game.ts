import { COIN, X } from "@/bitmaps";
import { BUTTONS, COLORS, TICK_INTERVAL } from "@/constants";
import {
  Block,
  Brick,
  Bush,
  Cloud,
  Hill,
  Mario,
  Pipe,
  QuestionBlock,
  Wall,
} from "@/entities";
import { Button, MS, State } from "@/types";
import { gridUnits, isControllable, pixels } from "@/utils";

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
        new Cloud(200, 12, "small"),
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
          y: -1, // gravity
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
          x: 0,
          y: gridUnits(2),
        },
      },
    };
  }

  private animationFrameRequest: ReturnType<
    typeof requestAnimationFrame
  > | null = null;
  private buttons = new Set<Button>();
  private context: CanvasRenderingContext2D;
  private pauseMs: MS | null = null;
  private prevTickMs: MS | null = null;
  private prevUpdateMs: MS | null = null;
  private stopMs: MS | null = null;

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

  get isPaused(): boolean {
    return this.pauseMs !== null;
  }
  get isStopped(): boolean {
    return this.stopMs !== null;
  }
  get isTicking(): boolean {
    return !this.isLost && !this.isWon;
  }

  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext("2d")!;
  }

  private onKeyDown = (e: KeyboardEvent): void => {
    for (const button of BUTTONS) {
      if (this.keyBinding[button].has(e.key)) {
        e.preventDefault();

        if (button === "start") {
          (this.isPaused ? this.unpause : this.pause)();
        } else if (!this.buttons.has(button)) {
          this.buttons.add(button);

          for (const entity of this.state.entities) {
            if (isControllable(entity)) {
              entity.press?.(button, this.buttons);
            }
          }
        }
      }
    }
  };

  private onKeyUp = (e: KeyboardEvent): void => {
    for (const button of BUTTONS) {
      if (this.keyBinding[button].has(e.key)) {
        e.preventDefault();

        if (this.buttons.has(button)) {
          this.buttons.delete(button);

          for (const entity of this.state.entities) {
            if (isControllable(entity)) {
              entity.release?.(button, this.buttons);
            }
          }
        }
      }
    }
  };

  private render = (now: MS): void => {
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
    for (const entity of this.state.entities) {
      // only render entities within viewport
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

      entity.render(this.context, now);

      this.context.restore();
    }
  };

  // @recursive
  private update = (): void => {
    const now = Date.now();
    const elapsedMs = now - this.prevUpdateMs!;

    // update time
    if (now - this.prevTickMs! >= TICK_INTERVAL) {
      this.prevTickMs = now;
      this.time--;

      if (this.time === 0) {
        // @todo lose
      }
    }

    // @todo loop through each elapsedMs and detect collisions, update entities

    this.render(now);
    this.prevUpdateMs = now;
    this.animationFrameRequest = requestAnimationFrame(this.update);
  };

  pause = (): void => {
    const now = Date.now();

    if (this.animationFrameRequest) {
      cancelAnimationFrame(this.animationFrameRequest);
    }

    this.pauseMs = now;
  };

  reset = (): void => {
    const now = Date.now();

    if (this.animationFrameRequest) {
      cancelAnimationFrame(this.animationFrameRequest);
    }

    this.coins = 0;
    this.isLost = false;
    this.isWon = false;
    this.level = 1;
    this.pauseMs = null;
    this.score = 0;
    this.state = Game.initialState;
    this.stopMs = null;
    this.time = Game.initialTime;
    this.world = 1;

    this.context.canvas.focus();

    this.prevTickMs = now;
    this.prevUpdateMs = now;
    this.animationFrameRequest = requestAnimationFrame(this.update);
  };

  start = (): void => {
    const now = Date.now();

    this.context.canvas.addEventListener("keydown", this.onKeyDown);
    this.context.canvas.addEventListener("keyup", this.onKeyUp);
    this.context.canvas.focus();

    this.prevTickMs = now;
    this.prevUpdateMs = now;
    this.animationFrameRequest = requestAnimationFrame(this.update);
  };

  stop = (): void => {
    const now = Date.now();

    if (this.animationFrameRequest) {
      cancelAnimationFrame(this.animationFrameRequest);
    }

    this.context.canvas.removeEventListener("keydown", this.onKeyDown);
    this.context.canvas.removeEventListener("keyup", this.onKeyUp);

    this.pauseMs = null;
    this.stopMs = now;
  };

  unpause = (): void => {
    const now = Date.now();

    if (this.pauseMs !== null) {
      this.prevTickMs = now - (this.pauseMs - (this.prevTickMs ?? 0));
      this.prevUpdateMs = now - (this.pauseMs - (this.prevUpdateMs ?? 0));
      this.animationFrameRequest = requestAnimationFrame(this.update);
      this.pauseMs = null;
    }
  };
}
