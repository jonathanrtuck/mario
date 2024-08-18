import { GRID_DIMENSION } from "@/constants";
import { Color, Entity, Universe, Viewport } from "@/types";

let bushIndex = 0;
let cloudIndex = 0;
let hillIndex = 0;
let wallIndex = 0;

export const getBush = (
  gridX: number,
  gridY: number,
  type: "small" | "large"
): Entity => ({
  dimensions: {
    x: GRID_DIMENSION * (type === "large" ? 5 : 3),
    y: GRID_DIMENSION * 1,
    z: 0,
  },
  id: `bush-${bushIndex++}`,
  mass: 0,
  position: {
    x: GRID_DIMENSION * gridX,
    y: GRID_DIMENSION * gridY,
    z: -1,
  },
  type: "Bush",
});

export const getCloud = (
  gridX: number,
  gridY: number,
  type: "small" | "large"
): Entity => ({
  dimensions: {
    x: GRID_DIMENSION * (type === "large" ? 5 : 3),
    y: GRID_DIMENSION * 2,
    z: 0,
  },
  id: `cloud-${cloudIndex++}`,
  mass: 0,
  position: {
    x: GRID_DIMENSION * gridX,
    y: GRID_DIMENSION * gridY,
    z: -1,
  },
  type: "Cloud",
});

export const getHill = (
  gridX: number,
  gridY: number,
  type: "small" | "large"
): Entity => ({
  dimensions: {
    x: GRID_DIMENSION * (type === "large" ? 5 : 3),
    y: GRID_DIMENSION * (type === "large" ? 3 : 2),
    z: 0,
  },
  id: `hill-${hillIndex++}`,
  mass: 0,
  position: {
    x: GRID_DIMENSION * gridX,
    y: GRID_DIMENSION * gridY,
    z: -1,
  },
  type: "Hill",
});

export const getMario = (
  gridX: number,
  gridY: number,
  type: "small" | "large"
): Entity => ({
  acceleration: {
    x: 8,
    y: 15.3,
    z: 0,
  },
  deceleration: {
    x: 6,
    y: 0,
    z: 0,
  },
  dimensions: {
    x: GRID_DIMENSION * 1,
    y: GRID_DIMENSION * (type === "large" ? 2 : 1),
    z: 0,
  },
  friction: 0.5,
  id: "mario",
  mass: 70,
  position: {
    x: GRID_DIMENSION * gridX,
    y: GRID_DIMENSION * gridY,
    z: 0,
  },
  type: "Mario",
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
});

export const getUniverse = (
  gridWidth: number,
  gridHeight: number,
  color: Color
): Universe => ({
  acceleration: {
    x: 0,
    y: -9.8 * 4,
    z: 0,
  },
  color,
  dimensions: {
    x: GRID_DIMENSION * gridWidth,
    y: GRID_DIMENSION * gridHeight,
    z: 2,
  },
});

export const getViewport = (
  gridX: number,
  gridY: number,
  gridWidth: number,
  gridHeight: number
): Viewport => ({
  dimensions: {
    x: GRID_DIMENSION * gridWidth,
    y: GRID_DIMENSION * gridHeight,
    z: 3,
  },
  position: {
    x: GRID_DIMENSION * gridX,
    y: GRID_DIMENSION * gridY,
    z: 1,
  },
});

export const getWall = (
  gridX: number,
  gridY: number,
  gridWidth: number,
  gridHeight: number
): Entity => ({
  dimensions: {
    x: GRID_DIMENSION * gridWidth,
    y: GRID_DIMENSION * gridHeight,
    z: 0,
  },
  id: `wall-${wallIndex++}`,
  mass: 0,
  position: {
    x: GRID_DIMENSION * gridX,
    y: GRID_DIMENSION * gridY,
    z: 0,
  },
  type: "Wall",
});
