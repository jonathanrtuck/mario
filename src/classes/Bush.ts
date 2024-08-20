import { GRID_DIMENSION } from "@/constants";

import { Entity } from "./Entity";

export class Bush extends Entity {
  /*
  static patterns = {
    // prettier-ignore
    Bush: [],
  };
  */

  fill: Entity["fill"] = 9; // @todo
  mass = 7.5;
  position;
  size: "small" | "medium" | "large";

  get lengths() {
    return {
      x:
        GRID_DIMENSION *
        (this.size === "large" ? 5 : this.size === "medium" ? 4 : 3),
      y: GRID_DIMENSION * 1,
      z: 0,
    };
  }
  set lengths(value) {}

  constructor(gridX: number, gridY: number, size: Bush["size"]) {
    super();

    this.position = {
      x: GRID_DIMENSION * gridX,
      y: GRID_DIMENSION * gridY,
      z: 0,
    };
    this.size = size;
  }
}
