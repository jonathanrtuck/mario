import { COLOR_VALUES } from "@/constants";
import { Bitmap, Entity } from "@/types";
import { drawBitmap, gridUnits } from "@/utils";

const { BLACK: K, GREEN: G, GREEN_LIGHT: L, TRANSPARENT: T } = COLOR_VALUES;

// prettier-ignore
const LARGE_BITMAP: Bitmap = [
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,L,K,T,T,T,T,T,T,T,T,T,T,K,L,L,L,L,K,T,T,T,T,T,T,T,T,T,T,K,L,L,L,L,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,L,L,L,L,L,L,K,T,T,T,T,T,T,T,K,K,L,L,L,L,L,L,K,T,T,T,T,T,T,T,K,K,L,L,L,L,L,L,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,L,L,K,T,K,T,T,T,T,K,L,L,L,L,L,L,L,L,K,T,K,T,T,T,T,K,L,L,L,L,L,L,L,L,K,T,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,L,L,L,K,L,K,T,T,T,K,L,L,L,L,L,L,L,L,L,K,L,K,T,T,T,K,L,L,L,L,L,L,L,L,L,K,L,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,G,L,L,L,L,L,K,T,T,K,L,L,L,L,L,L,G,L,L,L,L,L,K,T,T,K,L,L,L,L,L,L,G,L,L,L,L,L,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,G,G,L,L,L,G,L,L,L,L,K,T,K,L,L,L,G,G,L,L,L,G,L,L,L,L,K,T,K,L,L,L,G,G,L,L,L,G,L,L,L,L,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,G,L,L,L,L,L,L,L,L,L,L,K,K,L,L,L,G,L,L,L,L,L,L,L,L,L,L,K,K,L,L,L,G,L,L,L,L,L,L,L,L,L,L,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,T,T,K,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,T,K,L,K,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,L,L,K,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,T,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,K,K,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,L,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,T,T,T,T,T,T,T,T,T],
];
// prettier-ignore
const MEDIUM_BITMAP: Bitmap = [
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,L,K,T,T,T,T,T,T,T,T,T,T,K,L,L,L,L,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,L,L,L,L,L,L,K,T,T,T,T,T,T,T,K,K,L,L,L,L,L,L,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,L,L,K,T,K,T,T,T,T,K,L,L,L,L,L,L,L,L,K,T,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,L,L,L,K,L,K,T,T,T,K,L,L,L,L,L,L,L,L,L,K,L,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,G,L,L,L,L,L,K,T,T,K,L,L,L,L,L,L,G,L,L,L,L,L,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,G,G,L,L,L,G,L,L,L,L,K,T,K,L,L,L,G,G,L,L,L,G,L,L,L,L,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,G,L,L,L,L,L,L,L,L,L,L,K,K,L,L,L,G,L,L,L,L,L,L,L,L,L,L,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,T,T,K,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,T,K,L,K,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,L,L,K,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,T,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,K,K,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,L,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,T,T,T,T,T,T,T,T,T],
];
// prettier-ignore
const SMALL_BITMAP: Bitmap = [
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,L,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,L,L,L,L,L,L,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,L,L,K,T,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,L,L,L,K,L,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,G,L,L,L,L,L,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,G,G,L,L,L,G,L,L,L,L,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,G,L,L,L,L,L,L,L,L,L,L,K,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,T,K,K,K,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,T,T,K,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,T,K,L,K,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,L,L,K,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,T,T,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,T,K,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,K,K,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,L,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,T,T,K,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,K,T,T,T,T,T,T,T,T,T],
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
