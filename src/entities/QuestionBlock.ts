import {
  QUESTION_BLOCK_DARK,
  QUESTION_BLOCK_DISABLED,
  QUESTION_BLOCK_LIGHT,
  QUESTION_BLOCK_MEDIUM,
} from "@/bitmaps";
import { CollidableEntity, Side } from "@/types";
import { gridUnits, isControllable } from "@/utils";

export class QuestionBlock implements CollidableEntity {
  private get bitmap(): OffscreenCanvas {
    if (this.isDisabled) {
      return QUESTION_BLOCK_DISABLED;
    }

    return QUESTION_BLOCK_LIGHT;
  }

  isDisabled = false;
  isVisible: boolean;
  length = {
    x: gridUnits(1),
    y: gridUnits(1),
    z: 1,
  };
  position;

  get collidableSides() {
    return {
      bottom: true,
      left: this.isVisible,
      right: this.isVisible,
      top: this.isVisible,
    };
  }

  constructor(gridX: number, gridY: number, isVisible: boolean = true) {
    this.isVisible = isVisible;
    this.position = {
      x: gridUnits(gridX),
      y: gridUnits(gridY),
      z: 0,
    };
  }

  collide(entity: CollidableEntity, side: Side): void {
    if (!this.isDisabled && side === "bottom" && isControllable(entity)) {
      this.isDisabled = true;
    }
  }

  render(context: CanvasRenderingContext2D): void {
    if (this.isVisible) {
      context.drawImage(this.bitmap, 0, 0, this.length.x, this.length.y);
    }
  }
}
