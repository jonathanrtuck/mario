import {
  QUESTION_BLOCK_DARK,
  QUESTION_BLOCK_DISABLED,
  QUESTION_BLOCK_LIGHT,
  QUESTION_BLOCK_MEDIUM,
} from "@/bitmaps";
import { TICK_INTERVAL } from "@/constants";
import { CollidableEntity, MS, Side } from "@/types";
import { gridUnits, isControllable } from "@/utils";

type Variant = "light" | "medium" | "dark";

const VARIANT_CHANGE_INTERVAL: MS = TICK_INTERVAL / 3;
const VARIANTS: Variant[] = [
  "light",
  "light",
  "light",
  "medium",
  "dark",
  "medium",
];

export class QuestionBlock implements CollidableEntity {
  private prevVariantChangeMs: MS = 0;
  private variantIndex = 0;

  private get bitmap(): OffscreenCanvas {
    if (this.isDisabled) {
      return QUESTION_BLOCK_DISABLED;
    }

    switch (VARIANTS[this.variantIndex]) {
      case "dark":
        return QUESTION_BLOCK_DARK;
      case "medium":
        return QUESTION_BLOCK_MEDIUM;
      default:
        return QUESTION_BLOCK_LIGHT;
    }
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

  render(context: CanvasRenderingContext2D, now: MS): void {
    if (!this.isDisabled) {
      const elapsedMs = now - this.prevVariantChangeMs;

      if (elapsedMs >= VARIANT_CHANGE_INTERVAL) {
        this.variantIndex++;

        if (this.variantIndex === VARIANTS.length) {
          this.variantIndex = 0;
        }

        this.prevVariantChangeMs = now;
      }
    }

    if (this.isVisible) {
      context.drawImage(this.bitmap, 0, 0, this.length.x, this.length.y);
    }
  }
}
