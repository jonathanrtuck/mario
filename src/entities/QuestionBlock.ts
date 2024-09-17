import {
  QUESTION_BLOCK_DARK,
  QUESTION_BLOCK_DISABLED,
  QUESTION_BLOCK_LIGHT,
  QUESTION_BLOCK_MEDIUM,
} from "@/bitmaps";
import { Mario } from "@/entities";
import { UPDATES_PER_TICK } from "@/constants";
import { CollidableEntity, Side } from "@/types";
import { gridUnits } from "@/utils";

export class QuestionBlock implements CollidableEntity {
  private bitmap = QUESTION_BLOCK_LIGHT;

  isDisabled = false;
  isVisible: boolean;
  length = {
    x: gridUnits(1),
    y: gridUnits(1),
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
    if (!this.isDisabled && side === "bottom" && entity instanceof Mario) {
      this.isDisabled = true;
    }
  }

  render(context: CanvasRenderingContext2D): void {
    if (this.isVisible) {
      context.drawImage(this.bitmap, 0, 0, this.length.x, this.length.y);
    }
  }

  update(time: number, numUpdatesSinceTick: number): void {
    this.bitmap = this.isDisabled
      ? QUESTION_BLOCK_DISABLED
      : time % 2 === 0
      ? QUESTION_BLOCK_LIGHT
      : [QUESTION_BLOCK_MEDIUM, QUESTION_BLOCK_DARK, QUESTION_BLOCK_MEDIUM][
          Math.floor(numUpdatesSinceTick / (UPDATES_PER_TICK / 3))
        ];
  }
}
