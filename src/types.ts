import { COLORS, ENTITY_TYPES, KEYS } from "@/constants";

export type Acceleration = {
  x: number; // m/s^2 (>= 0)
  y: number;
  z: number;
};

export type Color = (typeof COLORS)[number];

export type Dimensions = {
  x: number; // m (>= 0)
  y: number;
  z: number;
};

export type EntityType = (typeof ENTITY_TYPES)[number];

export type ID = string;

export type Key = (typeof KEYS)[number];

export type Pixels = number[][];

export type Position = {
  x: number; // m (>= 0)
  y: number;
  z: number;
};

/*
export type State = {
  entities: Entity[];
  inputs: Map<Key, boolean>;
  universe: Universe;
  viewport: Viewport;
};
*/

export type Universe = {
  acceleration: Acceleration; // gravity
  color: Color;
  dimensions: Dimensions;
};

export type Velocity = {
  x: number; // m/s (>= 0. - -> left, + -> right)
  y: number; // (- -> down, + -> up)
  z: number; // (- -> backward, + -> forward)
};

export type Viewport = {
  dimensions: Dimensions;
  position: Position;
};
