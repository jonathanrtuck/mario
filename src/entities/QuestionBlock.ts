import {
  COLOR_BLACK,
  COLOR_BROWN,
  COLOR_BROWN_DARK,
  COLOR_TRANSPARENT,
  COLOR_YELLOW_DARK,
  RENDERS_PER_TICK,
} from "@/constants";
import { Bitmap, CollidableEntity } from "@/types";
import { drawBitmap, gridUnits } from "@/utils";

const B = COLOR_BROWN;
const D = COLOR_BROWN_DARK;
const K = COLOR_BLACK;
const T = COLOR_TRANSPARENT;
const Y = COLOR_YELLOW_DARK;

// prettier-ignore
const QUESTION_BLOCK_DARK_BITMAP: Bitmap = [
  [T,B,B,B,B,B,B,B,B,B,B,B,B,B,B,T],
  [B,D,D,D,D,D,D,D,D,D,D,D,D,D,D,K],
  [B,D,K,D,D,D,D,D,D,D,D,D,D,K,D,K],
  [B,D,D,D,D,B,B,B,B,B,D,D,D,D,D,K],
  [B,D,D,D,B,B,K,K,K,B,B,D,D,D,D,K],
  [B,D,D,D,B,B,K,D,D,B,B,K,D,D,D,K],
  [B,D,D,D,B,B,K,D,D,B,B,K,D,D,D,K],
  [B,D,D,D,D,K,K,D,B,B,B,K,D,D,D,K],
  [B,D,D,D,D,D,D,B,B,K,K,K,D,D,D,K],
  [B,D,D,D,D,D,D,B,B,K,D,D,D,D,D,K],
  [B,D,D,D,D,D,D,D,K,K,D,D,D,D,D,K],
  [B,D,D,D,D,D,D,B,B,D,D,D,D,D,D,K],
  [B,D,D,D,D,D,D,B,B,K,D,D,D,D,D,K],
  [B,D,K,D,D,D,D,D,K,K,D,D,D,K,D,K],
  [B,D,D,D,D,D,D,D,D,D,D,D,D,D,D,K],
  [K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K],
];
// prettier-ignore
const QUESTION_BLOCK_LIGHT_BITMAP: Bitmap = [
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
// prettier-ignore
const QUESTION_BLOCK_MEDIUM_BITMAP: Bitmap = [
  [T,B,B,B,B,B,B,B,B,B,B,B,B,B,B,T],
  [B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,K],
  [B,B,K,B,B,B,B,B,B,B,B,B,B,K,B,K],
  [B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,K],
  [B,B,B,B,B,B,K,K,K,B,B,B,B,B,B,K],
  [B,B,B,B,B,B,K,B,B,B,B,K,B,B,B,K],
  [B,B,B,B,B,B,K,B,B,B,B,K,B,B,B,K],
  [B,B,B,B,B,K,K,B,B,B,B,K,B,B,B,K],
  [B,B,B,B,B,B,B,B,B,K,K,K,B,B,B,K],
  [B,B,B,B,B,B,B,B,B,K,B,B,B,B,B,K],
  [B,B,B,B,B,B,B,B,K,K,B,B,B,B,B,K],
  [B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,K],
  [B,B,B,B,B,B,B,B,B,K,B,B,B,B,B,K],
  [B,B,K,B,B,B,B,B,K,K,B,B,B,K,B,K],
  [B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,K],
  [K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K],
];

const QUESTION_BLOCK_DARK = drawBitmap(QUESTION_BLOCK_DARK_BITMAP);
const QUESTION_BLOCK_LIGHT = drawBitmap(QUESTION_BLOCK_LIGHT_BITMAP);
const QUESTION_BLOCK_MEDIUM = drawBitmap(QUESTION_BLOCK_MEDIUM_BITMAP);

export class QuestionBlock implements CollidableEntity {
  private numRenders: number; // resets each tick

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
    this.numRenders = 0;
    this.position = {
      x: gridUnits(gridX),
      y: gridUnits(gridY),
      z: 0,
    };
  }

  render(context: CanvasRenderingContext2D, time: number): void {
    this.numRenders++;

    if (time % 2 === 0) {
      this.numRenders = 0;
    }

    if (this.isVisible) {
      context.drawImage(
        time % 2 === 0
          ? QUESTION_BLOCK_LIGHT
          : this.numRenders < RENDERS_PER_TICK / 3 ||
            this.numRenders >= (RENDERS_PER_TICK / 3) * 2
          ? QUESTION_BLOCK_MEDIUM
          : QUESTION_BLOCK_DARK,
        0,
        0,
        this.length.x,
        this.length.y
      );
    }
  }
}
