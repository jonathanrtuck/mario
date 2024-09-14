import "setimmediate";

import { Button, MS, State } from "@/types";
import { gridUnits, gridUnitsPerSecondPerSecond } from "@/utils";

export class Game {
  static initialTime = 400;

  static get initialState(): State {
    return {
      entities: [],
      universe: {
        acceleration: {
          x: 0,
          y: gridUnitsPerSecondPerSecond(-64),
          z: 0,
        },
        color: 0x4,
        length: {
          x: gridUnits(210),
          y: gridUnits(15),
          z: 6,
        },
      },
      viewport: {
        length: {
          x: gridUnits(16),
          y: gridUnits(15),
          z: 6,
        },
        position: {
          x: 0,
          y: gridUnits(2),
          z: -4,
        },
      },
    };
  }

  private buttons = new Set<Button>();
  private context: CanvasRenderingContext2D;
  private numUpdatesSinceRender = 0;
  private numUpdatesSinceTick = 0;
  private pauseTime: MS | null = null;
  private prevUpdateTime: MS | null = null;
  private stopTime: MS | null = null;

  coins: number;
  isLost: boolean;
  isWon: boolean;
  keyBinding: Record<Button, Set<string>> = {
    a: new Set(["Shift", "z", "Z"]), // run
    b: new Set([" ", "x", "X"]), // jump
    down: new Set(["s", "S", "ArrowDown"]), // crouch
    left: new Set(["a", "A", "ArrowLeft"]), // left
    right: new Set(["d", "D", "ArrowRight"]), // right
    start: new Set(["Enter"]), // pause
    up: new Set(["w", "W", "ArrowUp"]), // [nothing]
  };
  level: number;
  score: number;
  state: State;
  time: number;
  world: number;

  get isPaused(): boolean {
    return this.pauseTime !== null;
  }
  get isStopped(): boolean {
    return this.stopTime !== null;
  }
  get isTicking(): boolean {
    return !this.isLost && !this.isWon;
  }

  constructor(canvas: HTMLCanvasElement) {
    this.coins = 0;
    this.context = canvas.getContext("2d")!;
    this.isLost = false;
    this.isWon = false;
    this.level = 1;
    this.score = 0;
    this.state = Game.initialState;
    this.time = Game.initialTime;
    this.world = 1;
  }

  private lose = (): void => {
    this.isLost = true;
  };

  private onKeyDown = (e: KeyboardEvent): void => {
    //
  };

  private onKeyUp = (e: KeyboardEvent): void => {
    //
  };

  private render = (): void => {
    //
  };

  // @recursive
  private update = (): void => {
    //
  };

  private win = (): void => {
    this.isWon = true;
  };

  pause = (): void => {
    this.pauseTime = performance.now();
  };

  reset = (): void => {
    this.coins = 0;
    this.isLost = false;
    this.isWon = false;
    this.level = 1;
    this.pauseTime = null;
    this.score = 0;
    this.state = Game.initialState;
    this.stopTime = null;
    this.time = Game.initialTime;
    this.world = 1;
  };

  start = (): void => {
    this.context.canvas.addEventListener("keydown", this.onKeyDown);
    this.context.canvas.addEventListener("keyup", this.onKeyUp);
    this.context.canvas.focus();

    this.coins = 0;
    this.isLost = false;
    this.isWon = false;
    this.level = 1;
    this.prevUpdateTime = performance.now();
    this.score = 0;
    this.state = Game.initialState;
    this.stopTime = null;
    this.time = Game.initialTime;
    this.world = 1;

    this.update();
  };

  stop = (): void => {
    this.context.canvas.removeEventListener("keydown", this.onKeyDown);
    this.context.canvas.removeEventListener("keyup", this.onKeyUp);

    this.pauseTime = null;
    this.stopTime = performance.now();
  };

  unpause = (): void => {
    if (this.pauseTime !== null && this.prevUpdateTime !== null) {
      this.prevUpdateTime =
        performance.now() - (this.pauseTime - this.prevUpdateTime);
      this.pauseTime = null;
    }
  };
}
