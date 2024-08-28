import {
  COLOR_BLACK,
  COLOR_GREEN,
  COLOR_GREEN_LIGHT,
  COLOR_TRANSPARENT,
} from "@/constants";
import { Bitmap, Entity } from "@/types";
import { drawBitmap, gridUnits } from "@/utils";

const B = COLOR_BLACK;
const G = COLOR_GREEN;
const L = COLOR_GREEN_LIGHT;
const T = COLOR_TRANSPARENT;

// prettier-ignore
const LARGE_BITMAP: Bitmap = [
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,L,B,T,T,T,T,T,T,T,T,T,T,B,L,L,L,L,B,T,T,T,T,T,T,T,T,T,T,B,L,L,L,L,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,L,L,L,L,L,L,B,T,T,T,T,T,T,T,B,B,L,L,L,L,L,L,B,T,T,T,T,T,T,T,B,B,L,L,L,L,L,L,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,L,L,B,T,B,T,T,T,T,B,L,L,L,L,L,L,L,L,B,T,B,T,T,T,T,B,L,L,L,L,L,L,L,L,B,T,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,L,L,L,B,L,B,T,T,T,B,L,L,L,L,L,L,L,L,L,B,L,B,T,T,T,B,L,L,L,L,L,L,L,L,L,B,L,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,G,L,L,L,L,L,B,T,T,B,L,L,L,L,L,L,G,L,L,L,L,L,B,T,T,B,L,L,L,L,L,L,G,L,L,L,L,L,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,G,G,L,L,L,G,L,L,L,L,B,T,B,L,L,L,G,G,L,L,L,G,L,L,L,L,B,T,B,L,L,L,G,G,L,L,L,G,L,L,L,L,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,G,L,L,L,L,L,L,L,L,L,L,B,B,L,L,L,G,L,L,L,L,L,L,L,L,L,L,B,B,L,L,L,G,L,L,L,L,L,L,L,L,L,L,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,T,T,B,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,T,B,L,B,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,L,L,B,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,T,B,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,B,B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,L,B,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,T,T,T,T,T,T,T,T,T],
];
// prettier-ignore
const MEDIUM_BITMAP: Bitmap = [
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,L,B,T,T,T,T,T,T,T,T,T,T,B,L,L,L,L,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,L,L,L,L,L,L,B,T,T,T,T,T,T,T,B,B,L,L,L,L,L,L,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,L,L,B,T,B,T,T,T,T,B,L,L,L,L,L,L,L,L,B,T,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,L,L,L,B,L,B,T,T,T,B,L,L,L,L,L,L,L,L,L,B,L,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,G,L,L,L,L,L,B,T,T,B,L,L,L,L,L,L,G,L,L,L,L,L,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,G,G,L,L,L,G,L,L,L,L,B,T,B,L,L,L,G,G,L,L,L,G,L,L,L,L,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,G,L,L,L,L,L,L,L,L,L,L,B,B,L,L,L,G,L,L,L,L,L,L,L,L,L,L,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,T,T,B,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,T,B,L,B,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,L,L,B,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,T,B,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,B,B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,L,B,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,T,T,T,T,T,T,T,T,T],
];
// prettier-ignore
const SMALL_BITMAP: Bitmap = [
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,L,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,L,L,L,L,L,L,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,L,L,B,T,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,L,L,L,B,L,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,G,L,L,L,L,L,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,G,G,L,L,L,G,L,L,L,L,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,G,L,L,L,L,L,L,L,L,L,L,B,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,B,B,B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,T,T,B,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,T,B,L,B,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,L,L,B,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,T,B,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,B,B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,L,B,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,B,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,B,T,T,T,T,T,T,T,T,T],
];

const LARGE = drawBitmap(LARGE_BITMAP);
const MEDIUM = drawBitmap(MEDIUM_BITMAP);
const SMALL = drawBitmap(SMALL_BITMAP);

export class Bush implements Entity {
  private get Image(): OffscreenCanvas {
    switch (this.size) {
      case "large":
        return LARGE;
      case "medium":
        return MEDIUM;
      default:
        return SMALL;
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
    context.drawImage(this.Image, 0, 0, this.length.x, this.length.y);
  }
}
