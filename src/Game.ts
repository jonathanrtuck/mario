import { BUTTONS, COLORS } from "@/constants";
import { Mario, Wall } from "@/entities";
import { Button, MS, State } from "@/types";
import { gridUnits, isControllable } from "@/utils";

export class Game {
  static initialTime = 400;

  static get initialState(): State {
    return {
      entities: [new Wall(0, 0, 69, 4), new Mario(2.5625, 4, "small")].toSorted(
        (a, b) => a.position.z - b.position.z
      ),
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

        if (!this.buttons.has(button)) {
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

  private render = (): void => {
    this.context.reset();

    // render universe
    this.context.canvas.height = this.state.viewport.length.y;
    this.context.canvas.width = this.state.viewport.length.x;
    this.context.canvas.style.backgroundColor =
      COLORS[this.state.universe.color];

    // render text
    // @todo

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

      entity.render(this.context);

      this.context.restore();
    }
  };

  // @recursive
  private update = (): void => {
    const now = Date.now();
    const elapsedMs = now - this.prevUpdateMs!;

    // @todo

    this.render();
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

    this.prevUpdateMs = now;
    this.animationFrameRequest = requestAnimationFrame(this.update);
  };

  start = (): void => {
    const now = Date.now();

    this.context.canvas.addEventListener("keydown", this.onKeyDown);
    this.context.canvas.addEventListener("keyup", this.onKeyUp);
    this.context.canvas.focus();

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

    if (this.pauseMs !== null && this.prevUpdateMs !== null) {
      this.prevUpdateMs = now - (this.pauseMs - this.prevUpdateMs);
      this.animationFrameRequest = requestAnimationFrame(this.update);
      this.pauseMs = null;
    }
  };
}
