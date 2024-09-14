import { CLOUD_LARGE, CLOUD_MEDIUM, CLOUD_SMALL } from "@/bitmaps";
import { Entity } from "@/types";
import { gridUnits } from "@/utils";

export class Cloud implements Entity {
  private get bitmap(): OffscreenCanvas {
    switch (this.size) {
      case "large":
        return CLOUD_LARGE;
      case "medium":
        return CLOUD_MEDIUM;
      default:
        return CLOUD_SMALL;
    }
  }

  position;
  size: "small" | "medium" | "large";

  get length() {
    return {
      x: gridUnits(this.size === "large" ? 5 : this.size === "medium" ? 4 : 3),
      y: gridUnits(2),
    };
  }

  constructor(gridX: number, gridY: number, size: Cloud["size"]) {
    this.position = {
      x: gridUnits(gridX),
      y: gridUnits(gridY),
      z: -4,
    };
    this.size = size;
  }

  render(context: CanvasRenderingContext2D): void {
    context.drawImage(this.bitmap, 0, 0, this.length.x, this.length.y);
  }
}
