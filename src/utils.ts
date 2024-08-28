import { CollidableEntity, Color, Entity, MovableEntity } from "@/types";

export const clamp = (min: number, num: number, max: number): number =>
  num <= min ? min : num >= max ? max : num;

export const getRGBA = ([
  r,
  g,
  b,
  a,
]: Color): `rgba(${number},${number},${number},${number})` =>
  `rgba(${r},${g},${b},${a})`;

export const isCollidable = (
  entity: Entity | CollidableEntity
): entity is CollidableEntity =>
  (entity as CollidableEntity).collidableSides !== undefined;

export const isMovable = (
  entity: Entity | MovableEntity
): entity is MovableEntity => (entity as MovableEntity).velocity !== undefined;
