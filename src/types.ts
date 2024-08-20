import { ENTITY_TYPES, KEYS, PATTERNS } from "@/constants";

export type Acceleration = {
  x: number; // m/s^2 (>= 0)
  y: number;
  z: number;
};

export type Bitmap = Uint8ClampedArray[];

export type Color = Uint8ClampedArray;

export type ColorIndex = number;

export type Dimensions = {
  x: number; // m (>= 0)
  y: number;
  z: number;
};

export type EntityType = (typeof ENTITY_TYPES)[number];

export type ID = string;

export type Key = (typeof KEYS)[number];

export type Pattern = (typeof PATTERNS)[number];

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
  color: ColorIndex;
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
