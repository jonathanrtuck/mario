import {
  COLOR_BLACK,
  COLOR_BROWN,
  COLOR_BROWN_LIGHT,
  COLOR_TRANSPARENT,
} from "@/constants";
import { Bitmap, Button, CollidableEntity, MS } from "@/types";
import { drawBitmap, gridUnits } from "@/utils";

const B = COLOR_BROWN;
const K = COLOR_BLACK;
const L = COLOR_BROWN_LIGHT;

// prettier-ignore
const STONE_BITMAP: Bitmap = [
  [B,L,L,L,L,L,L,L,L,K,B,L,L,L,L,B],
  [L,B,B,B,B,B,B,B,B,K,L,B,B,B,B,K],
  [L,B,B,B,B,B,B,B,B,K,L,B,B,B,B,K],
  [L,B,B,B,B,B,B,B,B,K,L,B,B,B,B,K],
  [L,B,B,B,B,B,B,B,B,K,L,K,B,B,B,K],
  [L,B,B,B,B,B,B,B,B,K,B,K,K,K,K,B],
  [L,B,B,B,B,B,B,B,B,K,L,L,L,L,L,K],
  [L,B,B,B,B,B,B,B,B,K,L,B,B,B,B,K],
  [L,B,B,B,B,B,B,B,B,K,L,B,B,B,B,K],
  [L,B,B,B,B,B,B,B,B,K,L,B,B,B,B,K],
  [K,K,B,B,B,B,B,B,K,L,B,B,B,B,B,K],
  [L,L,K,K,B,B,B,B,K,L,B,B,B,B,B,K],
  [L,B,L,L,K,K,K,K,L,B,B,B,B,B,B,K],
  [L,B,B,B,L,L,L,K,L,B,B,B,B,B,B,K],
  [L,B,B,B,B,B,B,K,L,B,B,B,B,B,K,K],
  [B,K,K,K,K,K,K,B,L,K,K,K,K,K,K,B],
];

const STONE = drawBitmap(STONE_BITMAP);

export class Wall implements CollidableEntity {
  collidableSides = {
    bottom: false,
    left: true,
    right: true,
    top: true,
  };
  length;
  position;

  constructor(
    gridX: number,
    gridY: number,
    gridWidth: number,
    gridHeight: number
  ) {
    this.length = {
      x: gridUnits(gridWidth),
      y: gridUnits(gridHeight),
      z: 4,
    };
    this.position = {
      x: gridUnits(gridX),
      y: gridUnits(gridY),
      z: -3,
    };
  }

  render(context: CanvasRenderingContext2D): void {
    context.fillStyle =
      context.createPattern(STONE, "repeat") ?? COLOR_TRANSPARENT;
    context.fillRect(0, 0, this.length.x, this.length.y);
  }
}
