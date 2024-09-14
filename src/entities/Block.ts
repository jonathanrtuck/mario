import { BLOCK } from "@/bitmaps";
import { CollidableEntity } from "@/types";
import { gridUnits } from "@/utils";

export class Block implements CollidableEntity {
  collidableSides = {
    bottom: false,
    left: true,
    right: true,
    top: true,
  };
  isVisible: boolean;
  length = {
    x: gridUnits(1),
    y: gridUnits(1),
  };
  position;

  constructor(gridX: number, gridY: number, isVisible: boolean = true) {
    this.isVisible = isVisible;
    this.position = {
      x: gridUnits(gridX),
      y: gridUnits(gridY),
      z: 0,
    };
  }

  render(context: CanvasRenderingContext2D): void {
    if (this.isVisible) {
      context.drawImage(BLOCK, 0, 0, this.length.x, this.length.y);
    }
  }
}
