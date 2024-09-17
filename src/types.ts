import { BUTTONS, SIDES } from "@/constants";

export type Acceleration = {
  x: number;
  y: number;
};

export type Bitmap = Color[][];

export type Button = (typeof BUTTONS)[number];

export interface CollidableEntity extends Entity {
  collidableSides: Record<Side, boolean>;
  collide?(entity: CollidableEntity, side: Side): void;
}

export type Color = number;

export interface Entity {
  length: Length;
  position: Position;
  render(context: CanvasRenderingContext2D): void;
  update?(frame: number, buttons: Set<Button>): void;
}

export type Length = {
  x: number;
  y: number;
};

export interface MovableEntity extends Entity {
  acceleration: Acceleration;
  mass: number;
  velocity: Velocity;
}

export type MS = number;

export type Position = {
  x: number;
  y: number;
  z: number;
};

export type Side = (typeof SIDES)[number];

export type Velocity = {
  x: number;
  y: number;
};
