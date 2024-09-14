import { COIN, X } from "@/bitmaps";
import { BUTTONS, COLORS, TICK_INTERVAL } from "@/constants";
import { Bush, Cloud, Hill, Mario, QuestionBlock, Wall } from "@/entities";
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

        new QuestionBlock(8, 7),

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
