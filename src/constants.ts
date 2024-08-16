import { Entity, Key, State, Velocity } from "@/types";

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
      velocity: new Velocity({
        maxHorizontal: 0.1664, // 10.4 m/s / fps
        maxVertical: 0.53333333, // 66.6666 m/s / 2 / fps
      }),
      width: 1,
      x: 32 / 2,
      y: 8, // 15,
    }),
  ].toSorted((a, b) => a.zIndex - b.zIndex),
  gravity: {
    horizontal: 0,
    vertical: 0.0784, // 9.8/2 m/s^2
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
