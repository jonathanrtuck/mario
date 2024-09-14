import { COLORS, GRID_UNIT_LENGTH, PIXEL_LENGTH } from "@/constants";
import {
  Bitmap,
  CollidableEntity,
  ControllableEntity,
  Entity,
  MovableEntity,
  Side,
} from "@/types";

export const drawBitmap = (bitmap: Bitmap): OffscreenCanvas => {
  const numRows = bitmap.length;
  const numCols = bitmap[0]?.length ?? 0;
  const offscreenCanvas = new OffscreenCanvas(pixels(numCols), pixels(numRows));
  const offscreenCanvasContext = offscreenCanvas.getContext("2d")!;

  for (let y = 0; y !== numRows; y++) {
    const row = bitmap[y];

    for (let x = 0; x !== numCols; x++) {
      offscreenCanvasContext.fillStyle = COLORS[row[x]];
      offscreenCanvasContext.fillRect(
        pixels(x),
        pixels(y),
        pixels(1),
        pixels(1)
      );
    }
  }

  return offscreenCanvas;
};

export const flip = (bitmap: Bitmap): Bitmap =>
  bitmap.map((row) => row.toReversed());

export const gridUnits = (num: number): number =>
  Math.trunc(num * GRID_UNIT_LENGTH);

export const isCollidable = (entity: Entity): entity is CollidableEntity =>
  (entity as CollidableEntity).collidableSides !== undefined;

export const isControllable = (entity: Entity): entity is ControllableEntity =>
  (entity as ControllableEntity).press !== undefined ||
  (entity as ControllableEntity).release !== undefined;

export const isOverlapByDimension = (
  aPosition: number,
  aLength: number,
  bPosition: number,
  bLength: number
): boolean =>
  !(aPosition + aLength <= bPosition || aPosition >= bPosition + bLength);

export const isMovable = (entity: Entity): entity is MovableEntity =>
  (entity as MovableEntity).velocity !== undefined;

export const oppositeSide = (side: Side): Side => {
  switch (side) {
    case "bottom":
      return "top";
    case "left":
      return "right";
    case "right":
      return "left";
    case "top":
      return "bottom";
  }
};

export const pixels = (num: number): number => Math.trunc(num * PIXEL_LENGTH);
