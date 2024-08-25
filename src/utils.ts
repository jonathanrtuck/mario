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
  !(bPosition + bLength <= aPosition || bPosition >= aPosition + aLength);

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

export const isMovable = (
  entity: Entity | MovableEntity
): entity is MovableEntity => (entity as MovableEntity).velocity !== undefined;
