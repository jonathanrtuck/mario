import { Entity } from "./Entity";
import { State } from "./State";
import {
  GRID_DIMENSION,
  IS_DEBUG_MODE,
  KEY_BINDING,
  KEYS,
  PIXEL_DIMENSION,
  PIXEL_SCALE,
} from "@/constants";
import { Key } from "@/types";

export class Game {
  animationFrameRequest: ReturnType<typeof requestAnimationFrame>;
  context: CanvasRenderingContext2D;
  elapsedMsSincePrevSecond: number = 0;
  fps: number = 0;
  keydowns: Set<Key>;
  keyups: Set<Key>;
  prevRenderMs: number; // ms
  prevUpdateMs: number; // ms
  state: State;

  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext("2d")!;
    this.keydowns = new Set<Key>();
    this.keyups = new Set<Key>();
    this.state = new State({
      entities: [
        new Entity({
          dimensions: {
            x: GRID_DIMENSION * 69,
            y: GRID_DIMENSION * 4,
            z: 0,
          },
          mass: 0,
          position: {
            x: GRID_DIMENSION * 0,
            y: GRID_DIMENSION * 0,
            z: 0,
          },
          type: "Wall",
        }),
      ],
      universe: {
        acceleration: {
          x: 0,
          y: -9.8 * 4,
          z: 0,
        },
        color: "blue",
        dimensions: {
          x: GRID_DIMENSION * 210,
          y: GRID_DIMENSION * 15,
          z: 2,
        },
      },
      viewport: {
        dimensions: {
          x: GRID_DIMENSION * 16,
          y: GRID_DIMENSION * 15,
          z: 3,
        },
        position: {
          x: 0,
          y: GRID_DIMENSION * 1.66666,
          z: 1,
        },
      },
    });
    this.prevRenderMs = Date.now();
    this.prevUpdateMs = Date.now();

    canvas.focus();
    canvas.addEventListener("keydown", this.onKeyDown);
    canvas.addEventListener("keyup", this.onKeyUp);

    this.animationFrameRequest = requestAnimationFrame(this.update);
  }

  destroy = () => {
    cancelAnimationFrame(this.animationFrameRequest);

    this.context.canvas.removeEventListener("keydown", this.onKeyDown);
    this.context.canvas.removeEventListener("keyup", this.onKeyUp);
  };

  onKeyDown = (e: KeyboardEvent) => {
    for (let i = 0; i !== KEYS.length; i++) {
      const key = KEYS[i];

      if (KEY_BINDING[key].has(e.key)) {
        e.preventDefault();

        this.keydowns.add(key);
      }
    }
  };

  onKeyUp = (e: KeyboardEvent) => {
    for (let i = 0; i !== KEYS.length; i++) {
      const key = KEYS[i];

      if (KEY_BINDING[key].has(e.key)) {
        e.preventDefault();

        this.keyups.add(key);
      }
    }
  };

  render = () => {
    const now = Date.now();
    const elapsedMs = now - this.prevRenderMs;

    if (IS_DEBUG_MODE) {
      this.elapsedMsSincePrevSecond += elapsedMs;
      this.fps += 1;

      if (this.elapsedMsSincePrevSecond >= 1000) {
        // eslint-disable-next-line no-console
        console.debug("fps", this.fps);

        this.elapsedMsSincePrevSecond = 0;
        this.fps = 0;
      }
    }

    this.context.canvas.height =
      (this.state.viewport.dimensions.y / PIXEL_DIMENSION) * PIXEL_SCALE;
    this.context.canvas.width =
      (this.state.viewport.dimensions.x / PIXEL_DIMENSION) * PIXEL_SCALE;
    this.context.canvas.style.backgroundColor = `var(--color-${this.state.universe.color})`;

    this.context.scale(PIXEL_SCALE, PIXEL_SCALE);

    this.context.fillStyle = "rgb(128, 96, 0)"; // @todo remove

    for (let i = 0; i !== this.state.entities.length; i++) {
      const entity = this.state.entities[i];

      this.context.fillRect(
        (entity.position.x + this.state.viewport.position.x) / PIXEL_DIMENSION,
        (this.state.viewport.dimensions.y +
          this.state.viewport.position.y -
          entity.position.y -
          entity.dimensions.y) /
          PIXEL_DIMENSION,
        entity.dimensions.x / PIXEL_DIMENSION,
        entity.dimensions.y / PIXEL_DIMENSION
      );
    }

    this.prevRenderMs = now;
  };

  update = () => {
    const now = Date.now();
    const elapsedMs = now - this.prevUpdateMs;

    // @todo update this.state

    for (const key of this.keyups) {
      this.keydowns.delete(key);
    }

    this.keyups.clear();

    this.render();
    this.prevUpdateMs = now;
    this.animationFrameRequest = requestAnimationFrame(this.update);
  };
}
