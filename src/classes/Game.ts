import {
  COLORS,
  GRID_UNIT_LENGTH,
  IS_DEBUG_MODE,
  KEY_BINDING,
  KEYS,
  PIXEL_LENGTH,
  PIXEL_SCALE,
} from "@/constants";
import { Bitmap, Key, Pattern, Position, Velocity } from "@/types";
import {
  clamp,
  getIsCollision,
  getIsCollisionByDimension,
  getRGBA,
} from "@/utils";

import { Block } from "./Block";
import { Brick } from "./Brick";
import { Bush } from "./Bush";
import { Cloud } from "./Cloud";
import { Entity } from "./Entity";
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
        new Flag(198, 5),
        new Cloud(200, 12, "small"),
        new Bush(205, 4, "small"),
        new Hill(208, 4, "small"),
        new Cloud(211, 13, "small"),
        new Bush(215, 4, "small"),
        new Cloud(219, 12, "large"),
        new Mario(2.125, 4.125, "small"),
      ],
      universe: {
        acceleration: {
          x: 0,
          y: -9.8,
          z: 0,
        },
        color: 5,
        length: {
          x: GRID_UNIT_LENGTH * 210,
          y: GRID_UNIT_LENGTH * 15,
          z: 2,
        },
      },
      viewport: {
        length: {
          x: GRID_UNIT_LENGTH * 16,
          y: GRID_UNIT_LENGTH * 15,
          z: 3,
        },
        position: {
          x: 0,
          y: GRID_UNIT_LENGTH * 2,
          z: -1,
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
      (this.state.viewport.length.y / PIXEL_LENGTH) * PIXEL_SCALE;
    this.context.canvas.width =
      (this.state.viewport.length.x / PIXEL_LENGTH) * PIXEL_SCALE;
    this.context.canvas.style.backgroundColor = getRGBA(
      this.state.universe.color
    );

    // render entities
    for (let i = 0; i !== this.state.entities.length; i++) {
      const entity = this.state.entities[i];

      // only render entities within viewport
      if (
        getIsCollision(
          this.state.viewport.position,
          this.state.viewport.length,
          entity.position,
          entity.length
        )
      ) {
        this.context.fillStyle =
          (typeof entity.fill === "number"
            ? getRGBA(entity.fill)
            : this.patterns[entity.fill]) ?? "rgba(0,0,0,0)";
        this.context.save();
        this.context.translate(
          ((entity.position.x - this.state.viewport.position.x) /
            PIXEL_LENGTH) *
            PIXEL_SCALE,
          ((this.state.viewport.length.y +
            this.state.viewport.position.y -
            entity.position.y -
            entity.length.y) /
            PIXEL_LENGTH) *
            PIXEL_SCALE
        );
        this.context.fillRect(
          0,
          0,
          (entity.length.x / PIXEL_LENGTH) * PIXEL_SCALE,
          (entity.length.y / PIXEL_LENGTH) * PIXEL_SCALE
        );
        this.context.restore();
      }
    }

    this.prevRenderMs = now;
  };

  update = () => {
    const now = Date.now();
    const elapsedMs = now - this.prevUpdateMs;
    const seconds = 1 / (1000 / elapsedMs);
    const isPressingA = this.keydowns.has("a");
    const isPressingB = this.keydowns.has("b");
    const isPressingLeft =
      this.keydowns.has("left") && !this.keydowns.has("right");
    const isPressingRight =
      this.keydowns.has("right") && !this.keydowns.has("left");

    // only update entities within viewport (or 2 GRID_UNIT_LENGTHs horizontally)
    const entitiesToUpdate = new Array<Entity>(this.state.entities.length);
    let nextEntityToUpdateIndex = 0;

    for (let i = 0; i !== this.state.entities.length; i++) {
      const entity = this.state.entities[i];

      if (
        getIsCollision(
          {
            x: this.state.viewport.position.x - GRID_UNIT_LENGTH * 2,
            y: this.state.viewport.position.y,
            z: this.state.viewport.position.z,
          },
          {
            x: this.state.viewport.length.x + GRID_UNIT_LENGTH * 4,
            y: this.state.viewport.length.y,
            z: this.state.viewport.length.z,
          },
          entity.position,
          entity.length
        )
      ) {
        entitiesToUpdate[nextEntityToUpdateIndex++] = entity;
      }
    }

    entitiesToUpdate.length = nextEntityToUpdateIndex;
    entitiesToUpdate.sort(
      // prettier-ignore
      (a, b) => (a.position.z + a.length.z) - (b.position.z + b.length.z)
    );

    // calculate each entity's next position in order to determine if collision(s) happened
    const nextPositions = new Array<Position>(entitiesToUpdate.length);

    for (let i = 0; i !== entitiesToUpdate.length; i++) {
      const entity = entitiesToUpdate[i];
      const nextPosition: Position = {
        x: entity.position.x,
        y: entity.position.y,
        z: entity.position.z,
      };

      if (entity.mass !== 0 && entity.mass !== Infinity) {
        nextPosition.x += this.state.universe.acceleration.x * seconds;
        nextPosition.y += this.state.universe.acceleration.y * seconds;
        nextPosition.z += this.state.universe.acceleration.z * seconds;
      }

      if (entity.velocity) {
        nextPosition.x += entity.velocity.x * seconds;
        nextPosition.y += entity.velocity.y * seconds;
        nextPosition.z += entity.velocity.z * seconds;
      }

      nextPositions[i] = nextPosition;
    }

    // update entities
    for (let i = 0; i !== entitiesToUpdate.length; i++) {
      const entity = entitiesToUpdate[i];
      const nextPosition = nextPositions[i];

      // collision detection
      for (let j = i + 1; j !== entitiesToUpdate.length; j++) {
        const otherEntity = entitiesToUpdate[j];

        // two stationary entities cannot collide
        if (!entity.velocity && !otherEntity.velocity) {
          continue;
        }

        const otherNextPosition = nextPositions[j];

        if (
          getIsCollision(
            nextPosition,
            entity.length,
            otherNextPosition,
            otherEntity.length
          )
        ) {
          const isCollisionBottom =
            entity.position.y >=
              otherEntity.position.y + otherEntity.length.y &&
            nextPosition.y <= otherNextPosition.y + otherEntity.length.y;
          const isCollisionLeft =
            entity.position.x >=
              otherEntity.position.x + otherEntity.length.x &&
            nextPosition.x <= otherNextPosition.x + otherEntity.length.x;
          const isCollisionRight =
            !isCollisionLeft &&
            entity.position.x + entity.length.x <= otherEntity.position.x &&
            nextPosition.x + entity.length.x >= otherNextPosition.x;
          const isCollisionTop =
            !isCollisionBottom &&
            entity.position.y + entity.length.y <= otherEntity.position.y &&
            nextPosition.y + entity.length.y >= otherNextPosition.y;

          // calculate precise time of each collision(s) occurence
          let collisionMomentIndex = 0;
          const collisionMoments = new Array<
            ["bottom" | "left" | "right" | "top", number]
          >(2);

          if (isCollisionBottom) {
            const prevLengthBetween =
              entity.position.y -
              (otherEntity.position.y + otherEntity.length.y);

            if (prevLengthBetween === 0) {
              collisionMoments[collisionMomentIndex++] = ["bottom", 0];
            } else {
              const totalLengthDelta =
                entity.position.y -
                nextPosition.y +
                (otherNextPosition.y - otherEntity.position.y);
              const coefficient = prevLengthBetween / totalLengthDelta;

              collisionMoments[collisionMomentIndex++] = [
                "bottom",
                seconds * coefficient,
              ];
            }
          }

          if (isCollisionLeft) {
            const prevLengthBetween =
              entity.position.x -
              (otherEntity.position.x + otherEntity.length.x);

            if (prevLengthBetween === 0) {
              collisionMoments[collisionMomentIndex++] = ["left", 0];
            } else {
              const totalLengthDelta =
                entity.position.x -
                nextPosition.x +
                (otherNextPosition.x - otherEntity.position.x);
              const coefficient = prevLengthBetween / totalLengthDelta;

              collisionMoments[collisionMomentIndex++] = [
                "left",
                seconds * coefficient,
              ];
            }
          }

          if (isCollisionRight) {
            const prevLengthBetween =
              otherEntity.position.x - (entity.position.x + entity.length.x);

            if (prevLengthBetween === 0) {
              collisionMoments[collisionMomentIndex++] = ["right", 0];
            } else {
              const totalLengthDelta =
                nextPosition.x -
                entity.position.x +
                (otherEntity.position.x - otherNextPosition.x);
              const coefficient = prevLengthBetween / totalLengthDelta;

              collisionMoments[collisionMomentIndex++] = [
                "right",
                seconds * coefficient,
              ];
            }
          }

          if (isCollisionTop) {
            const prevLengthBetween =
              otherEntity.position.y - (entity.position.y + entity.length.y);

            if (prevLengthBetween === 0) {
              collisionMoments[collisionMomentIndex++] = ["top", 0];
            } else {
              const totalLengthDelta =
                nextPosition.y -
                entity.position.y +
                (otherEntity.position.y - otherNextPosition.y);
              const coefficient = prevLengthBetween / totalLengthDelta;

              collisionMoments[collisionMomentIndex++] = [
                "top",
                seconds * coefficient,
              ];
            }
          }

          collisionMoments.length = collisionMomentIndex;
          collisionMoments.sort(([, a], [, b]) => a - b);

          // loop through collisionMoments and update entities' position/velocity accordingly
          for (let k = 0; k !== collisionMoments.length; k++) {
            const [side, moment] = collisionMoments[k];

            if (!entity.velocity) {
              // use entity.position position to update otherEntity.position
            } else if (!otherEntity.velocity) {
              // use otherEntity.position position to update entity.position
            } else {
              // use moment to find the point on intersection and set both entities' positions based on it
            }

            // check if still collision in each subsequent iteration
            if (k !== 0) {
              //
            }
          }
        }
      }

      if (entity.velocity) {
        const nextVelocity: Velocity = {
          x: entity.velocity.x,
          y: entity.velocity.y,
          z: entity.velocity.z,
        };

        // decelerate if moving left but no longer holding left
        if (entity.deceleration && entity.velocity.x < 0 && !isPressingLeft) {
          nextVelocity.x += Math.min(
            entity.deceleration.x * seconds,
            -entity.velocity.x
          );
        }
        // decelerate if moving right but no longer holding right
        if (entity.deceleration && entity.velocity.x > 0 && !isPressingRight) {
          nextVelocity.x -= Math.min(
            entity.deceleration.x * seconds,
            entity.velocity.x
          );
        }

        // accelerate if holding left
        if (
          entity.acceleration &&
          isPressingLeft
          // !collisions.left
        ) {
          nextVelocity.x -=
            entity.acceleration.x * seconds * (isPressingA ? 2 : 1);
        }
        // accelerate if holding right
        if (
          entity.acceleration &&
          isPressingRight
          // !collisions.right
        ) {
          nextVelocity.x +=
            entity.acceleration.x * seconds * (isPressingA ? 2 : 1);
        }

        if (entity.vmax) {
          const vmaxX = entity.vmax?.x * (isPressingA ? 2 : 1);
          const vmaxY = entity.vmax?.y;

          nextVelocity.x = clamp(-vmaxX, nextVelocity.x, vmaxX);
          nextVelocity.y = clamp(-vmaxY, nextVelocity.y, vmaxY);
        }

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
          if (nextPosition.x < minPositionX) {
            nextPosition.x = minPositionX;

            if (nextVelocity.x < 0) {
              nextVelocity.x = 0;
            }
          } else if (nextPosition.x > maxPositionX) {
            nextPosition.x = maxPositionX;

            if (nextVelocity.x > 0) {
              nextVelocity.x = 0;
            }
          }
        }

        entity.velocity = nextVelocity;
      }

      entity.position = nextPosition;
    }

    for (const key of this.keyups) {
      this.keydowns.delete(key);
    }

    this.keyups.clear();

    this.render();
    this.prevUpdateMs = now;
    this.animationFrameRequest = requestAnimationFrame(this.update);
  };
}
