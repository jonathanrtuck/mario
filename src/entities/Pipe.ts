import { COLOR_VALUES, GRID_UNIT_LENGTH, PIXEL_LENGTH } from "@/constants";
import { Bitmap, CollidableEntity } from "@/types";
import { drawBitmap, gridUnits, pixels } from "@/utils";

const NUM_PIXELS_PER_GRID_UNIT = GRID_UNIT_LENGTH / PIXEL_LENGTH;

const { BLACK: K, GREEN: G, GREEN_LIGHT: L, TRANSPARENT: T } = COLOR_VALUES;

// prettier-ignore
const PIPE_BITMAP: Bitmap = [
  [K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K],
  [K,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K],
  [K,G,G,G,G,G,L,L,L,L,L,L,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,K],
  [K,L,L,L,G,G,L,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,G,L,G,L,G,L,L,K],
  [K,L,L,L,G,G,L,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,G,G,L,G,L,L,L,K],
  [K,L,L,L,G,G,L,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,G,L,G,L,G,L,L,K],
  [K,L,L,L,G,G,L,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,G,G,L,G,L,L,L,K],
  [K,L,L,L,G,G,L,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,G,L,G,L,G,L,L,K],
  [K,L,L,L,G,G,L,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,G,G,L,G,L,L,L,K],
  [K,L,L,L,G,G,L,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,G,L,G,L,G,L,L,K],
  [K,L,L,L,G,G,L,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,G,G,L,G,L,L,L,K],
  [K,L,L,L,G,G,L,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,G,L,G,L,G,L,L,K],
  [K,L,L,L,G,G,L,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,G,G,L,G,L,L,L,K],
  [K,L,L,L,G,G,L,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,G,L,G,L,G,L,L,K],
  [K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K],
  [T,T,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,K,T,T],
].concat(
  new Array(13 * (NUM_PIXELS_PER_GRID_UNIT / 2))
    .fill(undefined)
    .reduce((acc) => {
      acc.push([T,T,K,L,L,L,G,G,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,L,G,L,L,L,K,T,T]);
      acc.push([T,T,K,L,L,L,G,G,L,L,L,L,L,G,L,L,G,G,G,G,G,G,G,G,G,L,G,L,L,K,T,T]);

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
