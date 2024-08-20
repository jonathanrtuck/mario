import { GRID_DIMENSION } from "@/constants";

import { Entity } from "./Entity";

type Size = "small" | "large";

export class Mario extends Entity {
  #size: Size = "small";

  get size() {
    return this.#size;
  }
  set size(value: Size) {
    this.#size = value;

    // @todo update this.fill to appropriate bitmap
  }

  constructor(gridX: number, gridY: number, size: Mario["size"]) {
    super({
      acceleration: {
        x: 8,
        y: 15.3,
        z: 0,
      },
      deceleration: {
        x: 6,
        y: 0,
        z: 0,
      },
      fill: 11,
      lengths: {
        x: GRID_DIMENSION * 1,
        y: GRID_DIMENSION * (size === "large" ? 2 : 1),
        z: 0,
      },
      mass: 70,
      position: {
        x: GRID_DIMENSION * gridX,
        y: GRID_DIMENSION * gridY,
        z: 0,
      },
      type: "Mario",
      velocity: {
        x: 0,
        y: 0,
        z: 0,
      },
      vmax: {
        x: 3.6,
        y: 19.6,
        z: 0,
      },
    });

    this.size = size;
  }
}
