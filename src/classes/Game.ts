import "setimmediate";

import { State } from "@/classes";
import {
  BUTTONS,
  COLOR_VALUES,
  UPDATE_INTERVAL,
  UPDATES_PER_RENDER,
  UPDATES_PER_TICK,
} from "@/constants";
import {
  Block,
  Brick,
  Bush,
  Castle,
  Cloud,
  Flag,
  Goomba,
  Hill,
  Mario,
  Pipe,
  QuestionBlock,
  Wall,
} from "@/entities";
import { Bitmap, Button, Entity, MS, Neighbors, Position, Side } from "@/types";
import {
  clamp,
  drawBitmap,
  gridUnits,
  gridUnitsPerSecondPerSecond,
  int,
  isCollidable,
  isOverlapByDimension,
  isMovable,
  oppositeSide,
  pixels,
} from "@/utils";

const {
  BLACK: K,
  BROWN: B,
  TRANSPARENT: T,
  WHITE: W,
  YELLOW_DARK: Y,
} = COLOR_VALUES;

// prettier-ignore
const COIN_BITMAP: Bitmap = [
  [T,Y,Y,K,T],
  [Y,Y,Y,Y,K],
  [Y,Y,Y,Y,K],
  [Y,Y,Y,Y,K],
  [Y,Y,Y,Y,K],
  [Y,Y,Y,Y,K],
  [K,Y,Y,K,B],
  [T,K,K,B,T],
];
// prettier-ignore
const X_BITMAP: Bitmap = [
  [W,T,T,T,W],
  [T,W,T,W,T],
  [T,T,W,T,T],
  [T,W,T,W,T],
  [W,T,T,T,W],
];

const COIN = drawBitmap(COIN_BITMAP);
const X = drawBitmap(X_BITMAP);

export class Game {
  static initialTime = 400;

  static get initialState(): State {
    return new State({
      entities: [
        new Wall(0, 0, 69, 4),
        new Hill(0, 4, "large"),
        new Cloud(8, 12, "small"),
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
        new Flag(198.4375, 5),
        new Castle(202, 4),
        new Mario(2.5625, 4, "small"),
        new Goomba(22, 4),
        new Goomba(40, 4),
        new Goomba(51, 4),
        new Goomba(52.5, 4),
        new Goomba(80, 12),
        new Goomba(82, 12),
        new Goomba(97, 4),
        new Goomba(98.5, 4),
        new Goomba(114, 4),
        new Goomba(115.5, 4),
        new Goomba(124, 4),
        new Goomba(125.5, 4),
        new Goomba(128, 4),
        new Goomba(129.5, 4),
        new Goomba(174, 4),
        new Goomba(175.5, 4),
      ].toSorted(
        (a, b) => a.position.z + a.length.z - (b.position.z + b.length.z)
      ),
      universe: {
        acceleration: {
          x: 0,
          y: gridUnitsPerSecondPerSecond(-64),
          z: 0,
        },
        color: COLOR_VALUES.BLUE,
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
    });
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
    for (const button of BUTTONS) {
      if (this.keyBinding[button].has(e.key)) {
        e.preventDefault();

        if (button === "start") {
          (this.isPaused ? this.unpause : this.pause)();
        } else {
          this.buttons.add(button);
        }
      }
    }
  };

  private onKeyUp = (e: KeyboardEvent): void => {
    for (const button of BUTTONS) {
      if (this.keyBinding[button].has(e.key)) {
        e.preventDefault();

        this.buttons.delete(button);
      }
    }
  };

  private render = (): void => {
    this.context.reset();

    // render universe
    this.context.canvas.height = this.state.viewport.length.y;
    this.context.canvas.width = this.state.viewport.length.x;
    this.context.canvas.style.backgroundColor = this.state.universe.color;

    // render text
    this.context.font = `${pixels(11)}px PixelEmulator`;
    this.context.fillStyle = COLOR_VALUES.WHITE;

    const sectionWidth = this.state.viewport.length.x / 4;
    const top = pixels(12);
    const bottom = pixels(21);

    let x = sectionWidth * 0 + pixels(24);
    this.context.fillText("MARIO", x, top);
    this.context.fillText(String(this.score).padStart(6, "0"), x, bottom);

    x = sectionWidth * 1 + pixels(28);
    this.context.drawImage(COIN, x, bottom, pixels(5), pixels(-8));
    this.context.drawImage(X, x + pixels(8), bottom, pixels(5), pixels(-5));
    this.context.fillText(
      String(this.coins).padStart(2, "0"),
      x + pixels(16),
      bottom
    );

    x = sectionWidth * 2 + pixels(14);
    this.context.fillText("WORLD", x, top);
    this.context.fillText(
      `${this.world}-${this.level}`,
      x + pixels(11),
      bottom
    );

    x = sectionWidth * 3 + pixels(8);
    this.context.fillText("TIME", x, top);
    this.context.fillText(
      String(this.time).padStart(3, "0"),
      x + pixels(6),
      bottom
    );

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

      entity.render(this.context, this.time);

      this.context.restore();
    }
  };

