import { COLORS } from "@/constants";
import { ColorIndex } from "@/types";

export const clamp = (min: number, num: number, max: number): number =>
  num <= min ? min : num >= max ? max : num;

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
