import { CASTLE } from "@/bitmaps";
import { Entity } from "@/types";
import { gridUnits } from "@/utils";

export class Castle implements Entity {
  length;
  position;

  constructor(gridX: number, gridY: number) {
    this.length = {
      x: gridUnits(5),
      y: gridUnits(5),
    };
    this.position = {
      x: gridUnits(gridX),
      y: gridUnits(gridY),
      z: -1,
    };
  }

  render(context: CanvasRenderingContext2D): void {
    context.drawImage(CASTLE, 0, 0, this.length.x, this.length.y);
  }
}
