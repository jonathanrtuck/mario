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
export const GRID_DIMENSION = 0.775; // m
export const INITIAL_STATE: State = {
  entities: Array.from<Entity>([
    {
      acceleration: {
        x: 8,
        y: 15.2,
        z: 0,
      },
      deceleration: {
        x: 6,
        y: 0,
        z: 0,
      },
      dimensions: {
        x: GRID_DIMENSION * 1,
        y: GRID_DIMENSION * 1, // GRID_DIMENSION * 2 when big
        z: 0,
      },
      friction: 0.5,
      id: "protagonist",
      mass: 70,
      position: {
        x: GRID_DIMENSION * 2,
        y: GRID_DIMENSION * 4,
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
      y: -9.8 * 4,
      z: 0,
    },
    color: "blue",
    dimensions: {
      x: GRID_DIMENSION * 16 * 10,
      y: GRID_DIMENSION * 15,
      z: 2,
    },
  },
  viewport: {
    dimensions: {
      x: GRID_DIMENSION * 16,
      y: GRID_DIMENSION * 15.33333,
    },
    position: {
      x: 0,
      y: 0, //  GRID_DIMENSION * 1.66666,
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
export const PIXEL_DIMENSION = GRID_DIMENSION / 16;
