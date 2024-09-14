import { BUSH_LARGE, BUSH_MEDIUM, BUSH_SMALL } from "@/bitmaps";
import { Entity } from "@/types";
import { gridUnits } from "@/utils";

export class Bush implements Entity {
  private get bitmap(): OffscreenCanvas {
    switch (this.size) {
      case "large":
        return BUSH_LARGE;
      case "medium":
        return BUSH_MEDIUM;
      default:
        return BUSH_SMALL;
    }
  }

  position;
  size: "small" | "medium" | "large";

  get length() {
    return {
      x: gridUnits(this.size === "large" ? 5 : this.size === "medium" ? 4 : 3),
      y: gridUnits(1),
      z: 0,
    };
  }

  constructor(
    gridX: number,
    gridY: number,
    size: "small" | "medium" | "large"
  ) {
    this.position = {
      x: gridUnits(gridX),
      y: gridUnits(gridY),
      z: -2,
    };
    this.size = size;
  }

  render(context: CanvasRenderingContext2D): void {
    context.drawImage(this.bitmap, 0, 0, this.length.x, this.length.y);
  }
}
