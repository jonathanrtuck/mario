import { Entity, Key, State } from "@/types";

export const COLORS = [
  "black",
  "blue",
  "blue-light",
  "brown",
  "brown-light",
  "green",
  "green-dark",
  "green-light",
  "transparent",
  "white",
  "yellow-dark",
] as const;
export const ENTITY_TYPES = ["Protagonist"] as const;
export const FRAME_DURATION = 16; // ms
export const INITIAL_STATE: State = {
  entities: [
    new Entity({
      height: 1.75,
      id: "protagonist",
      mass: 75,
      type: "Protagonist",
      width: 1,
      x: 32 / 2,
      y: 8, // 15,
    }),
  ].toSorted((a, b) => a.zIndex - b.zIndex),
  gravity: {
    direction: 180,
    magnitude: 9.8,
  },
  index: 0,
  inputs: new Map([
    ["a", false],
    ["b", false],
    ["down", false],
    ["left", false],
    ["right", false],
    ["up", false],
  ]),
  minX: 0,
  minY: -3,
  viewport: {
    height: 18,
    width: 32,
  },
};
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
