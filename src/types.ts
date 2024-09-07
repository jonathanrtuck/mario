import { BUTTONS, COLORS, SIDES } from "@/constants";

export type Acceleration = {
  x: number; // planckUnits/ms^2 (>= 0)
  y: number;
  z: number;
};

export type Bitmap = ColorValue[][];

export type Button = (typeof BUTTONS)[number];

export interface CollidableEntity extends Entity {
  collidableSides: Record<Side, boolean>;
  collide?(side: Side, collidableEntity: CollidableEntity): void;
}

export type Color = (typeof COLORS)[number];

export type ColorValue = `rgba(${number}, ${number}, ${number}, ${number})`;

export interface Entity {
  length: Length;
  position: Position;
  render(context: CanvasRenderingContext2D, time: number): void;
  update?(buttons: Set<Button>, neighbors: Neighbors): void;
}

export type Length = {
  x: number; // planckUnits (>= 0)
  y: number;
  z: number;
};

export interface MovableEntity extends Entity {
  acceleration: Acceleration;
  elasticity: number; // (>= 0)
  friction: number; // (>= 0)
  velocity: Velocity;
  vmax: Velocity;
  vmin: Velocity;
}

export type MS = number; // milliseconds

export type Neighbors = Record<Side, CollidableEntity[]>;

export type Position = {
  x: number; // planckUnits (>= 0)
  y: number;
  z: number;
};

export type Side = (typeof SIDES)[number];

export type Universe = {
  acceleration: Acceleration; // gravity
  color: ColorValue;
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
