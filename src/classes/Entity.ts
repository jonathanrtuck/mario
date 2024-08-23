import { Bitmap, ColorIndex, Length, Pattern, Position } from "@/types";

export abstract class Entity {
  static patterns?: Partial<Record<Pattern, Bitmap>>;

  abstract fill: ColorIndex | Pattern;
  abstract length: Length;
  abstract mass: number; // kg (>= 0. `Infinity` for unmovable)
  abstract position: Position;
}
