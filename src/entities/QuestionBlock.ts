import {
  COLOR_BLACK,
  COLOR_BROWN,
  COLOR_TRANSPARENT,
  COLOR_YELLOW_DARK,
} from "@/constants";
import { Bitmap, CollidableEntity } from "@/types";
import { drawBitmap, gridUnits } from "@/utils";

const B = COLOR_BROWN;
const K = COLOR_BLACK;
const T = COLOR_TRANSPARENT;
const Y = COLOR_YELLOW_DARK;

// prettier-ignore
const QUESTION_BLOCK_BITMAP: Bitmap = [
  [T,B,B,B,B,B,B,B,B,B,B,B,B,B,B,T],
  [B,Y,Y,Y,Y,Y,Y,Y,Y,Y,Y,Y,Y,Y,Y,K],
  [B,Y,K,Y,Y,Y,Y,Y,Y,Y,Y,Y,Y,K,Y,K],
  [B,Y,Y,Y,Y,B,B,B,B,B,Y,Y,Y,Y,Y,K],
  [B,Y,Y,Y,B,B,K,K,K,B,B,Y,Y,Y,Y,K],
  [B,Y,Y,Y,B,B,K,Y,Y,B,B,K,Y,Y,Y,K],
  [B,Y,Y,Y,B,B,K,Y,Y,B,B,K,Y,Y,Y,K],
  [B,Y,Y,Y,Y,K,K,Y,B,B,B,K,Y,Y,Y,K],
  [B,Y,Y,Y,Y,Y,Y,B,B,K,K,K,Y,Y,Y,K],
  [B,Y,Y,Y,Y,Y,Y,B,B,K,Y,Y,Y,Y,Y,K],
  [B,Y,Y,Y,Y,Y,Y,Y,K,K,Y,Y,Y,Y,Y,K],
  [B,Y,Y,Y,Y,Y,Y,B,B,Y,Y,Y,Y,Y,Y,K],
  [B,Y,Y,Y,Y,Y,Y,B,B,K,Y,Y,Y,Y,Y,K],
  [B,Y,K,Y,Y,Y,Y,Y,K,K,Y,Y,Y,K,Y,K],
  [B,Y,Y,Y,Y,Y,Y,Y,Y,Y,Y,Y,Y,Y,Y,K],
  [K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K],
];

const QUESTION_BLOCK = drawBitmap(QUESTION_BLOCK_BITMAP);

export class QuestionBlock implements CollidableEntity {
  isVisible: boolean;
  length = {
    x: gridUnits(1),
    y: gridUnits(1),
    z: 1,
  };
  position;

  get collidableSides() {
    if (!this.isVisible) {
      return {
        bottom: true,
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
      context.drawImage(QUESTION_BLOCK, 0, 0, this.length.x, this.length.y);
    }
  }
}
