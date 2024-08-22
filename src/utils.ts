import { COLORS } from "@/constants";
import { ColorIndex, Length, Position } from "@/types";

export const clamp = (min: number, num: number, max: number): number =>
  num <= min ? min : num >= max ? max : num;

export const getIsCollision = (
  aPosition: Position,
  aLength: Length,
  bPosition: Position,
  bLength: Length
): boolean =>
  getIsCollisionByDimension(aPosition.x, aLength.x, bPosition.x, bLength.x) &&
  getIsCollisionByDimension(aPosition.y, aLength.y, bPosition.y, bLength.y) &&
  getIsCollisionByDimension(aPosition.z, aLength.z, bPosition.z, bLength.z);

export const getIsCollisionByDimension = (
  aPosition: number,
  aLength: number,
  bPosition: number,
  bLength: number
): boolean =>
  !(bPosition + bLength < aPosition || bPosition > aPosition + aLength);

export const getRGBA = (
  colorIndex: ColorIndex
): `rgba(${number},${number},${number},${number})` => {
  const [r, g, b, a] = COLORS[colorIndex];

  return `rgba(${r},${g},${b},${a})`;
};
