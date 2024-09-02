import { BUTTONS, SIDES } from "@/constants";

export type Acceleration = {
  x: number; // planckUnits/ms^2 (>= 0)
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
  update?(elapsedTime: MS, buttons: Set<Button>): void; // @todo collisions: Collision[]
}

export type Length = {
  x: number; // planckUnits (>= 0)
  y: number;
  z: number;
};

export interface MovableEntity extends Entity {
  acceleration: Acceleration;
  friction: number; // (>= 0)
  velocity: Velocity;
  vmax: Velocity;
}

export type MS = number; // milliseconds

export type Position = {
  x: number; // planckUnits (>= 0)
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
  x: number; // planckUnits/ms (>= 0. - -> left, + -> right)
  y: number; // (- -> down, + -> up)
  z: number; // (- -> backward, + -> forward)
};

export type Viewport = {
  length: Length;
  position: Position;
};
