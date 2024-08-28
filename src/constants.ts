import { Color } from "@/types";

export const BUTTONS = [
  "a",
  "b",
  "down",
  "left",
  "right",
  "start",
  "up",
] as const;

export const COLOR_BLACK: Color = new Uint8ClampedArray([0, 0, 0, 255]);
export const COLOR_BLUE: Color = new Uint8ClampedArray([155, 157, 248, 255]);
export const COLOR_BLUE_LIGHT: Color = new Uint8ClampedArray([
  128, 184, 249, 255,
]);
export const COLOR_BROWN: Color = new Uint8ClampedArray([154, 95, 32, 255]);
export const COLOR_BROWN_LIGHT: Color = new Uint8ClampedArray([
  248, 211, 205, 255,
]);
export const COLOR_GREEN: Color = new Uint8ClampedArray([75, 154, 44, 255]);
export const COLOR_GREEN_DARK: Color = new Uint8ClampedArray([
  121, 121, 36, 255,
]);
export const COLOR_GREE_LIGHT: Color = new Uint8ClampedArray([
  164, 216, 67, 255,
]);
export const COLOR_RED: Color = new Uint8ClampedArray([231, 62, 37, 255]);
export const COLOR_TRANSPARENT: Color = new Uint8ClampedArray([0, 0, 0, 0]);
export const COLOR_WHITE: Color = new Uint8ClampedArray([255, 255, 255, 255]);
export const COLOR_YELLOW_DARK: Color = new Uint8ClampedArray([
  227, 169, 76, 255,
]);

export const IS_DEBUG_MODE = process.env.NODE_ENV === "development";

export const PIXEL_LENGTH = 16;

export const GRID_UNIT_LENGTH = PIXEL_LENGTH * 16;

export const PIXEL_SCALE = 4;

export const SIDES = ["bottom", "left", "right", "top"] as const;
