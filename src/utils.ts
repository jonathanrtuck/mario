import {
  COLORS,
  FRAME_INTERVAL,
  GRID_UNIT_LENGTH,
  PIXEL_LENGTH,
} from "@/constants";
import {
  Bitmap,
  CollidableEntity,
  Collision,
  Entity,
  MovableEntity,
  Position,
  Side,
} from "@/types";

export const clamp = (num: number, min: number, max: number): number =>
  num <= min ? min : num >= max ? max : num;

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

export const getCollision = (
  movableEntity: MovableEntity,
  movableEntityProjectedPosition: Position,
  collidableEntity: CollidableEntity,
  collidableEntityProjectedPosition: Position
): Collision | null => {
  if (
    !isCollidable(movableEntity) ||
    movableEntity.position.z !== collidableEntity.position.z ||
    movableEntityProjectedPosition.x + movableEntity.length.x <=
      collidableEntityProjectedPosition.x ||
    movableEntityProjectedPosition.x >=
      collidableEntityProjectedPosition.x + collidableEntity.length.x ||
    movableEntityProjectedPosition.y + movableEntity.length.y <=
      collidableEntityProjectedPosition.y ||
    movableEntityProjectedPosition.y >=
      collidableEntityProjectedPosition.y + collidableEntity.length.y
  ) {
    return null;
  }

  const sides = new Set<Side>();
  let earliestTime = FRAME_INTERVAL;

  // bottom
  if (
    movableEntity.collidableSides.bottom &&
    collidableEntity.collidableSides.top &&
    movableEntity.position.y >=
      collidableEntity.position.y + collidableEntity.length.y &&
    movableEntityProjectedPosition.y <
      collidableEntityProjectedPosition.y + collidableEntity.length.y
  ) {
    const prevLengthBetween =
      movableEntity.position.y -
      (collidableEntity.position.y + collidableEntity.length.y);
    const totalLengthDelta =
      movableEntity.position.y - movableEntityProjectedPosition.y;
    const time = totalLengthDelta
      ? (prevLengthBetween / totalLengthDelta) * FRAME_INTERVAL
      : 0;

    if (time < earliestTime) {
      earliestTime = time;
      sides.clear();
      sides.add("bottom");
    } else if (time === earliestTime) {
      sides.add("bottom");
    }
  }
  // left
  if (
    movableEntity.collidableSides.left &&
    collidableEntity.collidableSides.right &&
    movableEntity.position.x >=
      collidableEntity.position.x + collidableEntity.length.x &&
    movableEntityProjectedPosition.x <
      collidableEntityProjectedPosition.x + collidableEntity.length.x
  ) {
    const prevLengthBetween =
      movableEntity.position.x -
      (collidableEntity.position.x + collidableEntity.length.x);
    const totalLengthDelta =
      movableEntity.position.x - movableEntityProjectedPosition.x;
    const time = totalLengthDelta
      ? (prevLengthBetween / totalLengthDelta) * FRAME_INTERVAL
      : 0;

    if (time < earliestTime) {
      earliestTime = time;
      sides.clear();
      sides.add("left");
    } else if (time === earliestTime) {
      sides.add("left");
    }
  }
  // right
  if (
    movableEntity.collidableSides.right &&
    collidableEntity.collidableSides.left &&
    movableEntity.position.x + movableEntity.length.x <=
      collidableEntity.position.x &&
    movableEntityProjectedPosition.x + movableEntity.length.x >
      collidableEntityProjectedPosition.x
  ) {
    const prevLengthBetween =
      movableEntity.position.x +
      movableEntity.length.x -
      collidableEntity.position.x;
    const totalLengthDelta =
      movableEntity.position.x - movableEntityProjectedPosition.x;
    const time = totalLengthDelta
      ? (prevLengthBetween / totalLengthDelta) * FRAME_INTERVAL
      : 0;

    if (time < earliestTime) {
      earliestTime = time;
      sides.clear();
      sides.add("right");
    } else if (time === earliestTime) {
      sides.add("right");
    }
  }
  // top
  if (
    movableEntity.collidableSides.top &&
    collidableEntity.collidableSides.bottom &&
    movableEntity.position.y + movableEntity.length.y <=
      collidableEntity.position.y &&
    movableEntityProjectedPosition.y + movableEntity.length.y >
      collidableEntityProjectedPosition.y
  ) {
    const prevLengthBetween =
      movableEntity.position.y +
      movableEntity.length.y -
      collidableEntity.position.y;
    const totalLengthDelta =
      movableEntity.position.y - movableEntityProjectedPosition.y;
    const time = totalLengthDelta
      ? (prevLengthBetween / totalLengthDelta) * FRAME_INTERVAL
      : 0;

    if (time < earliestTime) {
      earliestTime = time;
      sides.clear();
      sides.add("top");
    } else if (time === earliestTime) {
      sides.add("top");
    }
  }

  if (!sides.size) {
    return null;
  }

  return {
    entity: collidableEntity,
    sides,
    time: earliestTime,
  };
};

export const gridUnits = (num: number): number =>
  Math.trunc(num * GRID_UNIT_LENGTH);

export const gridUnitsPerSecond = (num: number): number =>
  gridUnits(num) / 1000;

export const gridUnitsPerSecondPerSecond = (num: number): number =>
  gridUnits(num) / 1000 / 1000;

export const isCollidable = (entity: Entity): entity is CollidableEntity =>
  (entity as CollidableEntity).collidableSides !== undefined;

export const isMovable = (entity: Entity): entity is MovableEntity =>
  (entity as MovableEntity).velocity !== undefined;

export const opposite = (side: Side): Side => {
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
