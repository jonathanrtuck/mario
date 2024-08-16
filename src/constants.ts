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
export const FPS = 60;
export const INITIAL_STATE: State = {
  entities: Array.from<Entity>([
    {
      acceleration: {
        x: 3,
        y: 3.3333,
        z: 0,
      },
      deceleration: {
        x: 6,
        y: 0,
        z: 0,
      },
      dimensions: {
        x: 0.1,
        y: 0.175,
        z: 0,
      },
      friction: 0.5,
      id: "protagonist",
      mass: 1.5,
      position: {
        x: 0.4,
        y: 0.3,
        z: 0,
      },
      type: "Protagonist",
      velocity: {
        x: 0,
        y: 0,
        z: 0,
      },
      vmax: {
        x: 3.6,
        y: 19.6,
        z: 0,
      },
    },
  ]).toSorted((a, b) => a.dimensions.z - b.dimensions.z),
  inputs: new Map([
    ["a", false],
    ["b", false],
    ["down", false],
    ["left", false],
    ["right", false],
    ["up", false],
  ]),
  universe: {
    acceleration: {
      x: 0,
      y: -12,
      z: 0,
    },
    dimensions: {
      x: 96,
      y: 3.6,
      z: 2,
    },
  },
  viewport: {
    dimensions: {
      x: 3.2,
      y: 1.8,
    },
    position: {
      x: 0,
      y: 0,
    },
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
