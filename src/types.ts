import { ComponentType } from "react";

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

export type Entity = {
  dimensions: Dimensions;
  friction?: number; // 0–1 (coefficient)
  id: ID;
  mass: number; // kg (>= 0. `Infinity` for unmovable)
  position: Position;
  type: EntityType;
} & (
  | {
      acceleration: Acceleration;
      deceleration: Acceleration;
      velocity: Velocity;
      vmax: Velocity;
    }
  | {}
);

export type EntityComponent = ComponentType<Omit<Entity, "type">>;

export type EntityType = (typeof ENTITY_TYPES)[number];

export type ID = string;

export type Key = (typeof KEYS)[number];

export type Position = {
  x: number; // m (>= 0)
  y: number;
  z: number;
};

export type State = {
  entities: Entity[];
  inputs: Map<Key, boolean>;
  universe: Universe;
  viewport: Viewport;
};

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
