import "setimmediate";

import { State } from "@/classes";
import { BUTTONS, COLOR_BLUE, TIME_UNIT_LENGTH } from "@/constants";
import {
  Block,
  Brick,
  Bush,
  Castle,
  Cloud,
  Flag,
  Hill,
  Mario,
  Pipe,
  QuestionBlock,
  Wall,
} from "@/entities";
import { Button, MS, Position } from "@/types";
import {
  clamp,
  gridUnits,
  int,
  isCollidable,
  isMovable,
  pixels,
} from "@/utils";

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
        new Flag(198.4375, 5),
        new Castle(202, 4),
        new Mario(2.125, 4, "small"),
      ].toSorted((a, b) => a.position.z - b.position.z),
      universe: {
        acceleration: {
          x: 0,
          y: pixels(-2) / 1000, // pixels/s^2
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
  private isPaused = false;
  private isStopped = true;
  private prevUpdateTime: MS | null = null;

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
    for (const button of BUTTONS) {
      if (this.keyBinding[button].has(e.key)) {
        e.preventDefault();

        this.buttons.add(button);
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
    this.context.canvas.height = this.state.viewport.length.y;
    this.context.canvas.width = this.state.viewport.length.x;
    this.context.canvas.style.backgroundColor = this.state.universe.color;

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

      entity.render(this.context);

      this.context.restore();
    }

    this.animationFrameRequest = requestAnimationFrame(this.render);
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

      if (elapsedTime >= TIME_UNIT_LENGTH) {
        const lag = elapsedTime - TIME_UNIT_LENGTH;

        this.prevUpdateTime = now - lag;

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
        const nextPositions = entitiesToUpdate.map<Position>((entity) =>
          isMovable(entity)
            ? {
                x: entity.position.x + int(entity.velocity.x * elapsedTime),
                y: entity.position.y + int(entity.velocity.y * elapsedTime),
                z: entity.position.z + int(entity.velocity.z * elapsedTime),
              }
            : entity.position
        );

        // @todo get collisions

        for (let i = 0; i !== entitiesToUpdate.length; i++) {
          const entity = entitiesToUpdate[i];
          const nextPosition = nextPositions[i];

          // entity.position = nextPosition;

          entity.update?.(elapsedTime, this.buttons);

          // apply gravity
          if (isMovable(entity)) {
            entity.velocity.x +=
              this.state.universe.acceleration.x * elapsedTime;
            entity.velocity.y +=
              this.state.universe.acceleration.y * elapsedTime;
            entity.velocity.z +=
              this.state.universe.acceleration.z * elapsedTime;
          }

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
    }

    setImmediate(this.update);

    /*
    const now = Date.now();
    const elapsedTime =
      this.prevUpdateTime === null ? 0 : now - this.prevUpdateTime;

    if (elapsedTime) {
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
          entity.position.z + entity.length.z >= this.state.viewport.position.z
      );
      const collidableEntities = entitiesToUpdate.filter(isCollidable);
      const movableEntities = entitiesToUpdate.filter(isMovable);
      const nextPositions = entitiesToUpdate.map<Position>((entity) =>
        isMovable(entity)
          ? {
              x: entity.position.x + int(entity.velocity.x * elapsedTime),
              y: entity.position.y + int(entity.velocity.y * elapsedTime),
              z: entity.position.z + int(entity.velocity.z * elapsedTime),
            }
          : entity.position
      );

      // @todo get collisions

      for (let i = 0; i !== entitiesToUpdate.length; i++) {
        const entity = entitiesToUpdate[i];
        const nextPosition = nextPositions[i];

        entity.position = nextPosition;

        entity.update?.(elapsedTime, this.buttons);

        // apply gravity
        if (isMovable(entity)) {
          entity.velocity.x += this.state.universe.acceleration.x * elapsedTime;
          entity.velocity.y += this.state.universe.acceleration.y * elapsedTime;
          entity.velocity.z += this.state.universe.acceleration.z * elapsedTime;
        }

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
    this.prevUpdateTime = now;

    */
  };

  pause = (): void => {
    if (this.animationFrameRequest) {
      cancelAnimationFrame(this.animationFrameRequest);
    }
    this.isPaused = true;
  };

  // @todo
  reset = (): void => {
    this.isPaused = false;
    this.isStopped = false;
  };

  start = (): void => {
    this.isStopped = false;
    this.context.canvas.addEventListener("keydown", this.onKeyDown);
    this.context.canvas.addEventListener("keyup", this.onKeyUp);
    this.context.canvas.focus();
    this.animationFrameRequest = requestAnimationFrame(this.render);
    this.prevUpdateTime = performance.now();
    this.update();
  };

  stop = (): void => {
    if (this.animationFrameRequest) {
      cancelAnimationFrame(this.animationFrameRequest);
    }

    this.context.canvas.removeEventListener("keydown", this.onKeyDown);
    this.context.canvas.removeEventListener("keyup", this.onKeyUp);
    this.isStopped = true;
  };

  unpause = (): void => {
    this.isPaused = false;
    this.animationFrameRequest = requestAnimationFrame(this.render);
  };
}
