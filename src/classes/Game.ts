import {
  COLORS,
  GRID_DIMENSION,
  IS_DEBUG_MODE,
  KEY_BINDING,
  KEYS,
  PIXEL_DIMENSION,
  PIXEL_SCALE,
} from "@/constants";
import { Bitmap, Key, Pattern } from "@/types";
import { getIsCollisionByDimension, getRGBA } from "@/utils";

import { Block } from "./Block";
import { Brick } from "./Brick";
import { Bush } from "./Bush";
import { Cloud } from "./Cloud";
import { Flag } from "./Flag";
import { Hill } from "./Hill";
import { Mario } from "./Mario";
import { Pipe } from "./Pipe";
import { QuestionBlock } from "./QuestionBlock";
import { State } from "./State";
import { Wall } from "./Wall";

const BITMAPS_BY_PATTERN: Partial<Record<Pattern, Bitmap>> = {
  ...("patterns" in Block ? Block.patterns : {}),
  ...("patterns" in Brick ? Brick.patterns : {}),
  ...("patterns" in Bush ? Bush.patterns : {}),
  ...("patterns" in Cloud ? Cloud.patterns : {}),
  ...("patterns" in Flag ? Flag.patterns : {}),
  ...("patterns" in Hill ? Hill.patterns : {}),
  ...("patterns" in Mario ? Mario.patterns : {}),
  ...("patterns" in Pipe ? Pipe.patterns : {}),
  ...("patterns" in QuestionBlock ? QuestionBlock.patterns : {}),
  ...("patterns" in Wall ? Wall.patterns : {}),
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
  private keydowns: Set<Key> = new Set<Key>();
  private keyups: Set<Key> = new Set<Key>();
  private prevRenderMs: number = 0; // ms
  private prevUpdateMs: number = 0; // ms
  private patterns: Partial<Record<Pattern, CanvasPattern>> = {};
  private state: State;

  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext("2d")!;
    this.state = new State({
      entities: [
        new Wall(0, 0, 69, 4),
        new Hill(0, 4, "large"),
        new Cloud(9, 12, "small"),
        new Bush(11, 4, "large"),
        new Hill(16, 4, "small"),
        new QuestionBlock(16, 8),
        new Cloud(19, 13, "small"),
        new Brick(20, 8),
        new QuestionBlock(21, 8),
        new Brick(22, 8),
        new QuestionBlock(22, 12),
        new Bush(23, 4, "small"),
        new QuestionBlock(23, 8),
        new Brick(24, 8),
        new Cloud(27, 12, "large"),
        new Pipe(28, 4, 2),
        new Cloud(36, 13, "medium"),
        new Pipe(39, 4, 3),
        new Bush(41, 4, "medium"),
        new Pipe(46, 4, 4),
        new Hill(48, 4, "large"),
        new Cloud(56, 12, "small"),
        new Pipe(57, 4, 4),
        new Bush(59, 4, "large"),
        new Hill(64, 4, "small"),
        new Cloud(67, 13, "small"),
        new Wall(71, 0, 15, 4),
        new Bush(71, 4, "small"),
        new Cloud(75, 12, "large"),
        new Brick(77, 8),
        new QuestionBlock(78, 8),
        new Brick(79, 8),
        new Brick(80, 12),
        new Brick(81, 12),
        new Brick(82, 12),
        new Brick(83, 12),
        new Brick(84, 12),
        new Cloud(84, 13, "medium"),
        new Brick(85, 12),
        new Brick(86, 12),
        new Brick(87, 12),
        new Brick(88, 12),
        new Bush(89, 4, "medium"),
        new Wall(89, 0, 64, 4),
        new Brick(91, 12),
        new Brick(92, 12),
        new Brick(93, 8),
        new Brick(93, 12),
        new Hill(96, 4, "large"),
        new Brick(100, 8),
        new Brick(101, 8),
        new Cloud(104, 12, "small"),
        new QuestionBlock(106, 8),
        new Bush(107, 4, "large"),
        new QuestionBlock(109, 8),
        new QuestionBlock(109, 12),
        new Hill(112, 4, "small"),
        new QuestionBlock(112, 8),
        new Cloud(115, 13, "small"),
        new Bush(119, 4, "small"),
        new Brick(119, 8),
        new Brick(121, 12),
        new Brick(122, 12),
        new Cloud(123, 12, "large"),
        new Brick(123, 12),
        new Brick(128, 12),
        new Brick(129, 12),
        new QuestionBlock(129, 12),
        new Brick(130, 12),
        new QuestionBlock(130, 12),
        new Brick(131, 12),
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
        new Pipe(162, 4, 2),
        new Cloud(163, 13, "small"),
        new Bush(167, 4, "small"),
        new Brick(168, 8),
        new Brick(169, 8),
        new QuestionBlock(170, 8),
        new Brick(171, 8),
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
        new Flag(198, 5),
        new Cloud(200, 12, "small"),
        new Bush(205, 4, "small"),
        new Hill(208, 4, "small"),
        new Cloud(211, 13, "small"),
        new Bush(215, 4, "small"),
        new Cloud(219, 12, "large"),
        new Mario(2.125, 4, "small"),
      ],
      universe: {
        acceleration: {
          x: 0,
          y: -9.8 * 4,
          z: 0,
        },
        color: 5,
        lengths: {
          x: GRID_DIMENSION * 210,
          y: GRID_DIMENSION * 15,
          z: 2,
        },
      },
      viewport: {
        lengths: {
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
      (this.state.viewport.lengths.y / PIXEL_DIMENSION) * PIXEL_SCALE;
    this.context.canvas.width =
      (this.state.viewport.lengths.x / PIXEL_DIMENSION) * PIXEL_SCALE;
    this.context.canvas.style.backgroundColor = getRGBA(
      this.state.universe.color
    );

    // render entities
    for (let i = 0; i !== this.state.entities.length; i++) {
      const entity = this.state.entities[i];

      // only render entities within viewport
      if (
        getIsCollisionByDimension(
          this.state.viewport.position.x,
          this.state.viewport.lengths.x,
          entity.position.x,
          entity.lengths.x
        ) &&
        getIsCollisionByDimension(
          this.state.viewport.position.y,
          this.state.viewport.lengths.y,
          entity.position.y,
          entity.lengths.y
        )
      ) {
        this.context.fillStyle =
          (typeof entity.fill === "number"
            ? getRGBA(entity.fill)
            : this.patterns[entity.fill]) ?? "rgba(0,0,0,0)";
        this.context.save();
        this.context.translate(
          ((entity.position.x - this.state.viewport.position.x) /
            PIXEL_DIMENSION) *
            PIXEL_SCALE,
          ((this.state.viewport.lengths.y +
            this.state.viewport.position.y -
            entity.position.y -
            entity.lengths.y) /
            PIXEL_DIMENSION) *
            PIXEL_SCALE
        );
        this.context.fillRect(
          0,
          0,
          (entity.lengths.x / PIXEL_DIMENSION) * PIXEL_SCALE,
          (entity.lengths.y / PIXEL_DIMENSION) * PIXEL_SCALE
        );
        this.context.restore();
      }
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
