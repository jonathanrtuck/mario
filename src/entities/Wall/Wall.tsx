import { COLOR_BROWN, GRID_UNIT_LENGTH } from "@/constants";
import { CollidableEntity } from "@/types";
import { getRGBA } from "@/utils";

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
      x: GRID_UNIT_LENGTH * gridWidth,
      y: GRID_UNIT_LENGTH * gridHeight,
      z: 4,
    };
    this.position = {
      x: GRID_UNIT_LENGTH * gridX,
      y: GRID_UNIT_LENGTH * gridY,
      z: -3,
    };
  }

  render(context: CanvasRenderingContext2D): void {
    context.fillStyle = getRGBA(COLOR_BROWN);
    context.fillRect(0, 0, this.length.x, this.length.y);
  }
}
