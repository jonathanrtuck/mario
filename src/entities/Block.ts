import { COLOR_BLACK, COLOR_BROWN, COLOR_BROWN_LIGHT } from "@/constants";
import { Bitmap, CollidableEntity } from "@/types";
import { drawBitmap, gridUnits } from "@/utils";

const B = COLOR_BROWN;
const K = COLOR_BLACK;
const L = COLOR_BROWN_LIGHT;

// prettier-ignore
const BLOCK_BITMAP: Bitmap = [
  [B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K],
  [L,B,L,L,L,L,L,L,L,L,L,L,L,L,K,K],
  [L,L,B,L,L,L,L,L,L,L,L,L,L,K,K,K],
  [L,L,L,B,L,L,L,L,L,L,L,L,K,K,K,K],
  [L,L,L,L,B,B,B,B,B,B,B,B,K,K,K,K],
  [L,L,L,L,B,B,B,B,B,B,B,B,K,K,K,K],
  [L,L,L,L,B,B,B,B,B,B,B,B,K,K,K,K],
  [L,L,L,L,B,B,B,B,B,B,B,B,K,K,K,K],
  [L,L,L,L,B,B,B,B,B,B,B,B,K,K,K,K],
  [L,L,L,L,B,B,B,B,B,B,B,B,K,K,K,K],
  [L,L,L,L,B,B,B,B,B,B,B,B,K,K,K,K],
  [L,L,L,L,B,B,B,B,B,B,B,B,K,K,K,K],
  [L,L,L,K,K,K,K,K,K,K,K,K,B,K,K,K],
  [L,L,K,K,K,K,K,K,K,K,K,K,K,B,K,K],
  [L,K,K,K,K,K,K,K,K,K,K,K,K,K,B,K],
  [K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,B],
];

const BLOCK = drawBitmap(BLOCK_BITMAP);

export class Block implements CollidableEntity {
  collidableSides = {
    bottom: false,
    left: true,
    right: true,
    top: true,
  };
  isVisible: boolean;
  length = {
    x: gridUnits(1),
    y: gridUnits(1),
    z: 1,
  };
  position;

  constructor(gridX: number, gridY: number, isVisible: boolean = true) {
    this.isVisible = isVisible;
    this.position = {
      x: gridUnits(gridX),
      y: gridUnits(gridY),
      z: 0,
    };
  }

  render(context: CanvasRenderingContext2D): void {
    if (this.isVisible) {
      context.drawImage(BLOCK, 0, 0, this.length.x, this.length.y);
    }
  }
}