  // @recursive
  private update = (): void => {
    const now = performance.now();

    if (this.isStopped) {
      return;
    }

    if (!this.isPaused) {
      const elapsedTime =
        this.prevUpdateTime === null ? 0 : now - this.prevUpdateTime;

      if (elapsedTime >= UPDATE_INTERVAL) {
        this.numUpdatesSinceRender++;
        this.prevUpdateTime = now - (elapsedTime - UPDATE_INTERVAL);

        // update time
        if (this.isTicking) {
          if (this.numUpdatesSinceTick === UPDATES_PER_TICK) {
            this.numUpdatesSinceTick = 0;
            this.time--;

            if (this.time === 0) {
              this.lose();
            }
          } else {
            this.numUpdatesSinceTick++;
          }
        }

        // only update entities within viewport
        const entitiesToUpdate = this.state.entities.filter(
          (entity) =>
            entity.position.x <
              this.state.viewport.position.x +
                this.state.viewport.length.x +
                gridUnits(2) &&
            entity.position.x + entity.length.x >
              this.state.viewport.position.x - gridUnits(2) &&
            entity.position.z <=
              this.state.viewport.position.z + this.state.viewport.length.z &&
            entity.position.z + entity.length.z >=
              this.state.viewport.position.z
        );
        const collidableEntities = entitiesToUpdate.filter(isCollidable);
        const movableEntities = entitiesToUpdate.filter(isMovable);

        // apply acceleration
        for (const movableEntity of movableEntities) {
          movableEntity.velocity.x +=
            movableEntity.acceleration.x * UPDATE_INTERVAL;
          movableEntity.velocity.y +=
            movableEntity.acceleration.y * UPDATE_INTERVAL;
        }

        let collisions: [
          time: MS,
          movableEntityIndex: number,
          side: Side,
          collidableEntityIndex: number
        ][] = [];

        // collision detection
        let timeRemaining = UPDATE_INTERVAL;
        do {
          collisions = [];

          // get movableEntities' projected positions based on their velocity and remaining time
          const projectedPositions = new Array<Position>(
            movableEntities.length
          );

          for (let i = 0; i !== movableEntities.length; i++) {
            const movableEntity = movableEntities[i];

            projectedPositions[i] = {
              x: int(
                movableEntity.position.x +
                  movableEntity.velocity.x * timeRemaining
              ),
              y: int(
                movableEntity.position.y +
                  movableEntity.velocity.y * timeRemaining
              ),
              z: movableEntity.position.z,
            };
          }

          // get collisions
          for (
            let movableEntityIndex = 0;
            movableEntityIndex !== movableEntities.length;
            movableEntityIndex++
          ) {
            const movableEntity = movableEntities[movableEntityIndex];

            if (!isCollidable(movableEntity)) {
              continue;
            }

            const movablePosition = projectedPositions[movableEntityIndex];
            let movableEntitiesIndex = 0;

            for (
              let collidableEntityIndex = 0;
              collidableEntityIndex !== collidableEntities.length;
              collidableEntityIndex++
            ) {
              const collidableEntity =
                collidableEntities[collidableEntityIndex];
              const collidablePosition = isMovable(collidableEntity)
                ? projectedPositions[movableEntitiesIndex++]
                : collidableEntity.position;

              if ((movableEntity as Entity) === (collidableEntity as Entity)) {
                continue;
              }

              if (
                isOverlapByDimension(
                  movablePosition.x,
                  movableEntity.length.x,
                  collidablePosition.x,
                  collidableEntity.length.x
                ) &&
                isOverlapByDimension(
                  movablePosition.y,
                  movableEntity.length.y,
                  collidablePosition.y,
                  collidableEntity.length.y
                ) &&
                isOverlapByDimension(
                  movablePosition.z,
                  movableEntity.length.z,
                  collidablePosition.z,
                  collidableEntity.length.z
                )
              ) {
                const collisionsBySide: [time: MS, side: Side][] = [];

                if (
                  movableEntity.collidableSides.bottom &&
                  collidableEntity.collidableSides.top &&
                  movableEntity.position.y >=
                    collidableEntity.position.y + collidableEntity.length.y &&
                  movablePosition.y <
                    collidablePosition.y + collidableEntity.length.y
                ) {
                  const prevLengthBetween =
                    movableEntity.position.y -
                    (collidableEntity.position.y + collidableEntity.length.y);
                  const totalLengthDelta =
                    movableEntity.position.y - movablePosition.y;

                  collisionsBySide.push([
                    totalLengthDelta
                      ? (prevLengthBetween / totalLengthDelta) * timeRemaining
                      : 0,
                    "bottom",
                  ]);
                }
                if (
                  movableEntity.collidableSides.left &&
                  collidableEntity.collidableSides.right &&
                  movableEntity.position.x >=
                    collidableEntity.position.x + collidableEntity.length.x &&
                  movablePosition.x <
                    collidablePosition.x + collidableEntity.length.x
                ) {
                  const prevLengthBetween =
                    movableEntity.position.x -
                    (collidableEntity.position.x + collidableEntity.length.x);
                  const totalLengthDelta =
                    movableEntity.position.x - movablePosition.x;

                  collisionsBySide.push([
                    totalLengthDelta
                      ? (prevLengthBetween / totalLengthDelta) * timeRemaining
                      : 0,
                    "left",
                  ]);
                }
                if (
                  movableEntity.collidableSides.right &&
                  collidableEntity.collidableSides.left &&
                  movableEntity.position.x + movableEntity.length.x <=
                    collidableEntity.position.x &&
                  movablePosition.x + movableEntity.length.x >
                    collidablePosition.x
                ) {
                  const prevLengthBetween =
                    movableEntity.position.x +
                    movableEntity.length.x -
                    collidableEntity.position.x;
                  const totalLengthDelta =
                    movableEntity.position.x - movablePosition.x;

                  collisionsBySide.push([
                    totalLengthDelta
                      ? (prevLengthBetween / totalLengthDelta) * timeRemaining
                      : 0,
                    "right",
                  ]);
                }
                if (
                  movableEntity.collidableSides.top &&
                  collidableEntity.collidableSides.bottom &&
                  movableEntity.position.y + movableEntity.length.y <=
                    collidableEntity.position.y &&
                  movablePosition.y + movableEntity.length.y >
                    collidablePosition.y
                ) {
                  const prevLengthBetween =
                    movableEntity.position.y +
                    movableEntity.length.y -
                    collidableEntity.position.y;
                  const totalLengthDelta =
                    movableEntity.position.y - movablePosition.y;

                  collisionsBySide.push([
                    totalLengthDelta
                      ? (prevLengthBetween / totalLengthDelta) * timeRemaining
                      : 0,
                    "top",
                  ]);
                }

                if (collisionsBySide.length !== 0) {
                  collisionsBySide.sort(([aTime], [bTime]) => aTime - bTime);

                  const [time, side] = collisionsBySide[0];

                  collisions.push([
                    time,
                    movableEntityIndex,
                    side,
                    collidableEntityIndex,
                  ]);
                }
              }
            }
          }

          if (collisions.length !== 0) {
            // sort collisions by time
            collisions.sort(([aTime], [bTime]) => aTime - bTime);

            const [earliestTime] = collisions[0];

            // only handle one collision per movableEntity
            const uniqueCollisions = new Array<(typeof collisions)[number]>();

            for (const collision of collisions) {
              const [time, movableEntityIndex, side, collidableEntityIndex] =
                collision;

              if (time !== earliestTime) {
                break;
              }

              const prevCollision = uniqueCollisions.find(
                ([, index]) => index === movableEntityIndex
              );

              if (prevCollision) {
                const [, , prevSide, prevCollidableEntityIndex] = prevCollision;
                const collidableEntity =
                  collidableEntities[collidableEntityIndex];
                const prevCollidableEntity =
                  collidableEntities[prevCollidableEntityIndex];

                if (prevSide === side) {
                  if (
                    !isMovable(collidableEntity) &&
                    !isMovable(prevCollidableEntity)
                  ) {
                    const movableEntity = movableEntities[movableEntityIndex];
                    const overlap = Math.min(
                      collidableEntity.position.x +
                        collidableEntity.length.x -
                        movableEntity.position.x,
                      movableEntity.position.x +
                        movableEntity.length.x -
                        collidableEntity.position.x
                    );
                    const prevOverlap = Math.min(
                      prevCollidableEntity.position.x +
                        prevCollidableEntity.length.x -
                        movableEntity.position.x,
                      movableEntity.position.x +
                        movableEntity.length.x -
                        prevCollidableEntity.position.x
                    );

                    if (overlap > prevOverlap) {
                      const prevCollisionIndex =
                        uniqueCollisions.indexOf(prevCollision);

                      uniqueCollisions.splice(prevCollisionIndex, 1, collision);
                    }
                  } else {
                    uniqueCollisions.push(collision);
                  }
                } else {
                  // @todo if collidableEntity !== prevCollidableEntity, but they have same y or x position, pick only one

                  uniqueCollisions.push(collision);
                }
              } else {
                uniqueCollisions.push(collision);
              }
            }

            // update entities' positions up to earliestTime
            for (const movableEntity of movableEntities) {
              movableEntity.position.x = int(
                movableEntity.position.x +
                  movableEntity.velocity.x * earliestTime
              );
              movableEntity.position.y = int(
                movableEntity.position.y +
                  movableEntity.velocity.y * earliestTime
              );
            }

            // handle collisions
            for (const collision of uniqueCollisions) {
              const [time, movableEntityIndex, side, collidableEntityIndex] =
                collision;

              if (time !== earliestTime) {
                break;
              }

              const movableEntity = movableEntities[movableEntityIndex];
              const collidableEntity =
                collidableEntities[collidableEntityIndex];

              switch (side) {
                case "bottom":
                  movableEntity.acceleration.y = 0;
                  movableEntity.position.y =
                    collidableEntity.position.y + collidableEntity.length.y;
                  movableEntity.velocity.y = 0;

                  if (isMovable(collidableEntity)) {
                    collidableEntity.acceleration.y = 0;
                    collidableEntity.velocity.y = 0;
                  }
                  break;
                case "left":
                  movableEntity.acceleration.x = 0;
                  movableEntity.position.x =
                    collidableEntity.position.x + collidableEntity.length.x;
                  movableEntity.velocity.x = 0;

                  if (isMovable(collidableEntity)) {
                    collidableEntity.acceleration.x = 0;
                    collidableEntity.velocity.x = 0;
                  }
                  break;
                case "right":
                  movableEntity.acceleration.x = 0;
                  movableEntity.position.x =
                    collidableEntity.position.x - movableEntity.length.x;
                  movableEntity.velocity.x = 0;

                  if (isMovable(collidableEntity)) {
                    collidableEntity.acceleration.x = 0;
                    collidableEntity.velocity.x = 0;
                  }
                  break;
                case "top":
                  movableEntity.acceleration.y = 0;
                  movableEntity.position.y =
                    collidableEntity.position.y - movableEntity.length.y;
                  movableEntity.velocity.y = 0;

                  if (isMovable(collidableEntity)) {
                    collidableEntity.acceleration.y = 0;
                    collidableEntity.velocity.y = 0;
                  }
                  break;
              }

              // this will always be true
              if (isCollidable(movableEntity)) {
                movableEntity.collide?.(
                  side,
                  collidableEntity,
                  this.lose,
                  this.win
                );
                collidableEntity.collide?.(
                  oppositeSide(side),
                  movableEntity,
                  this.lose,
                  this.win
                );
              }
            }

            timeRemaining -= earliestTime;
          } else {
            // update entities' positions up to now
            for (const movableEntity of movableEntities) {
              movableEntity.position.x = int(
                movableEntity.position.x +
                  movableEntity.velocity.x * timeRemaining
              );
              movableEntity.position.y = int(
                movableEntity.position.y +
                  movableEntity.velocity.y * timeRemaining
              );
            }
          }
        } while (collisions.length !== 0);

        for (const entity of entitiesToUpdate) {
          const neighbors: Neighbors = {
            bottom: [],
            left: [],
            right: [],
            top: [],
          };

          // get neighbors
          if (isCollidable(entity)) {
            for (const collidableEntity of collidableEntities) {
              if (collidableEntity === entity) {
                continue;
              }

              if (
                entity.collidableSides.bottom &&
                collidableEntity.collidableSides.top &&
                collidableEntity.position.y + collidableEntity.length.y ===
                  entity.position.y &&
                isOverlapByDimension(
                  entity.position.x,
                  entity.length.x,
                  collidableEntity.position.x,
                  collidableEntity.length.x
                )
              ) {
                neighbors.bottom.push(collidableEntity);
              }
              if (
                entity.collidableSides.left &&
                collidableEntity.collidableSides.right &&
                collidableEntity.position.x + collidableEntity.length.x ===
                  entity.position.x &&
                isOverlapByDimension(
                  entity.position.y,
                  entity.length.y,
                  collidableEntity.position.y,
                  collidableEntity.length.y
                )
              ) {
                neighbors.left.push(collidableEntity);
              }
              if (
                entity.collidableSides.right &&
                collidableEntity.collidableSides.left &&
                collidableEntity.position.x ===
                  entity.position.x + entity.length.x &&
                isOverlapByDimension(
                  entity.position.y,
                  entity.length.y,
                  collidableEntity.position.y,
                  collidableEntity.length.y
                )
              ) {
                neighbors.right.push(collidableEntity);
              }
              if (
                entity.collidableSides.top &&
                collidableEntity.collidableSides.bottom &&
                collidableEntity.position.y ===
                  entity.position.y + entity.length.y &&
                isOverlapByDimension(
                  entity.position.x,
                  entity.length.x,
                  collidableEntity.position.x,
                  collidableEntity.length.x
                )
              ) {
                neighbors.top.push(collidableEntity);
              }
            }
          }

          if (isMovable(entity)) {
            // update velocity based on neighbors
            if (neighbors.bottom.length && entity.velocity.y < 0) {
              entity.velocity.y = 0;
            }
            if (neighbors.left.length && entity.velocity.x < 0) {
              entity.velocity.x = 0;
            }
            if (neighbors.right.length && entity.velocity.x > 0) {
              entity.velocity.x = 0;
            }
            if (neighbors.top.length && entity.velocity.y > 0) {
              entity.velocity.y = 0;
            }

            // apply friction
            // realistically we should also require `&& neighbors.bottom.length`, but mario slows even in the air
            if (
              entity.friction &&
              ((entity.velocity.x > 0 && entity.acceleration.x <= 0) ||
                (entity.velocity.x < 0 && entity.acceleration.x >= 0))
            ) {
              if (Math.abs(entity.velocity.x) < entity.vmin.x) {
                entity.velocity.x = 0;
              } else {
                entity.velocity.x -=
                  entity.velocity.x *
                  (entity.friction * (UPDATE_INTERVAL / 1000));
              }
            }

            // apply gravity
            entity.velocity.y +=
              this.state.universe.acceleration.y * UPDATE_INTERVAL;

            // clamp velocity
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

            // update viewport
            if (entity instanceof Mario) {
              const entityCenterX = entity.position.x + entity.length.x / 2;
              const viewportCenterX =
                this.state.viewport.position.x +
                this.state.viewport.length.x / 2;
              const maxViewportPositionX =
                this.state.universe.length.x - this.state.viewport.length.x;

              // follow entity with viewport
              if (
                !entity.isHanging &&
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

          // update entity
          entity.update?.(this.buttons, neighbors);
        }

        if (this.numUpdatesSinceRender === UPDATES_PER_RENDER) {
          this.render();
          this.numUpdatesSinceRender = 0;
        }
      }
    }

    setImmediate(this.update);
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
