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

export interface ControllableEntity extends Entity {
  press?(button: Button, buttons: Set<Button>): void;
  release?(button: Button, buttons: Set<Button>): void;
}

export interface Entity {
  length: Length;
  position: Position;
  render(context: CanvasRenderingContext2D, now: MS): void;
}

export type Length = {
  x: number;
  y: number;
};

export interface MovableEntity extends Entity {
  acceleration: Acceleration;
  friction: number;
  mass: number;
  velocity: Velocity;
  vmax: Velocity;
}

export type MS = number;

export type Neighbors = Record<Side, CollidableEntity[]>;

export type Position = {
  x: number;
  y: number;
  z: number;
};

export type Side = (typeof SIDES)[number];

export type State = {
  entities: Entity[];
  universe: Universe;
  viewport: Viewport;
};

export type Universe = {
  acceleration: Acceleration;
  color: Color;
  length: Length;
};

export type Velocity = {
  x: number;
  y: number;
};

export type Viewport = {
  length: Length;
  position: Omit<Position, "z">;
};
