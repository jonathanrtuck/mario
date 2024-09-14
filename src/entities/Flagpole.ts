import { FLAGPOLE } from "@/bitmaps";
import { CollidableEntity } from "@/types";
import { gridUnits, pixels } from "@/utils";

export class Flagpole implements CollidableEntity {
  collidableSides = {
    bottom: false,
    left: true,
    right: true,
    top: true,
  };
  length = {
    x: pixels(2),
    y: gridUnits(10),
  };
  position;

  constructor(gridX: number, gridY: number) {
    this.position = {
      x: gridUnits(gridX),
      y: gridUnits(gridY),
      z: 0,
    };
  }

  render(context: CanvasRenderingContext2D): void {
    context.drawImage(
      FLAGPOLE,
      pixels(-3),
      0,
      this.length.x + pixels(3 * 2),
      this.length.y
    );
  }
}
