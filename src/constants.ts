import {
  getBush,
  getCloud,
  getHill,
  getMario,
  getUniverse,
  getViewport,
  getWall,
} from "@/helpers";
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
  "red",
  "white",
  "yellow-dark",
] as const;
export const ENTITY_TYPES = ["Bush", "Cloud", "Hill", "Mario", "Wall"] as const;
export const GRID_DIMENSION = 0.775; // m
export const INITIAL_STATE: State = {
  // @see https://nesmaps.com/maps/SuperMarioBrothers/SuperMarioBrosWorld1-1Map.html
  entities: Array.from<Entity>([
    getCloud(9, 12, "small"),
    getHill(0, 4, "large"),
    getHill(16, 4, "small"),
    getBush(11, 4, "large"),
    getBush(23, 4, "small"),
    getWall(0, 0, 69, 4),
    getMario(2, 4, "small"),
  ]).toSorted((a, b) => a.dimensions.z - b.dimensions.z),
  inputs: new Map([
    ["a", false],
    ["b", false],
    ["down", false],
    ["left", false],
    ["right", false],
    ["up", false],
  ]),
  universe: getUniverse(210, 15, "blue"),
  viewport: getViewport(0, 1.66666, 16, 15.33333),
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
