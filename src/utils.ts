import { GRID_UNIT_LENGTH, PIXEL_LENGTH } from "@/constants";
import { Bitmap, CollidableEntity, Entity, MovableEntity } from "@/types";

export const clamp = (min: number, num: number, max: number): number =>
  num <= min ? min : num >= max ? max : num;

export const drawBitmap = (bitmap: Bitmap): OffscreenCanvas => {
  const numRows = bitmap.length;
  const numCols = bitmap[0]?.length ?? 0;
  const offscreenCanvas = new OffscreenCanvas(pixels(numCols), pixels(numRows));
  const offscreenCanvasContext = offscreenCanvas.getContext("2d")!;
  const pixelLength = pixels(1);

  for (let y = 0; y !== numRows; y++) {
    const row = bitmap[y];

    for (let x = 0; x !== numCols; x++) {
      offscreenCanvasContext.fillStyle = row[x];
      offscreenCanvasContext.fillRect(
        pixels(x),
        pixels(y),
        pixelLength,
        pixelLength
      );
    }
  }

  return offscreenCanvas;
};

export const gridUnits = (num: number): number => int(num * GRID_UNIT_LENGTH);

export const gridUnitsPerSecond = (num: number): number =>
  gridUnits(num) / 1000; // planckUnits/ms

export const gridUnitsPerSecondPerSecond = (num: number): number =>
  gridUnits(num) / 1000 / 1000; // planckUnits/ms^2

export const int = (num: number): number => Math.trunc(num);

export const isCollidable = (entity: Entity): entity is CollidableEntity =>
  (entity as CollidableEntity).collidableSides !== undefined;

export const isOverlapByDimension = (
  aPosition: number,
  aLength: number,
  bPosition: number,
  bLength: number
): boolean =>
  !(aPosition + aLength <= bPosition || aPosition >= bPosition + bLength);

export const isMovable = (entity: Entity): entity is MovableEntity =>
  (entity as MovableEntity).velocity !== undefined;

export const pixels = (num: number): number => int(num * PIXEL_LENGTH);
