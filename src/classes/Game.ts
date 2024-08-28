import { State } from "@/classes";
import { BUTTONS, COLOR_BLUE } from "@/constants";
import { Mario, Wall } from "@/entities";
import { Button, MS } from "@/types";
import { clamp, gridUnits, pixels } from "@/utils";

export class Game {
  static get initialState(): State {
    return new State({
      entities: [
        new Wall(0, 0, 69, 4),
        new Mario(2.125, 4, "small"),
        // …
      ],
      universe: {
        acceleration: {
          x: 0,
          y: pixels(202) / 1000, // pixels/s^2
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
  private prevUpdateTime: MS | null = null; // ms

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

  private onKeyDown = (e: KeyboardEvent): void => {
    for (let button of BUTTONS) {
      if (this.keyBinding[button].has(e.key)) {
        e.preventDefault();

        this.buttons.add(button);
      }
    }
  };

  private onKeyUp = (e: KeyboardEvent): void => {
    for (let button of BUTTONS) {
      if (this.keyBinding[button].has(e.key)) {
        e.preventDefault();

        this.buttons.delete(button);
      }
    }
  };

  private render = (): void => {
    this.context.reset();
    this.context.canvas.height = this.state.viewport.length.y;
    this.context.canvas.width = this.state.viewport.length.x;
    this.context.canvas.style.backgroundColor = this.state.universe.color;

    for (let entity of this.state.entities) {
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
            gridUnits(1) ||
        entity.position.z + entity.length.z < this.state.viewport.position.z ||
        entity.position.z >
          this.state.viewport.position.z + this.state.viewport.length.z
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
    const now = Date.now();
    const elapsedTime =
      this.prevUpdateTime === null ? 0 : now - this.prevUpdateTime;

    if (elapsedTime) {
      for (let entity of this.state.entities) {
        // only update entities within viewport
        if (
          entity.position.x + entity.length.x <
            this.state.viewport.position.x - gridUnits(2) ||
          entity.position.x >
            this.state.viewport.position.x +
              this.state.viewport.length.x +
              gridUnits(2) ||
          entity.position.z + entity.length.z <
            this.state.viewport.position.z ||
          entity.position.z >
            this.state.viewport.position.z + this.state.viewport.length.z
        ) {
          continue;
        }

        entity.update(elapsedTime, this.buttons);

        // update viewport
        if (entity instanceof Mario) {
          const entityCenterX = entity.position.x + entity.length.x / 2;
          const viewportCenterX =
            this.state.viewport.position.x + this.state.viewport.length.x / 2;
          const maxViewportPositionX =
            this.state.universe.length.x - this.state.viewport.length.x;

          // follow entity with viewport
          if (
            entityCenterX > viewportCenterX &&
            this.state.viewport.position.x < maxViewportPositionX
          ) {
            this.state.viewport.position.x = clamp(
              this.state.viewport.position.x,
              entityCenterX - this.state.viewport.length.x / 2,
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
      }
    }

    this.render();
    this.prevUpdateTime = now;
    this.animationFrameRequest = requestAnimationFrame(this.update);
  };

  pause = (): void => {
    //
  };

  reset = (): void => {
    //
  };

  start = (): void => {
    this.context.canvas.addEventListener("keydown", this.onKeyDown);
    this.context.canvas.addEventListener("keyup", this.onKeyUp);

    this.context.canvas.focus();

    this.animationFrameRequest = requestAnimationFrame(this.update);
  };

  stop = (): void => {
    if (this.animationFrameRequest) {
      cancelAnimationFrame(this.animationFrameRequest);
    }

    this.context.canvas.removeEventListener("keydown", this.onKeyDown);
    this.context.canvas.removeEventListener("keyup", this.onKeyUp);
  };

  unpause = (): void => {
    //
  };
}
