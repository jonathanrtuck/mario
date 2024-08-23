import { Color, Key } from "@/types";

export const COLORS: Color[] = [
  new Uint8ClampedArray([0, 0, 0, 0]), //          0 - Transparent
  new Uint8ClampedArray([0, 0, 0, 255]), //        1 - Black
  new Uint8ClampedArray([255, 255, 255, 255]), //  2 - White
  new Uint8ClampedArray([154, 95, 32, 255]), //    3 - Brown
  new Uint8ClampedArray([248, 211, 205, 255]), //  4 - BrownLight
  new Uint8ClampedArray([155, 157, 248, 255]), //  5 - Blue
  new Uint8ClampedArray([128, 184, 249, 255]), //  6 - BlueLight
  new Uint8ClampedArray([75, 154, 44, 255]), //    7 - Green
  new Uint8ClampedArray([121, 121, 36, 255]), //   8 - GreenDark
  new Uint8ClampedArray([164, 216, 67, 255]), //   9 - GreenLight
  new Uint8ClampedArray([227, 169, 76, 255]), //  10 - YellowDark
  new Uint8ClampedArray([231, 62, 37, 255]), //   11 - Red
] as const;

export const GRID_UNIT_LENGTH = 0.775; // m

export const IS_DEBUG_MODE = process.env.NODE_ENV === "development";

export const KEY_BINDING: Record<Key, Set<string>> = {
  a: new Set(["z"]), // run
  b: new Set(["x"]), // jump
  down: new Set(["ArrowDown"]),
  left: new Set(["ArrowLeft"]),
  right: new Set(["ArrowRight"]),
  up: new Set(["ArrowUp"]), // nothing
};

export const KEYS = ["a", "b", "down", "left", "right", "up"] as const;

export const PATTERNS = [
  "Block",
  "Brick",
  "BushLarge",
  "BushMedium",
  "BushSmall",
  "CloudLarge",
  "CloudMedium",
  "CloudSmall",
  "Flag",
  "HillLarge",
  "HillSmall",
  "MarioSmallStandingRight",
  "Pipe",
  "QuestionBlock",
  "Wall",
] as const;

export const PIXEL_LENGTH = GRID_UNIT_LENGTH / 16;

export const PIXEL_SCALE = 4;

export const SIDES = ["bottom", "left", "right", "top"] as const;
