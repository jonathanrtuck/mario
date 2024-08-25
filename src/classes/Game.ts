import {
  COLORS,
  GRID_UNIT_LENGTH,
  IS_DEBUG_MODE,
  KEY_BINDING,
  KEYS,
  PIXEL_LENGTH,
  PIXEL_SCALE,
} from "@/constants";
import { Bitmap, Key, Length, Pattern, Position, Side } from "@/types";
import {
  clamp,
  getIsCollision,
  getRGBA,
  isCollidable,
  isMovable,
} from "@/utils";

import { Block } from "./Block";
import { Brick } from "./Brick";
import { Bush } from "./Bush";
import { Castle } from "./Castle";
import { Cloud } from "./Cloud";
import { CollidableEntity } from "./CollidableEntity";
import { Entity } from "./Entity";
import { Flag } from "./Flag";
import { Hill } from "./Hill";
import { Mario } from "./Mario";
import { MovableEntity } from "./MovableEntity";
import { Pipe } from "./Pipe";
import { QuestionBlock } from "./QuestionBlock";
import { State } from "./State";
import { Wall } from "./Wall";

const BITMAPS_BY_PATTERN: Partial<Record<Pattern, Bitmap>> = {
  ...("patterns" in Block ? Block.patterns : {}),
  ...("patterns" in Brick ? Brick.patterns : {}),
  ...("patterns" in Bush ? Bush.patterns : {}),
  ...("patterns" in Castle ? Castle.patterns : {}),
  ...("patterns" in Cloud ? Cloud.patterns : {}),
  ...("patterns" in Flag ? Flag.patterns : {}),
  ...("patterns" in Hill ? Hill.patterns : {}),
  ...("patterns" in Mario ? Mario.patterns : {}),
  ...("patterns" in Pipe ? Pipe.patterns : {}),
  ...("patterns" in QuestionBlock ? QuestionBlock.patterns : {}),
  ...("patterns" in Wall ? Wall.patterns : {}),
};
const JUMP_INPUT_DURATION = 250; // ms
const PATTERN_KEYS = Object.keys(BITMAPS_BY_PATTERN) as Pattern[];
const PATTERN_VALUES = Object.values(BITMAPS_BY_PATTERN);

