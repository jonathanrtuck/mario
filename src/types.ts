import { ComponentType } from "react";

import { COLORS, ENTITY_TYPES, KEYS } from "@/constants";

export class Acceleration {
  horizontal: number; // m/[frame duration]^2
  vertical: number; // m/[frame duration]^2

  constructor({ horizontal = 0, vertical = 0 }: Partial<Acceleration>) {
    this.horizontal = horizontal;
    this.vertical = vertical;
  }
}

export type Color = (typeof COLORS)[number];

export class Dimensions {
  height: number; // m
  width: number; // m

  constructor({ height = 0, width = 0 }: Partial<Dimensions>) {
    this.height = height;
    this.width = width;
  }
}

export class Entity {
  // elasticity: number;
  height: number; // m
  id: ID;
  mass: number; // kg
  type: EntityType;
  velocity: Velocity;
  width: number; // m
  x: number; // middle of entity
  y: number; // bottom of entity
  zIndex: number;

  constructor({
    height,
    id = "0",
    mass = Infinity,
    type,
    velocity,
    width,
    x,
    y,
    zIndex = 1,
  }: Partial<Entity> & Pick<Entity, "height" | "type" | "width" | "x" | "y">) {
    this.height = height;
    this.id = id;
    this.mass = mass;
    this.type = type;
    this.velocity = velocity ?? new Velocity({});
    this.width = width;
    this.x = x;
    this.y = y;
    this.zIndex = zIndex;
  }
}

export type EntityComponent = ComponentType<Entity>;

export type EntityType = (typeof ENTITY_TYPES)[number];

export type ID = string;

export type Key = (typeof KEYS)[number];

export type State = {
  entities: Entity[];
  gravity: Acceleration;
  index: number;
  inputs: Map<Key, boolean>;
  minX: number;
  minY: number;
  viewport: Dimensions;
};

export class Velocity {
  horizontal: number; // m/[frame duration]
  maxHorizontal: number; // m/[frame duration]
  maxVertical: number; // m/[frame duration]
  vertical: number; // m/[frame duration]

  constructor({
    horizontal = 0,
    maxHorizontal = 0,
    maxVertical = 0,
    vertical = 0,
  }: Partial<Velocity>) {
    this.horizontal = horizontal;
    this.maxHorizontal = maxHorizontal;
    this.maxVertical = maxVertical;
    this.vertical = vertical;
  }
}
