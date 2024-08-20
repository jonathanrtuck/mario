import {
  COLORS,
  GRID_DIMENSION,
  IS_DEBUG_MODE,
  KEY_BINDING,
  KEYS,
  PATTERNS,
  PIXEL_DIMENSION,
  PIXEL_SCALE,
} from "@/constants";
import { Bitmap, Key, Pattern } from "@/types";
import { getRGBA } from "@/utils";

import { Mario } from "./Mario";
import { State } from "./State";
import { Wall } from "./Wall";

const BITMAPS_BY_PATTERN: Partial<Record<Pattern, Bitmap>> = {
  ...Wall.patterns,
};
const PATTERN_KEYS = Object.keys(BITMAPS_BY_PATTERN) as Pattern[];
const PATTERN_VALUES = Object.values(BITMAPS_BY_PATTERN);

export class Game {
  private animationFrameRequest: ReturnType<
    typeof requestAnimationFrame
  > | null = null;
  private context: CanvasRenderingContext2D;
  private elapsedMsSincePrevSecond: number = 0;
  private fps: number = 0;
  private keydowns: Set<Key>;
  private keyups: Set<Key>;
  private prevRenderMs: number = 0; // ms
  private prevUpdateMs: number = 0; // ms
  private patterns: Partial<Record<Pattern, CanvasPattern>> = {};
  private state: State;

  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext("2d")!;
    this.keydowns = new Set<Key>();
    this.keyups = new Set<Key>();
    this.state = new State({
      entities: [new Wall(0, 0, 69, 4), new Mario(2, 4, "small")],
      universe: {
        acceleration: {
          x: 0,
          y: -9.8 * 4,
          z: 0,
        },
        color: 5,
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
          y: GRID_DIMENSION * 2,
          z: 1,
        },
      },
    });
  }

  destroy = () => {
    if (this.animationFrameRequest) {
      cancelAnimationFrame(this.animationFrameRequest);
    }

    this.context.canvas.removeEventListener("keydown", this.onKeyDown);
    this.context.canvas.removeEventListener("keyup", this.onKeyUp);
  };

  init = () => {
    Promise.all(
      PATTERN_VALUES.map((bitmap) => {
        const numColumns = bitmap[0].length;
        const numRows = bitmap.length;
        const height = numRows * PIXEL_SCALE;
        const width = numColumns * PIXEL_SCALE;
        const arr = new Uint8ClampedArray(height * width * 4);

        let index = 0;
        for (let row of bitmap) {
          for (let i = 0; i !== PIXEL_SCALE; i++) {
            for (let pixelColorIndex of row) {
              const [r, g, b, a] = COLORS[pixelColorIndex];

              for (let j = 0; j !== PIXEL_SCALE; j++) {
                arr[index++] = r;
                arr[index++] = g;
                arr[index++] = b;
                arr[index++] = a;
              }
            }
          }
        }

        const imageData = new ImageData(arr, width, height);

        return createImageBitmap(imageData, 0, 0, width, height);
      })
    )
      .then((imageBitmaps) => {
        for (let i = 0; i !== imageBitmaps.length; i++) {
          const pattern: Pattern = PATTERN_KEYS[i];
          const imageBitmap = imageBitmaps[i];

          this.patterns[pattern] =
            this.context.createPattern(imageBitmap, "repeat") ?? undefined;
        }
      })
      .then(() => {
        this.prevRenderMs = Date.now();
        this.prevUpdateMs = Date.now();

        this.context.canvas.addEventListener("keydown", this.onKeyDown);
        this.context.canvas.addEventListener("keyup", this.onKeyUp);

        this.context.canvas.focus();

        this.animationFrameRequest = requestAnimationFrame(this.update);
      });
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

    this.context.reset();
    this.context.canvas.height =
      (this.state.viewport.dimensions.y / PIXEL_DIMENSION) * PIXEL_SCALE;
    this.context.canvas.width =
      (this.state.viewport.dimensions.x / PIXEL_DIMENSION) * PIXEL_SCALE;
    this.context.canvas.style.backgroundColor = getRGBA(
      this.state.universe.color
    );

    // keep patterns aligned to universe, not viewport
    for (let i = 0; i !== PATTERNS.length; i++) {
      const pattern = this.patterns[PATTERNS[i]];

      if (pattern) {
        pattern.setTransform(
          new DOMMatrix([
            1,
            0,
            0,
            1,
            (this.state.viewport.position.x / PIXEL_DIMENSION) * PIXEL_SCALE,
            (this.state.viewport.position.y / PIXEL_DIMENSION) * PIXEL_SCALE,
          ])
        );
      }
    }

    // render entities
    for (let i = 0; i !== this.state.entities.length; i++) {
      const entity = this.state.entities[i];

      this.context.fillStyle =
        (typeof entity.fill === "number"
          ? getRGBA(entity.fill)
          : this.patterns[entity.fill]) ?? "rgba(0,0,0,0)";

      this.context.fillRect(
        ((entity.position.x - this.state.viewport.position.x) /
          PIXEL_DIMENSION) *
          PIXEL_SCALE,
        ((this.state.viewport.dimensions.y +
          this.state.viewport.position.y -
          entity.position.y -
          entity.dimensions.y) /
          PIXEL_DIMENSION) *
          PIXEL_SCALE,
        (entity.dimensions.x / PIXEL_DIMENSION) * PIXEL_SCALE,
        (entity.dimensions.y / PIXEL_DIMENSION) * PIXEL_SCALE
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
