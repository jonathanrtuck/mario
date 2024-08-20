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

  static patterns?: Partial<Record<Pattern, Bitmap>>;

  acceleration?: Acceleration;
  collidableSides?: {
    bottom: boolean;
    left: boolean;
    right: boolean;
    top: boolean;
  };
  deceleration?: Acceleration;
  velocity?: Velocity;
  vmax?: Velocity;
}
