import { CollidableEntity, Entity, MovableEntity } from "@/classes";
import { COLORS } from "@/constants";
import { ColorIndex, Length, Position } from "@/types";

export const clamp = (min: number, num: number, max: number): number =>
  num <= min ? min : num >= max ? max : num;

export const getIsCollision = (
  aPositions: Position,
  aLengths: Length,
  bPositions: Position,
  bLengths: Length
): boolean =>
  getIsCollisionByDimension(
    aPositions.x,
    aLengths.x,
    bPositions.x,
    bLengths.x
  ) &&
  getIsCollisionByDimension(
    aPositions.y,
    aLengths.y,
    bPositions.y,
    bLengths.y
  ) &&
  getIsCollisionByDimension(aPositions.z, aLengths.z, bPositions.z, bLengths.z);

// overlapping, not just touching
export const getIsCollisionByDimension = (
  aPosition: number,
  aLength: number,
  bPosition: number,
  bLength: number
): boolean =>
  !(
    isLessThan(bPosition + bLength, aPosition) ||
    isEqual(bPosition + bLength, aPosition) ||
    isGreaterThan(bPosition, aPosition + aLength) ||
    isEqual(bPosition, aPosition + aLength)
  );

export const getRGBA = (
  colorIndex: ColorIndex
): `rgba(${number},${number},${number},${number})` => {
  const [r, g, b, a] = COLORS[colorIndex];

  return `rgba(${r},${g},${b},${a})`;
};

export const isCollidable = (
  entity: Entity | CollidableEntity
): entity is CollidableEntity =>
  (entity as CollidableEntity).collidableSides !== undefined;

// @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON#testing_equality
export const isEqual = (x: number, y: number): boolean => {
  let magnitude = 1;

  if (x > 1 || y > 1) {
    magnitude = Math.round(Math.max(x, y));
  }

  return Math.abs(x - y) < Number.EPSILON * magnitude;
};

// x > y
export const isGreaterThan = (x: number, y: number): boolean => {
  let magnitude = 1; // @todo use magnitude when using Number.EPSILON in Game.ts… or better yet, don't use Number.EPSILON directly in that file, only use these/new utils

  if (x > 1 || y > 1) {
    magnitude = Math.round(Math.max(x, y));
  }

  return x - Number.EPSILON * magnitude > y;
};

// x < y
export const isLessThan = (x: number, y: number): boolean => {
  let magnitude = 1;

  if (x > 1 || y > 1) {
    magnitude = Math.round(Math.max(x, y));
  }

  return x - Number.EPSILON * magnitude < y;
};

export const isMovable = (
  entity: Entity | MovableEntity
): entity is MovableEntity => (entity as MovableEntity).velocity !== undefined;
