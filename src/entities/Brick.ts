import {
  COLOR_BLACK,
  COLOR_BROWN,
  COLOR_BROWN_LIGHT,
  RENDERS_PER_TICK,
} from "@/constants";
import { Bitmap, CollidableEntity, Length, Side } from "@/types";
import { drawBitmap, gridUnits, pixels } from "@/utils";

import { Mario } from "./Mario";

const NUM_ANIMATION_RENDERS = RENDERS_PER_TICK / 2;

const B = COLOR_BROWN;
const K = COLOR_BLACK;
const L = COLOR_BROWN_LIGHT;

// prettier-ignore
const BRICK_BITMAP: Bitmap = [
  [L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L],
  [B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K],
  [B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K],
  [K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K],
  [B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B],
  [B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B],
  [B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B],
  [K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K],
  [B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K],
  [B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K],
  [B,B,B,B,B,B,B,K,B,B,B,B,B,B,B,K],
  [K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K],
  [B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B],
  [B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B],
  [B,B,B,K,B,B,B,B,B,B,B,K,B,B,B,B],
  [K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K],
];

const BRICK = drawBitmap(BRICK_BITMAP);

export class Brick implements CollidableEntity {
  private numRenders: number;
  private offset: Length = {
    x: 0,
    y: 0,
    z: 0,
  };

  collidableSides = {
    bottom: true,
    left: true,
    right: true,
    top: true,
  };
  length = {
    x: gridUnits(1),
    y: gridUnits(1),
    z: 1,
  };
  position;

  constructor(gridX: number, gridY: number) {
    this.numRenders = -1;
    this.position = {
      x: gridUnits(gridX),
      y: gridUnits(gridY),
      z: 0,
    };
  }

  collide(side: Side, entity: CollidableEntity): void {
    if (
      side === "bottom" &&
      entity instanceof Mario &&
      entity.size === "small"
    ) {
      this.numRenders = 0;
    }
  }

  render(context: CanvasRenderingContext2D): void {
    if (this.numRenders !== -1 && this.numRenders <= NUM_ANIMATION_RENDERS) {
      this.offset.y -= pixels(NUM_ANIMATION_RENDERS / 2 - this.numRenders) / 3;
      this.numRenders++;
    } else {
      this.offset.y = 0;
    }

    context.drawImage(
      BRICK,
      0,
      0 + this.offset.y,
      this.length.x,
      this.length.y
    );
  }
}
