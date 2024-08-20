import {
  Acceleration,
  Bitmap,
  ColorIndex,
  Dimensions,
  EntityType,
  Pattern,
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
  fill: ColorIndex | Pattern;
  mass: number; // kg (>= 0. `Infinity` for unmovable)
  position: Position;
  type: EntityType;
  velocity?: Velocity;
  vmax?: Velocity;

  static patterns?: Partial<Record<Pattern, Bitmap>>;

  constructor({
    acceleration,
    collidableSides,
    deceleration,
    dimensions,
    fill,
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
    fill: Entity["fill"];
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
    this.fill = fill;
    this.mass = mass;
    this.position = position;
    this.type = type;
    this.velocity = velocity;
    this.vmax = vmax;
  }
}
