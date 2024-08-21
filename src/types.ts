import { KEYS, PATTERNS } from "@/constants";

export type Acceleration = {
  x: number; // m/s^2 (>= 0)
  y: number;
  z: number;
};

export type Bitmap = Uint8ClampedArray[];

export type Color = Uint8ClampedArray;

export type ColorIndex = number;

export type ID = string;

export type Key = (typeof KEYS)[number];

export type Length = {
  x: number; // m (>= 0)
  y: number;
  z: number;
};

export type Pattern = (typeof PATTERNS)[number];

export type Pixels = number[][];

export type Position = {
  x: number; // m (>= 0)
  y: number;
  z: number;
};

export type Universe = {
  acceleration: Acceleration; // gravity
  color: ColorIndex;
  length: Length;
};

export type Velocity = {
  x: number; // m/s (>= 0. - -> left, + -> right)
  y: number; // (- -> down, + -> up)
  z: number; // (- -> backward, + -> forward)
};

export type Viewport = {
  length: Length;
  position: Position;
};
