import { COLOR_VALUES, RENDERS_PER_TICK } from "@/constants";
import { Mario } from "@/entities";
import {
  Bitmap,
  CollidableEntity,
  MovableEntity,
  Neighbors,
  Side,
  Velocity,
} from "@/types";
import { drawBitmap, flip, gridUnits, gridUnitsPerSecond } from "@/utils";

const { BLACK: K, BROWN: B, BROWN_LIGHT: L, TRANSPARENT: T } = COLOR_VALUES;

// prettier-ignore
const SQUASHED_BITMAP: Bitmap = [
  [T,T,T,T,T,T,B,B,B,B,T,T,T,T,T,T],
  [T,T,T,B,B,B,B,B,B,B,B,B,B,T,T,T],
  [T,B,B,K,K,K,B,B,B,B,K,K,K,B,B,T],
  [B,B,L,L,L,L,K,K,K,K,L,L,L,L,B,B],
  [B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B],
  [T,T,T,L,L,L,L,L,L,L,L,L,L,T,T,T],
  [T,T,T,T,L,L,L,L,L,L,L,L,T,T,T,T],
  [T,K,K,K,K,K,T,T,T,T,K,K,K,K,K,T],
];
// prettier-ignore
const WALKING_BITMAP: Bitmap = [
  [T,T,T,T,T,T,B,B,B,B,T,T,T,T,T,T],
  [T,T,T,T,T,B,B,B,B,B,B,T,T,T,T,T],
  [T,T,T,T,B,B,B,B,B,B,B,B,T,T,T,T],
  [T,T,T,B,B,B,B,B,B,B,B,B,B,T,T,T],
  [T,T,B,K,K,B,B,B,B,B,B,K,K,B,T,T],
  [T,B,B,B,L,K,B,B,B,B,K,L,B,B,B,T],
  [T,B,B,B,L,K,K,K,K,K,K,L,B,B,B,T],
  [B,B,B,B,L,K,L,B,B,L,K,L,B,B,B,B],
  [B,B,B,B,L,L,L,B,B,L,L,L,B,B,B,B],
  [B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B],
  [T,B,B,B,B,L,L,L,L,L,L,B,B,B,B,T],
  [T,T,T,T,L,L,L,L,L,L,L,L,T,T,T,T],
  [T,T,T,T,L,L,L,L,L,L,L,L,K,K,T,T],
  [T,T,T,K,K,L,L,L,L,L,K,K,K,K,K,T],
  [T,T,T,K,K,K,T,T,T,K,K,K,K,K,K,T],
  [T,T,T,T,K,K,K,T,T,K,K,K,K,K,T,T],
];

const SQUASHED = drawBitmap(SQUASHED_BITMAP);
const WALKING_A = drawBitmap(WALKING_BITMAP);
const WALKING_B = drawBitmap(flip(WALKING_BITMAP));

const VELOCITY: Velocity = {
  x: gridUnitsPerSecond(-1.6),
  y: 0,
  z: 0,
};

export class Goomba implements CollidableEntity, MovableEntity {
  private numRenders: number;

  acceleration = {
    x: 0,
    y: 0,
    z: 0,
  };
  friction = 0;
  isDead = false;
  isFacingLeft = false;
  isSquashed = false;
  mass = 20;
  position;
  velocity = {
    x: VELOCITY.x,
    y: VELOCITY.y,
    z: VELOCITY.z,
  };
  vmax = {
    x: gridUnitsPerSecond(1.6),
    y: gridUnitsPerSecond(16),
    z: 0,
  };
  vmin = {
    x: 0.25,
    y: 0,
    z: 0,
  };

  get collidableSides() {
    if (this.isDead || this.isSquashed) {
      return {
        bottom: false,
        left: false,
        right: false,
        top: false,
      };
    }

    return {
      bottom: true,
      left: true,
      right: true,
      top: true,
    };
  }
  get length() {
    return {
      x: this.isDead ? 0 : gridUnits(1),
      y: this.isDead || this.isSquashed ? 0 : gridUnits(1),
      z: this.isDead ? 0 : 1,
    };
  }

  constructor(gridX: number, gridY: number) {
    this.numRenders = 0;
    this.position = {
      x: gridUnits(gridX),
      y: gridUnits(gridY),
      z: 0,
    };
  }

  collide(side: Side, entity: CollidableEntity): void {
    if (side === "top" && entity instanceof Mario) {
      this.isSquashed = true;
      this.numRenders = 0;
    }
  }

  render(context: CanvasRenderingContext2D): void {
    if (this.isDead) {
      return;
    }

    this.numRenders++;

    if (this.isSquashed) {
      context.drawImage(
        SQUASHED,
        0,
        gridUnits(-0.5),
        this.length.x,
        gridUnits(0.5)
      );

      if (this.numRenders === RENDERS_PER_TICK) {
        this.isDead = true;
      }

      return;
    }

    if (this.numRenders === (RENDERS_PER_TICK / 3) * 2) {
      this.numRenders = 0;
    }

    context.drawImage(
      Math.floor(this.numRenders / (RENDERS_PER_TICK / 3)) === 0
        ? WALKING_A
        : WALKING_B,
      0,
      0,
      this.length.x,
      this.length.y
    );
  }

  update(_: never, neighbors: Neighbors): void {
    if (neighbors.left.length !== 0 && this.velocity.x <= 0) {
      this.velocity.x = neighbors.left.some((entity) => entity instanceof Mario)
        ? VELOCITY.x
        : -VELOCITY.x;
    } else if (
      neighbors.right.length !== 0 &&
      !neighbors.right.some((entity) => entity instanceof Mario) &&
      this.velocity.x >= 0
    ) {
      this.velocity.x = neighbors.right.some(
        (entity) => entity instanceof Mario
      )
        ? -VELOCITY.x
        : VELOCITY.x;
    }
  }
}
