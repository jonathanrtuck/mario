import { COLOR_BLACK, COLOR_BROWN, COLOR_BROWN_LIGHT } from "@/constants";
import { Bitmap, CollidableEntity } from "@/types";
import { drawBitmap, gridUnits } from "@/utils";

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
    this.position = {
      x: gridUnits(gridX),
      y: gridUnits(gridY),
      z: 0,
    };
  }

  render(context: CanvasRenderingContext2D): void {
    context.drawImage(BRICK, 0, 0, this.length.x, this.length.y);
  }
}
