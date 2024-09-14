import { WALL } from "@/bitmaps";
import { COLORS } from "@/constants";
import { CollidableEntity } from "@/types";
import { gridUnits } from "@/utils";

export class Wall implements CollidableEntity {
  collidableSides = {
    bottom: false,
    left: true,
    right: true,
    top: true,
  };
  length;
  position;

  constructor(
    gridX: number,
    gridY: number,
    gridWidth: number,
    gridHeight: number
  ) {
    this.length = {
      x: gridUnits(gridWidth),
      y: gridUnits(gridHeight),
    };
    this.position = {
      x: gridUnits(gridX),
      y: gridUnits(gridY),
      z: 0,
    };
  }

  render(context: CanvasRenderingContext2D): void {
    context.fillStyle = context.createPattern(WALL, "repeat") ?? COLORS[0x0];
    context.fillRect(0, 0, this.length.x, this.length.y);
  }
}
