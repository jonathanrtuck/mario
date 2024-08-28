import { BUTTONS, SIDES } from "@/constants";

export type Acceleration = {
  x: number; // planck_units/s^2 (>= 0)
  y: number;
  z: number;
};

export type Bitmap = Color[][];

export type Button = (typeof BUTTONS)[number];

export interface CollidableEntity extends Entity {
  collidableSides: Record<Side, boolean>;
}

export type Color = `rgba(${number}, ${number}, ${number}, ${number})`;

export interface Entity {
  length: Length;
  position: Position;
  render(context: CanvasRenderingContext2D): void;
  update(buttons: Set<Button>): void;
}

export type Length = {
  x: number; // planck_units (>= 0)
  y: number;
  z: number;
};

export interface MovableEntity extends Entity {
  acceleration: Acceleration;
  deceleration: Acceleration;
  velocity: Velocity;
  vmax: Velocity;
}

export type Position = {
  x: number; // planck_units (>= 0)
  y: number;
  z: number;
};

export type Side = (typeof SIDES)[number];

export type Universe = {
  acceleration: Acceleration; // gravity
  color: Color;
  length: Length;
};

export type Velocity = {
  x: number; // planck_units/s (>= 0. - -> left, + -> right)
  y: number; // (- -> down, + -> up)
  z: number; // (- -> backward, + -> forward)
};

export type Viewport = {
  length: Length;
  position: Position;
};
