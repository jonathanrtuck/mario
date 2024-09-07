import { COLOR_VALUES, GRID_UNIT_LENGTH, PIXEL_LENGTH } from "@/constants";
import { Bitmap, CollidableEntity } from "@/types";
import { drawBitmap, gridUnits, pixels } from "@/utils";

const NUM_PIXELS_PER_GRID_UNIT = GRID_UNIT_LENGTH / PIXEL_LENGTH;

const { BLACK: K, GREEN: G, GREEN_LIGHT: L, TRANSPARENT: T } = COLOR_VALUES;

// prettier-ignore
const FLAG_BITMAP: Bitmap = [
  [T,T,K,K,K,K,T,T],
  [T,K,L,G,G,G,K,T],
  [K,L,G,G,G,G,G,K],
  [K,L,G,G,G,G,G,K],
  [K,G,G,G,G,G,G,K],
  [K,G,G,G,G,G,G,K],
  [T,K,G,G,G,G,K,T],
  [T,T,K,K,K,K,T,T],
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
