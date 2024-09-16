import { MS } from "@/types";

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
  "rgba(0, 0, 0, 0)", //         0x0 transparent
  "rgba(0, 0, 0, 255)", //       0x1 black
  "rgba(255, 255, 255, 255)", // 0x2 white
  "rgba(128, 184, 249, 255)", // 0x3 blue light
  "rgba(155, 157, 248, 255)", // 0x4 blue
  "rgba(164, 216, 67, 255)", //  0x5 green light
  "rgba(75, 154, 44, 255)", //   0x6 green
  "rgba(121, 121, 36, 255)", //  0x7 green dark
  "rgba(227, 169, 76, 255)", //  0x8 yellow dark
  "rgba(248, 211, 205, 255)", // 0x9 brown light
  "rgba(154, 95, 32, 255)", //   0xA brown
  "rgba(76, 36, 8, 255)", //     0xB brown dark
  "rgba(231, 62, 37, 255)", //   0xC red
] as const;
export const PIXEL_LENGTH = 16;
export const GRID_UNIT_LENGTH = PIXEL_LENGTH * 16;
export const SIDES = ["bottom", "left", "right", "top"] as const;
export const TICK_INTERVAL: MS = 400;
export const UPDATE_INTERVAL: MS = 10;
export const UPDATES_PER_TICK = TICK_INTERVAL / UPDATE_INTERVAL;
