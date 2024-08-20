import {
  Acceleration,
  Bitmap,
  ColorIndex,
  Lengths,
  Pattern,
  Position,
  Velocity,
} from "@/types";

export abstract class Entity {
  abstract fill: ColorIndex | Pattern;
  abstract lengths: Lengths;
  abstract mass: number; // kg (>= 0. `Infinity` for unmovable)
  abstract position: Position;

  acceleration?: Acceleration;
  collidableSides?: {
    bottom: boolean;
    left: boolean;
    right: boolean;
    top: boolean;
  };
  deceleration?: Acceleration;
  patterns?: Partial<Record<Pattern, Bitmap>>;
  velocity?: Velocity;
  vmax?: Velocity;
}
