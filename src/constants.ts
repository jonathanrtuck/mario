import { Color, ColorValue, MS } from "@/types";

export const BUTTONS = [
  "a",
  "b",
  "down",
  "left",
  "right",
  "start",
  "up",
] as const;

export const COLORS = [
  "BLACK",
  "BLUE",
  "BLUE_LIGHT",
  "BROWN",
  "BROWN_DARK",
  "BROWN_LIGHT",
  "GREEN",
  "GREEN_DARK",
  "GREEN_LIGHT",
  "RED",
  "TRANSPARENT",
  "WHITE",
  "YELLOW_DARK",
] as const;

export const COLOR_VALUES: Record<Color, ColorValue> = {
  BLACK: "rgba(0, 0, 0, 255)",
  BLUE: "rgba(155, 157, 248, 255)",
  BLUE_LIGHT: "rgba(128, 184, 249, 255)",
  BROWN: "rgba(154, 95, 32, 255)",
  BROWN_DARK: "rgba(76, 36, 8, 255)",
  BROWN_LIGHT: "rgba(248, 211, 205, 255)",
  GREEN: "rgba(75, 154, 44, 255)",
  GREEN_DARK: "rgba(121, 121, 36, 255)",
  GREEN_LIGHT: "rgba(164, 216, 67, 255)",
  RED: "rgba(231, 62, 37, 255)",
  TRANSPARENT: "rgba(0, 0, 0, 0)",
  WHITE: "rgba(255, 255, 255, 255)",
  YELLOW_DARK: "rgba(227, 169, 76, 255)",
};

export const PIXEL_LENGTH = 16; // planckUnits

export const GRID_UNIT_LENGTH = PIXEL_LENGTH * 16; // planckUnits

export const SIDES = ["bottom", "left", "right", "top"] as const;

export const UPDATE_INTERVAL: MS = 1000 / 120; // 120hz

export const UPDATES_PER_RENDER = 2; // 60hz

export const UPDATES_PER_TICK = 48; // 400ms

export const RENDERS_PER_TICK = UPDATES_PER_TICK / UPDATES_PER_RENDER;