export class Game {
  static get initialState(): State {
    return new State({
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
        new Mario(2.125, 4, "small"),
        new Flag(198.25, 5),
        new Castle(202, 4),
      ],
      universe: {
        acceleration: {
          x: 0,
          y: -9.8 * 4,
          z: 0,
        },
        color: 5,
        length: {
          x: GRID_UNIT_LENGTH * 210,
          y: GRID_UNIT_LENGTH * 15,
          z: 5,
        },
      },
      viewport: {
        length: {
          x: GRID_UNIT_LENGTH * 16,
          y: GRID_UNIT_LENGTH * 15,
          z: 5,
        },
        position: {
          x: 0,
          y: GRID_UNIT_LENGTH * 2,
          z: -4,
        },
      },
    });
  }

  private animationFrameRequest: ReturnType<
    typeof requestAnimationFrame
  > | null = null;
  private elapsedMsSincePrevSecond: number = 0;
  private keydowns: Set<Key> = new Set<Key>();
  private keyups: Set<Key> = new Set<Key>();
  private elapsedMsSincePressB: number | null = null;
  private pauseMs: number | null = null; // ms
  private prevRenderMs: number | null = null; // ms
  private prevUpdateMs: number | null = null; // ms

  context: CanvasRenderingContext2D;
  fps: number = 0;
  patterns: Partial<Record<Pattern, CanvasPattern>> = {};
  state: State;

  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext("2d")!;
    this.state = Game.initialState;
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (this.pauseMs === null) {
      for (let i = 0; i !== KEYS.length; i++) {
        const key = KEYS[i];

        if (KEY_BINDING[key].has(e.key)) {
          e.preventDefault();

          this.keydowns.add(key);
        }
      }
    }
  };

  private onKeyUp = (e: KeyboardEvent) => {
    for (let i = 0; i !== KEYS.length; i++) {
      const key = KEYS[i];

      if (KEY_BINDING[key].has(e.key)) {
        e.preventDefault();

        this.keyups.add(key);
      }
    }
  };

  private render = () => {
    const now = Date.now();
    const elapsedMs = this.prevRenderMs === null ? 0 : now - this.prevRenderMs;

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

  private update = () => {
    const now = Date.now();
    const elapsedMs = this.prevUpdateMs === null ? 0 : now - this.prevUpdateMs;
    const seconds = elapsedMs === 0 ? 0 : 1 / (1000 / elapsedMs);
    const isPressingA = this.keydowns.has("a");
    const isPressingB = this.keydowns.has("b");
    const isPressingLeft =
      this.keydowns.has("left") && !this.keydowns.has("right");
    const isPressingRight =
      this.keydowns.has("right") && !this.keydowns.has("left");
    const isReleasingA = this.keyups.has("a");
    const isReleasingB = this.keyups.has("b");

    if (isPressingB) {
      if (this.elapsedMsSincePressB === null) {
        this.elapsedMsSincePressB = 0;
      } else {
        this.elapsedMsSincePressB += elapsedMs;
      }
    }

    // only update entities within viewport
    const viewportLength: Length = {
      x: this.state.viewport.length.x + GRID_UNIT_LENGTH * 4,
      y: this.state.viewport.length.y + GRID_UNIT_LENGTH * 15,
      z: this.state.viewport.length.z,
    };
    const viewportPosition: Position = {
      x: this.state.viewport.position.x - GRID_UNIT_LENGTH * 2,
      y: this.state.viewport.position.y,
      z: this.state.viewport.position.z,
    };
    const entitiesToUpdate = new Array<Entity>(this.state.entities.length);
    let nextEntityToUpdateIndex = 0;
    for (let i = 0; i !== this.state.entities.length; i++) {
      const entity = this.state.entities[i];

      if (
        getIsCollision(
          viewportPosition,
          viewportLength,
          entity.position,
          entity.length
        )
      ) {
        entitiesToUpdate[nextEntityToUpdateIndex++] = entity;
      }
    }
    entitiesToUpdate.length = nextEntityToUpdateIndex;

    // only check collisions invloving collidable/movable entities
    const collidableEntities = new Array<CollidableEntity>(
      entitiesToUpdate.length
    );
    const movableEntities = new Array<MovableEntity>(entitiesToUpdate.length);
    let collidableEntitiesIndex = 0;
    let movableEntitiesIndex = 0;
    for (let i = 0; i !== entitiesToUpdate.length; i++) {
      const entity = entitiesToUpdate[i];

      if (isCollidable(entity)) {
        collidableEntities[collidableEntitiesIndex++] = entity;
      }
      if (isMovable(entity)) {
        movableEntities[movableEntitiesIndex++] = entity;
      }
    }
    collidableEntities.length = collidableEntitiesIndex;
    movableEntities.length = movableEntitiesIndex;

    // handle collisions
    let collisions: [
      coefficientOfTime: number,
      movableEntityIndex: number,
      side: Side,
      collidableEntityIndex: number
    ][];
    let collisionsIndex: number;
    let coefficientOfTime = 1; // percentage of `elapsedMs` until now
    do {
      collisions = new Array(movableEntities.length);
      collisionsIndex = 0;

      const collidableEntityHitboxLengths = new Array<Length>(
        collidableEntities.length
      );
      const collidableEntityHitboxPositions = new Array<Position>(
        collidableEntities.length
      );
      const collidableEntityHitboxNextPositions = new Array<Position>(
        collidableEntities.length
      );
      let collidableEntityHitboxLengthsIndex = 0;
      let collidableEntityHitboxPositionsIndex = 0;
      let collidableEntityHitboxNextPositionsIndex = 0;
      for (let i = 0; i !== collidableEntities.length; i++) {
        const collidableEntity = collidableEntities[i];

        collidableEntityHitboxLengths[collidableEntityHitboxLengthsIndex++] = {
          x:
            collidableEntity.length.x - collidableEntity.collidableOffset.x * 2,
          y:
            collidableEntity.length.y - collidableEntity.collidableOffset.y * 2,
          z:
            collidableEntity.length.z - collidableEntity.collidableOffset.z * 2,
        };
        collidableEntityHitboxPositions[
          collidableEntityHitboxPositionsIndex++
        ] = {
          x: collidableEntity.position.x + collidableEntity.collidableOffset.x,
          y: collidableEntity.position.y + collidableEntity.collidableOffset.y,
          z: collidableEntity.position.z + collidableEntity.collidableOffset.z,
        };
        collidableEntityHitboxNextPositions[
          collidableEntityHitboxNextPositionsIndex++
        ] = {
          x:
            collidableEntity.position.x +
            collidableEntity.collidableOffset.x +
            (isMovable(collidableEntity) ? collidableEntity.velocity.x : 0) *
              seconds *
              coefficientOfTime,
          y:
            collidableEntity.position.y +
            collidableEntity.collidableOffset.y +
            (isMovable(collidableEntity) ? collidableEntity.velocity.y : 0) *
              seconds *
              coefficientOfTime,
          z:
            collidableEntity.position.z +
            collidableEntity.collidableOffset.z +
            (isMovable(collidableEntity) ? collidableEntity.velocity.z : 0) *
              seconds *
              coefficientOfTime,
        };
      }

      // get first collision with each of the other collidable viewport entities (and, in the case of mario, viewport edges)
      for (
        let movableEntityIndex = 0;
        movableEntityIndex !== movableEntities.length;
        movableEntityIndex++
      ) {
        const movableEntity = movableEntities[movableEntityIndex];
        const movableEntityHitboxLength: Length = {
          x: movableEntity.length.x - movableEntity.collidableOffset.x * 2,
          y: movableEntity.length.y - movableEntity.collidableOffset.y * 2,
          z: movableEntity.length.z - movableEntity.collidableOffset.z * 2,
        };
        const movableEntityHitboxPosition: Position = {
          x: movableEntity.position.x + movableEntity.collidableOffset.x,
          y: movableEntity.position.y + movableEntity.collidableOffset.y,
          z: movableEntity.position.z + movableEntity.collidableOffset.z,
        };
        const movableEntityHitboxNextPosition: Position = {
          x:
            movableEntity.position.x +
            movableEntity.collidableOffset.x +
            movableEntity.velocity.x * (seconds * coefficientOfTime),
          y:
            movableEntity.position.y +
            movableEntity.collidableOffset.y +
            movableEntity.velocity.y * (seconds * coefficientOfTime),
          z:
            movableEntity.position.z +
            movableEntity.collidableOffset.z +
            movableEntity.velocity.z * (seconds * coefficientOfTime),
        };

        for (
          let collidableEntityIndex = 0;
          collidableEntityIndex !== collidableEntities.length;
          collidableEntityIndex++
        ) {
          const collidableEntity = collidableEntities[collidableEntityIndex];

          if (movableEntity === collidableEntity) {
            continue;
          }

          const collidableEntityHitboxLength =
            collidableEntityHitboxLengths[collidableEntityIndex];
          const collidableEntityHitboxPosition =
            collidableEntityHitboxPositions[collidableEntityIndex];
          const collidableEntityHitboxNextPosition =
            collidableEntityHitboxNextPositions[collidableEntityIndex];

          if (
            getIsCollision(
              movableEntityHitboxNextPosition,
              movableEntityHitboxLength,
              collidableEntityHitboxNextPosition,
              collidableEntityHitboxLength
            )
          ) {
            const collidableEntityHitboxNextPosition: Position = {
              x: collidableEntityHitboxPosition.x,
              y: collidableEntityHitboxPosition.y,
              z: collidableEntityHitboxPosition.z,
            };

            if (isMovable(collidableEntity)) {
              collidableEntityHitboxNextPosition.x +=
                collidableEntity.velocity.x * (seconds * coefficientOfTime);
              collidableEntityHitboxNextPosition.y +=
                collidableEntity.velocity.y * (seconds * coefficientOfTime);
              collidableEntityHitboxNextPosition.z +=
                collidableEntity.velocity.z * (seconds * coefficientOfTime);
            }

            const collisionsBySide = new Array<
              [coefficientOfTime: number, side: Side]
            >(4);
            let collisionsBySideIndex = 0;

            if (
              movableEntity.collidableSides.bottom &&
              collidableEntity.collidableSides.top &&
              movableEntityHitboxPosition.y >=
                collidableEntityHitboxPosition.y +
                  collidableEntityHitboxLength.y &&
              movableEntityHitboxNextPosition.y <
                collidableEntityHitboxNextPosition.y +
                  collidableEntityHitboxLength.y &&
              movableEntityHitboxNextPosition.y >=
                collidableEntityHitboxNextPosition.y
            ) {
              const prevLengthBetween =
                movableEntityHitboxPosition.y -
                (collidableEntityHitboxPosition.y +
                  collidableEntityHitboxLength.y);
              const totalLengthDelta =
                movableEntityHitboxPosition.y -
                movableEntityHitboxNextPosition.y;

              collisionsBySide[collisionsBySideIndex++] = [
                prevLengthBetween / totalLengthDelta,
                "bottom",
              ];

              if (movableEntity instanceof Mario) {
                movableEntity.isJumping = false;
              }
            }
            if (
              movableEntity.collidableSides.left &&
              collidableEntity.collidableSides.right &&
              movableEntityHitboxPosition.x >=
                collidableEntityHitboxPosition.x +
                  collidableEntityHitboxLength.x &&
              movableEntityHitboxNextPosition.x <
                collidableEntityHitboxNextPosition.x +
                  collidableEntityHitboxLength.x &&
              movableEntityHitboxNextPosition.x >=
                collidableEntityHitboxNextPosition.x
            ) {
              const prevLengthBetween =
                movableEntityHitboxPosition.x -
                (collidableEntityHitboxPosition.x +
                  collidableEntityHitboxLength.x);
              const totalLengthDelta =
                movableEntityHitboxPosition.x -
                movableEntityHitboxNextPosition.x;

              collisionsBySide[collisionsBySideIndex++] = [
                prevLengthBetween / totalLengthDelta,
                "left",
              ];
            }
            if (
              movableEntity.collidableSides.right &&
              collidableEntity.collidableSides.left &&
              movableEntityHitboxPosition.x + movableEntityHitboxLength.x <=
                collidableEntityHitboxPosition.x &&
              movableEntityHitboxNextPosition.x + movableEntityHitboxLength.x >
                collidableEntityHitboxNextPosition.x &&
              movableEntityHitboxNextPosition.x <=
                collidableEntityHitboxNextPosition.x
            ) {
              const prevLengthBetween =
                collidableEntityHitboxPosition.x -
                (movableEntityHitboxPosition.x + movableEntityHitboxLength.x);
              const totalLengthDelta =
                movableEntityHitboxNextPosition.x -
                movableEntityHitboxPosition.x;

              collisionsBySide[collisionsBySideIndex++] = [
                prevLengthBetween / totalLengthDelta,
                "right",
              ];
            }
            if (
              movableEntity.collidableSides.top &&
              collidableEntity.collidableSides.bottom &&
              movableEntityHitboxPosition.y + movableEntityHitboxLength.y <=
                collidableEntityHitboxPosition.y &&
              movableEntityHitboxNextPosition.y + movableEntityHitboxLength.y >
                collidableEntityHitboxNextPosition.y &&
              movableEntityHitboxNextPosition.y <=
                collidableEntityHitboxNextPosition.y
            ) {
              const prevLengthBetween =
                collidableEntityHitboxPosition.y -
                (movableEntityHitboxPosition.y + movableEntityHitboxLength.y);
              const totalLengthDelta =
                movableEntityHitboxNextPosition.y -
                movableEntityHitboxPosition.y;

              collisionsBySide[collisionsBySideIndex++] = [
                prevLengthBetween / totalLengthDelta,
                "top",
              ];
            }

            collisionsBySide.length = collisionsBySideIndex;

            if (collisionsBySide.length !== 0) {
              collisionsBySide.sort(([a], [b]) => a - b);

              const [coefficientOfTime, side] = collisionsBySide[0];

              collisions[collisionsIndex++] = [
                coefficientOfTime,
                movableEntityIndex,
                side,
                collidableEntityIndex,
              ];
            }
          }
        }

        collisions.length = collisionsIndex;
      }

      // percentage of `elapsedMs` between prev update and earliest collision (or now)
      const updateCoefficientOfTime =
        (collisions[0]?.[0] ?? 1) * coefficientOfTime;

      const movableEntityNextPositions = new Array<Position>(
        movableEntities.length
      );
      let movableEntityNextPositionsIndex = 0;
      for (let i = 0; i !== movableEntities.length; i++) {
        const movableEntity = movableEntities[i];

        movableEntityNextPositions[movableEntityNextPositionsIndex++] = {
          x:
            movableEntity.position.x +
            movableEntity.velocity.x * (seconds * updateCoefficientOfTime),
          y:
            movableEntity.position.y +
            movableEntity.velocity.y * (seconds * updateCoefficientOfTime),
          z:
            movableEntity.position.z +
            movableEntity.velocity.z * (seconds * updateCoefficientOfTime),
        };
      }

      if (collisions.length !== 0) {
        // sort collisions by time
        collisions.sort(([a], [b]) => a - b);

        const earliestCollisionCoefficientOfTime = collisions[0][0];

        // for each of earliest collision(s), update corresponding entity(s) position/velocity
        let index = 0;
        while (
          index !== collisions.length &&
          collisions[index][0] === earliestCollisionCoefficientOfTime
        ) {
          const [, movableEntityIndex, side, collidableEntityIndex] =
            collisions[index];
          const movableEntity = movableEntities[movableEntityIndex];
          const collidableEntity = collidableEntities[collidableEntityIndex];

          switch (side) {
            case "bottom":
              movableEntityNextPositions[movableEntityIndex].y =
                collidableEntity.position.y +
                collidableEntity.length.y -
                collidableEntity.collidableOffset.y -
                movableEntity.collidableOffset.y;
              movableEntity.velocity.y =
                -movableEntity.velocity.y * movableEntity.elasticity;
              break;
            case "left":
              movableEntityNextPositions[movableEntityIndex].x =
                collidableEntity.position.x +
                collidableEntity.length.x -
                collidableEntity.collidableOffset.x -
                movableEntity.collidableOffset.x;
              movableEntity.velocity.x =
                -movableEntity.velocity.x * movableEntity.elasticity;
              break;
            case "right":
              movableEntityNextPositions[movableEntityIndex].x =
                collidableEntity.position.x +
                collidableEntity.collidableOffset.x -
                movableEntity.length.x -
                movableEntity.collidableOffset.x;
              movableEntity.velocity.x =
                -movableEntity.velocity.x * movableEntity.elasticity;
              break;
            case "top":
              movableEntityNextPositions[movableEntityIndex].y =
                collidableEntity.position.y +
                collidableEntity.collidableOffset.y -
                movableEntity.length.y -
                movableEntity.collidableOffset.y;
              movableEntity.velocity.y =
                -movableEntity.velocity.y * movableEntity.elasticity;
              break;
          }

          index++;
        }
      }

      coefficientOfTime -= updateCoefficientOfTime;

      // update movable entities' positions
      for (let i = 0; i !== movableEntities.length; i++) {
        const movableEntity = movableEntities[i];

        movableEntity.position = movableEntityNextPositions[i];

        // update viewport based on mario's position
        if (movableEntity instanceof Mario) {
          const entityCenterX =
            movableEntity.position.x + movableEntity.length.x / 2;
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
            movableEntity.length.x;

          // prevent mario from overflowing viewport
          if (movableEntity.position.x < minPositionX) {
            movableEntity.position.x = minPositionX;

            if (movableEntity.velocity.x < 0) {
              movableEntity.velocity.x = 0;
            }
          } else if (movableEntity.position.x > maxPositionX) {
            movableEntity.position.x = maxPositionX;

            if (movableEntity.velocity.x > 0) {
              movableEntity.velocity.x = 0;
            }
          }
        }
      }
    } while (collisions.length !== 0);

    for (let i = 0; i !== movableEntities.length; i++) {
      const entity = movableEntities[i];

      // update velocity based on gravity
      if (entity.mass !== 0 && entity.mass !== Infinity) {
        entity.velocity.x += this.state.universe.acceleration.x * seconds;
        entity.velocity.y += this.state.universe.acceleration.y * seconds;
        entity.velocity.z += this.state.universe.acceleration.z * seconds;
      }

      if (entity instanceof Mario) {
        if (isPressingA) {
          entity.isRunning = true;
        }
        if (isReleasingA) {
          entity.isRunning = false;
        }
        if (isReleasingB) {
          entity.isJumping = false;
        }

        // decelerate if moving left but no longer holding left
        if (entity.velocity.x < 0 && !isPressingLeft) {
          entity.velocity.x += Math.min(
            entity.deceleration.x * seconds,
            -entity.velocity.x
          );
        }

        // decelerate if moving right but no longer holding right
        if (entity.velocity.x > 0 && !isPressingRight) {
          entity.velocity.x -= Math.min(
            entity.deceleration.x * seconds,
            entity.velocity.x
          );
        }

        // accelerate if holding left
        // @todo only increase if "running" AND on not in the air
        if (isPressingLeft) {
          entity.velocity.x -=
            entity.acceleration.x * seconds * (entity.isRunning ? 2 : 1);
        }

        // accelerate if holding right
        // @todo only increase if "running" AND on not in the air
        if (isPressingRight) {
          entity.velocity.x +=
            entity.acceleration.x * seconds * (entity.isRunning ? 2 : 1);
        }

        // jump
        if (isPressingB) {
          if (
            !entity.isJumping &&
            // @todo AND not in the air
            this.elapsedMsSincePressB === 0
          ) {
            entity.isJumping = true;
            entity.velocity.y += entity.acceleration.y;
          } else if (
            entity.isJumping &&
            this.elapsedMsSincePressB !== null &&
            this.elapsedMsSincePressB < JUMP_INPUT_DURATION
          ) {
            entity.velocity.y += entity.acceleration.y / 9.8;
          }
        }
      }

      if (entity.vmax) {
        entity.velocity.x = clamp(
          -entity.vmax.x,
          entity.velocity.x,
          entity.vmax.x
        );
        entity.velocity.y = clamp(
          -entity.vmax.y,
          entity.velocity.y,
          entity.vmax.y
        );
        entity.velocity.z = clamp(
          -entity.vmax.z,
          entity.velocity.z,
          entity.vmax.z
        );
      }
    }

    if (this.keyups.has("b")) {
      this.elapsedMsSincePressB = null;
    }

    for (const key of this.keyups) {
      this.keydowns.delete(key);
    }

    this.keyups.clear();

    this.render();
    this.prevUpdateMs = now;
    this.animationFrameRequest = requestAnimationFrame(this.update);
  };

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
        this.context.canvas.addEventListener("keydown", this.onKeyDown);
        this.context.canvas.addEventListener("keyup", this.onKeyUp);

        this.context.canvas.focus();

        this.animationFrameRequest = requestAnimationFrame(this.update);
      });
  };

  pause = () => {
    if (this.pauseMs === null) {
      this.pauseMs = Date.now();

      if (this.animationFrameRequest) {
        cancelAnimationFrame(this.animationFrameRequest);
        this.animationFrameRequest = null;
      }
    }
  };

  reset = () => {
    if (this.animationFrameRequest) {
      cancelAnimationFrame(this.animationFrameRequest);
    }

    this.keydowns.clear();
    this.keyups.clear();

    this.elapsedMsSincePrevSecond = 0;
    this.elapsedMsSincePressB = null;
    this.pauseMs = null;
    this.prevRenderMs = null;
    this.prevUpdateMs = null;
    this.state = Game.initialState;

    this.context.canvas.focus();

    this.animationFrameRequest = requestAnimationFrame(this.update);
  };

  unpause = () => {
    if (this.pauseMs !== null) {
      const now = Date.now();

      if (this.prevRenderMs !== null) {
        this.prevRenderMs += now - this.pauseMs;
      }
      if (this.prevUpdateMs !== null) {
        this.prevUpdateMs += now - this.pauseMs;
      }
      this.pauseMs = null;
      this.animationFrameRequest = requestAnimationFrame(this.update);
    }
  };
}
