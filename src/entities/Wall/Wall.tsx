import { COLOR_TRANSPARENT } from "@/constants";
import { Button, CollidableEntity } from "@/types";
import { getRGBA, gridUnits } from "@/utils";

import { pattern } from "./pattern";

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
      z: 4,
    };
    this.position = {
      x: gridUnits(gridX),
      y: gridUnits(gridY),
      z: -3,
    };
  }

  render(context: CanvasRenderingContext2D): void {
    context.fillStyle =
      context.createPattern(pattern, "repeat") ?? getRGBA(COLOR_TRANSPARENT);
    context.fillRect(0, 0, this.length.x, this.length.y);
  }

  update(buttons: Set<Button>): void {
    //
  }
}
