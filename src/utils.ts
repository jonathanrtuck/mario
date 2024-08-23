import { CollidableEntity, Entity, MovableEntity } from "@/classes";
import { COLORS } from "@/constants";
import { ColorIndex, Length, Viewport } from "@/types";

const getIsCollisionByDimension = (
  aPosition: number,
  aLength: number,
  bPosition: number,
  bLength: number
): boolean =>
  !(bPosition + bLength < aPosition || bPosition > aPosition + aLength);

export const clamp = (min: number, num: number, max: number): number =>
  num <= min ? min : num >= max ? max : num;

export const getIsCollision = (
  a: CollidableEntity,
  b: CollidableEntity
): boolean =>
  getIsCollisionByDimension(
    a.position.x + a.collidableOffset.x,
    a.length.x - a.collidableOffset.x * 2,
    b.position.x + b.collidableOffset.x,
    b.length.x - b.collidableOffset.x * 2
  ) &&
  getIsCollisionByDimension(
    a.position.y + a.collidableOffset.y,
    a.length.y - a.collidableOffset.y * 2,
    b.position.y + b.collidableOffset.y,
    b.length.y - b.collidableOffset.y * 2
  ) &&
  getIsCollisionByDimension(
    a.position.z + a.collidableOffset.z,
    a.length.z - a.collidableOffset.z * 2,
    b.position.z + b.collidableOffset.z,
    b.length.z - b.collidableOffset.z * 2
  );

export const getIsWithinViewport =
  (
    viewport: Viewport,
    padding: Length = {
      x: 0,
      y: 0,
      z: 0,
    }
  ) =>
  (entity: Entity): boolean =>
    getIsCollisionByDimension(
      entity.position.x,
      entity.length.x,
      viewport.position.x - padding.x,
      viewport.length.x + padding.x * 2
    ) &&
    getIsCollisionByDimension(
      entity.position.y,
      entity.length.y,
      viewport.position.y - padding.y,
      viewport.length.y + padding.y * 2
    ) &&
    getIsCollisionByDimension(
      entity.position.z,
      entity.length.z,
      viewport.position.z - padding.z,
      viewport.length.z + padding.z * 2
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

export const isMovable = (
  entity: Entity | MovableEntity
): entity is MovableEntity => (entity as MovableEntity).velocity !== undefined;
