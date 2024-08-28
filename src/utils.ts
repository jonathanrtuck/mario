import { GRID_UNIT_LENGTH, PIXEL_LENGTH } from "@/constants";
import { Bitmap } from "@/types";

export const clamp = (min: number, num: number, max: number): number =>
  num <= min ? min : num >= max ? max : num;

export const drawBitmap = (bitmap: Bitmap): OffscreenCanvas => {
  const offscreenCanvas = new OffscreenCanvas(
    pixels(bitmap[0].length),
    pixels(bitmap.length)
  );
  const offscreenCanvasContext = offscreenCanvas.getContext("2d")!;

  for (let i = 0; i !== bitmap.length; i++) {
    const row = bitmap[i];

    for (let j = 0; j !== row.length; j++) {
      offscreenCanvasContext.fillStyle = row[j];
      offscreenCanvasContext.fillRect(
        pixels(j),
        pixels(i),
        pixels(1),
        pixels(1)
      );
    }
  }

  return offscreenCanvas;
};

export const gridUnits = (num: number): number => int(num * GRID_UNIT_LENGTH);

export const int = (num: number): number => Math.trunc(num);

export const pixels = (num: number): number => int(num * PIXEL_LENGTH);
