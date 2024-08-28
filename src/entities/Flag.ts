import {
  COLOR_BLACK,
  COLOR_GREEN,
  COLOR_GREEN_LIGHT,
  COLOR_TRANSPARENT,
  GRID_UNIT_LENGTH,
  PIXEL_LENGTH,
} from "@/constants";
import { Bitmap, CollidableEntity } from "@/types";
import { drawBitmap, gridUnits, pixels } from "@/utils";

const NUM_PIXELS_PER_GRID_UNIT = GRID_UNIT_LENGTH / PIXEL_LENGTH;

const B = COLOR_BLACK;
const G = COLOR_GREEN;
const L = COLOR_GREEN_LIGHT;
const T = COLOR_TRANSPARENT;

// prettier-ignore
const FLAG_BITMAP: Bitmap = [
  [T,T,B,B,B,B,T,T],
  [T,B,L,G,G,G,B,T],
  [B,L,G,G,G,G,G,B],
  [B,L,G,G,G,G,G,B],
  [B,G,G,G,G,G,G,B],
  [B,G,G,G,G,G,G,B],
  [T,B,G,G,G,G,B,T],
  [T,T,B,B,B,B,T,T],
].concat(new Array(13 * NUM_PIXELS_PER_GRID_UNIT).fill([T,T,T,L,L,T,T,T]));

const FLAG = drawBitmap(FLAG_BITMAP);

export class Flag implements CollidableEntity {
  collidableSides = {
    bottom: false,
    left: true,
    right: true,
    top: true,
  };
  length = {
    x: pixels(2),
    y: gridUnits(10),
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
    context.drawImage(
      FLAG,
      pixels(-3),
      0,
      this.length.x + pixels(3 * 2),
      this.length.y
    );
  }
}
