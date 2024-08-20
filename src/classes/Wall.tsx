import { GRID_DIMENSION } from "@/constants";

import { Entity } from "./Entity";

export class Wall extends Entity {
  static patterns = {
    // prettier-ignore
    Wall: [
      new Uint8ClampedArray([3, 4, 4, 4, 4, 4, 4, 4, 4, 1, 3, 4, 4, 4, 4, 3]),
      new Uint8ClampedArray([4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 1]),
      new Uint8ClampedArray([4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 1]),
      new Uint8ClampedArray([4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 1]),
      new Uint8ClampedArray([4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 1, 3, 3, 3, 1]),
      new Uint8ClampedArray([4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 1, 1, 1, 1, 3]),
      new Uint8ClampedArray([4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 4, 4, 4, 4, 1]),
      new Uint8ClampedArray([4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 1]),
      new Uint8ClampedArray([4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 1]),
      new Uint8ClampedArray([4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 1]),
      new Uint8ClampedArray([1, 1, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 3, 1]),
      new Uint8ClampedArray([4, 4, 1, 1, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 3, 1]),
      new Uint8ClampedArray([4, 3, 4, 4, 1, 1, 1, 1, 4, 3, 3, 3, 3, 3, 3, 1]),
      new Uint8ClampedArray([4, 3, 3, 3, 4, 4, 4, 1, 4, 3, 3, 3, 3, 3, 3, 1]),
      new Uint8ClampedArray([4, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 3, 1, 1]),
      new Uint8ClampedArray([3, 1, 1, 1, 1, 1, 1, 3, 4, 1, 1, 1, 1, 1, 1, 3]),
    ],
  };

  constructor(
    gridX: number,
    gridY: number,
    gridWidth: number,
    gridHeight: number
  ) {
    super({
      fill: "Wall",
      lengths: {
        x: GRID_DIMENSION * gridWidth,
        y: GRID_DIMENSION * gridHeight,
        z: 0,
      },
      mass: 0,
      position: {
        x: GRID_DIMENSION * gridX,
        y: GRID_DIMENSION * gridY,
        z: 0,
      },
      type: "Wall",
    });
  }
}
