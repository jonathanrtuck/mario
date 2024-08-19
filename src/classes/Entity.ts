import {
  Acceleration,
  Dimensions,
  EntityType,
  Position,
  Velocity,
} from "@/types";

export class Entity {
  acceleration?: Acceleration;
  collidableSides?: {
    bottom: boolean;
    left: boolean;
    right: boolean;
    top: boolean;
  };
  deceleration?: Acceleration;
  dimensions: Dimensions;
  mass: number; // kg (>= 0. `Infinity` for unmovable)
  position: Position;
  type: EntityType;
  velocity?: Velocity;
  vmax?: Velocity;

  constructor({
    acceleration,
    collidableSides,
    deceleration,
    dimensions,
    mass,
    position,
    type,
    velocity,
    vmax,
  }: {
    acceleration?: Entity["acceleration"];
    collidableSides?: Entity["collidableSides"];
    deceleration?: Entity["deceleration"];
    dimensions: Entity["dimensions"];
    mass: Entity["mass"]; // kg (>= 0. `Infinity` for unmovable)
    position: Entity["position"];
    type: Entity["type"];
    velocity?: Entity["velocity"];
    vmax?: Entity["vmax"];
  }) {
    this.acceleration = acceleration;
    this.collidableSides = collidableSides;
    this.deceleration = deceleration;
    this.dimensions = dimensions;
    this.mass = mass;
    this.position = position;
    this.type = type;
    this.velocity = velocity;
    this.vmax = vmax;
  }
}
