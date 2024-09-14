import { BRICK } from "@/bitmaps";
import { CollidableEntity, Side } from "@/types";
import { gridUnits, isMovable } from "@/utils";

export class Brick implements CollidableEntity {
  collidableSides = {
    bottom: true,
    left: true,
    right: true,
    top: true,
  };
  length = {
    x: gridUnits(1),
    y: gridUnits(1),
  };
  position;

  constructor(gridX: number, gridY: number) {
    this.position = {
      x: gridUnits(gridX),
      y: gridUnits(gridY),
      z: 0,
    };
  }

  collide(entity: CollidableEntity, side: Side): void {
    if (side === "bottom" && isMovable(entity)) {
      if (entity.mass > 100) {
        // @todo break
      }
    }
  }

  render(context: CanvasRenderingContext2D): void {
    context.drawImage(BRICK, 0, 0, this.length.x, this.length.y);
  }
}
