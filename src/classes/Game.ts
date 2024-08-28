import { State } from "@/classes";
import { BUTTONS, COLOR_BLUE } from "@/constants";
import { Mario, Wall } from "@/entities";
import { Button } from "@/types";
import { getRGBA, gridUnits } from "@/utils";

export class Game {
  static get initialState(): State {
    return new State({
      entities: [
        new Wall(0, 0, 69, 4),
        new Mario(2, 4, "small"),
        // …
      ],
      universe: {
        acceleration: {
          x: 0,
          y: -9.8,
          z: 0,
        },
        color: COLOR_BLUE,
        length: {
          x: gridUnits(210),
          y: gridUnits(15),
          z: 5,
        },
      },
      viewport: {
        length: {
          x: gridUnits(16),
          y: gridUnits(15),
          z: 5,
        },
        position: {
          x: 0,
          y: gridUnits(2),
          z: -4,
        },
      },
    });
  }

  private animationFrameRequest: ReturnType<
    typeof requestAnimationFrame
  > | null = null;
  private buttons = new Set<Button>();
  private prevUpdateTime: number = 0;

  context: CanvasRenderingContext2D;
  keyBinding: Record<Button, Set<string>> = {
    a: new Set(["z"]), // run
    b: new Set(["x"]), // jump
    down: new Set(["ArrowDown"]),
    left: new Set(["ArrowLeft"]),
    right: new Set(["ArrowRight"]),
    start: new Set(["Enter"]), // pause
    up: new Set(["ArrowUp"]), // nothing
  };
  state: State;

  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext("2d")!;
    this.state = Game.initialState;
  }

  private onKeyDown = (e: KeyboardEvent) => {
    for (let button of BUTTONS) {
      if (this.keyBinding[button].has(e.key)) {
        e.preventDefault();

        this.buttons.add(button);
      }
    }
  };

  private onKeyUp = (e: KeyboardEvent) => {
    for (let button of BUTTONS) {
      if (this.keyBinding[button].has(e.key)) {
        e.preventDefault();

        this.buttons.delete(button);
      }
    }
  };

  private render = () => {
    this.context.reset();
    this.context.canvas.height = this.state.viewport.length.y;
    this.context.canvas.width = this.state.viewport.length.x;
    this.context.canvas.style.backgroundColor = getRGBA(
      this.state.universe.color
    );

    for (let entity of this.state.entities) {
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

    this.animationFrameRequest = requestAnimationFrame(this.render);
  };

  private update = () => {
    const now = Date.now();

    for (let entity of this.state.entities) {
      entity.update(this.buttons);
    }
  };

  pause = () => {
    //
  };

  reset = () => {
    //
  };

  start = () => {
    this.context.canvas.addEventListener("keydown", this.onKeyDown);
    this.context.canvas.addEventListener("keyup", this.onKeyUp);

    this.context.canvas.focus();

    this.prevUpdateTime = Date.now();
    this.animationFrameRequest = requestAnimationFrame(this.render);
  };

  stop = () => {
    if (this.animationFrameRequest) {
      cancelAnimationFrame(this.animationFrameRequest);
    }

    this.context.canvas.removeEventListener("keydown", this.onKeyDown);
    this.context.canvas.removeEventListener("keyup", this.onKeyUp);
  };

  unpause = () => {
    //
  };
}
