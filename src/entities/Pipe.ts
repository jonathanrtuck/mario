import { PIPE } from "@/bitmaps";
import { CollidableEntity } from "@/types";
import { gridUnits, pixels } from "@/utils";

export class Pipe implements CollidableEntity {
  collidableSides = {
    bottom: false,
    left: true,
    right: true,
    top: true,
  };
  length;
  position;

  constructor(gridX: number, gridY: number, gridHeight: number) {
    this.length = {
      x: gridUnits(2) - pixels(2 * 2),
      y: gridUnits(gridHeight),
    };
    this.position = {
      x: gridUnits(gridX),
      y: gridUnits(gridY),
      z: 0,
    };
  }

  render(context: CanvasRenderingContext2D): void {
    context.drawImage(
      PIPE,
      0,
      0,
      this.length.x + pixels(2 * 2),
      this.length.y,
      pixels(-2),
      0,
      this.length.x + pixels(2 * 2),
      this.length.y
    );
  }
}
