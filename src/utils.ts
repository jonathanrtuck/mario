import { GRID_UNIT_LENGTH, PIXEL_LENGTH } from "@/constants";
import { Bitmap, CollidableEntity, Entity, MovableEntity } from "@/types";

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

export const isCollidable = (
  entity: Entity | CollidableEntity
): entity is CollidableEntity =>
  (entity as CollidableEntity).collidableSides !== undefined;

export const isMovable = (
  entity: Entity | MovableEntity
): entity is MovableEntity => (entity as MovableEntity).velocity !== undefined;

export const pixels = (num: number): number => int(num * PIXEL_LENGTH);
