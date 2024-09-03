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
const PIPE_BITMAP: Bitmap = [
  [B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B],
  [B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B],
  [B,G,G,G,G,G,L,L,L,L,L,L,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,B],
  [B,L,L,L,G,G,L,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,G,L,G,L,G,L,L,B],
  [B,L,L,L,G,G,L,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,G,G,L,G,L,L,L,B],
  [B,L,L,L,G,G,L,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,G,L,G,L,G,L,L,B],
  [B,L,L,L,G,G,L,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,G,G,L,G,L,L,L,B],
  [B,L,L,L,G,G,L,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,G,L,G,L,G,L,L,B],
  [B,L,L,L,G,G,L,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,G,G,L,G,L,L,L,B],
  [B,L,L,L,G,G,L,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,G,L,G,L,G,L,L,B],
  [B,L,L,L,G,G,L,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,G,G,L,G,L,L,L,B],
  [B,L,L,L,G,G,L,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,G,L,G,L,G,L,L,B],
  [B,L,L,L,G,G,L,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,G,G,L,G,L,L,L,B],
  [B,L,L,L,G,G,L,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,G,L,G,L,G,L,L,B],
  [B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B],
  [T,T,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,T,T],
].concat(
  new Array(13 * (NUM_PIXELS_PER_GRID_UNIT / 2))
    .fill(undefined)
    .reduce((acc) => {
      acc.push([T,T,B,L,L,L,G,G,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,L,G,L,L,L,B,T,T]);
      acc.push([T,T,B,L,L,L,G,G,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,L,G,L,L,B,T,T]);

      return acc;
    }, [])
);

const PIPE = drawBitmap(PIPE_BITMAP);

export class Pipe implements CollidableEntity {
  collidableSides = {
    bottom: false,
    left: true,
    right: true,
    top: true,
  };
  length;
  position;

  constructor(gridX: number, gridY: number, gridHeight: number) {
    this.length = {
      x: gridUnits(2) - pixels(2 * 2),
      y: gridUnits(gridHeight),
      z: 1,
    };
    this.position = {
      x: gridUnits(gridX),
      y: gridUnits(gridY),
      z: 0,
    };
  }

  render(context: CanvasRenderingContext2D): void {
    context.drawImage(
      PIPE,
      0,
      0,
      this.length.x + pixels(2 * 2),
      this.length.y,
      pixels(-2),
      0,
      this.length.x + pixels(2 * 2),
      this.length.y
    );
  }
}
