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

export const COLOR_BLACK: Color = "rgba(0, 0, 0, 255)";
export const COLOR_BLUE: Color = "rgba(155, 157, 248, 255)";
export const COLOR_BLUE_LIGHT: Color = "rgba(128, 184, 249, 255)";
export const COLOR_BROWN: Color = "rgba(154, 95, 32, 255)";
export const COLOR_BROWN_LIGHT: Color = "rgba(248, 211, 205, 255)";
export const COLOR_GREEN: Color = "rgba(75, 154, 44, 255)";
export const COLOR_GREEN_DARK: Color = "rgba(121, 121, 36, 255)";
export const COLOR_GREE_LIGHT: Color = "rgba(164, 216, 67, 255)";
export const COLOR_RED: Color = "rgba(231, 62, 37, 255)";
export const COLOR_TRANSPARENT: Color = "rgba(0, 0, 0, 0)";
export const COLOR_WHITE: Color = "rgba(255, 255, 255, 255)";
export const COLOR_YELLOW_DARK: Color = "rgba(227, 169, 76, 255)";

export const IS_DEBUG_MODE = process.env.NODE_ENV === "development";

export const PIXEL_LENGTH = 16;

export const GRID_UNIT_LENGTH = PIXEL_LENGTH * 16;

export const SIDES = ["bottom", "left", "right", "top"] as const;
