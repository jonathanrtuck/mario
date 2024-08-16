import { ComponentType } from "react";

import { COLORS, ENTITY_TYPES, KEYS } from "@/constants";

export type Color = (typeof COLORS)[number];

export type Entity = {
  acceleration: {
    x: number; // m/s^2 (>= 0)
    y: number;
    z: number;
  };
  deceleration: {
    x: number; // m/s^2 (>= 0)
    y: number;
    z: number;
  };
  dimensions: {
    x: number; // m (>= 0)
    y: number;
    z: number;
  };
  friction: number; // 0–1 (coefficient)
  id: ID;
  mass: number; // kg (>= 0. `Infinity` for unmovable)
  position: {
    x: number; // m (>= 0)
    y: number;
    z: number;
  };
  type: EntityType;
  velocity: {
    x: number; // m/s (>= 0. - -> left, + -> right)
    y: number; // (- -> down, + -> up)
    z: number; // (- -> backward, + -> forward)
  };
  vmax: {
    x: number; // m/s (>= 0)
    y: number;
    z: number;
  };
};

export type EntityComponent = ComponentType<Omit<Entity, "type">>;

export type EntityType = (typeof ENTITY_TYPES)[number];

export type ID = string;

export type Key = (typeof KEYS)[number];

export type State = {
  entities: Entity[];
  inputs: Map<Key, boolean>;
  universe: {
    acceleration: {
      x: number; // m/s^2 (gravity. >= 0)
      y: number;
      z: number;
    };
    dimensions: {
      x: number; // m (>= 0)
      y: number;
      z: number;
    };
  };
  viewport: {
    dimensions: {
      x: number; // m (>= 0)
      y: number;
    };
    position: {
      x: number; // m (>= 0)
      y: number;
    };
  };
};
