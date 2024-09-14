import { HILL_LARGE, HILL_SMALL } from "@/bitmaps";
import { Entity } from "@/types";
import { gridUnits } from "@/utils";

export class Hill implements Entity {
  private get bitmap(): OffscreenCanvas {
    switch (this.size) {
      case "large":
        return HILL_LARGE;
      default:
        return HILL_SMALL;
    }
  }

  position;
  size: "small" | "large";

  get length() {
    return {
      x: gridUnits(this.size === "large" ? 5 : 3),
      y: gridUnits(this.size === "large" ? 3 : 2),
    };
  }

  constructor(gridX: number, gridY: number, size: "small" | "large") {
    this.position = {
      x: gridUnits(gridX),
      y: gridUnits(gridY),
      z: -3,
    };
    this.size = size;
  }

  render(context: CanvasRenderingContext2D): void {
    context.drawImage(this.bitmap, 0, 0, this.length.x, this.length.y);
  }
}
