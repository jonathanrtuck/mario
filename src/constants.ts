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
    getCloud(19, 13, "small"),
    getCloud(27, 12, "large"),
    getCloud(36, 13, "medium"),
    getCloud(56, 12, "small"),
    getCloud(67, 13, "small"),
    getCloud(75, 12, "large"),
    getCloud(84, 13, "medium"),
    getCloud(104, 12, "small"),
    getCloud(115, 13, "small"),
    getCloud(123, 12, "large"),
    getCloud(132, 13, "medium"),
    getCloud(152, 12, "small"),
    getCloud(163, 13, "small"),
    getCloud(171, 12, "large"),
    getCloud(180, 13, "medium"),
    getCloud(200, 12, "small"),
    getCloud(211, 13, "small"),
    getCloud(219, 12, "large"),
    getHill(0, 4, "large"),
    getHill(16, 4, "small"),
    getBush(11, 4, "large"),
    getBush(23, 4, "small"),
    getWall(0, 0, 69, 4),
    getWall(71, 0, 15, 4),
    getWall(89, 0, 64, 4),
    getWall(155, 0, 69, 4),
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
