import { GRID_DIMENSION } from "@/constants";

import { Entity } from "./Entity";

export class Cloud extends Entity {
  /*
  static patterns = {
    // prettier-ignore
    Cloud: [],
  };
  */

  fill: Entity["fill"] = 2; // @todo
  mass = 0;
  position;
  size: "small" | "medium" | "large";

  get lengths() {
    return {
      x:
        GRID_DIMENSION *
        (this.size === "large" ? 5 : this.size === "medium" ? 4 : 3),
      y: GRID_DIMENSION * 2,
      z: 0,
    };
  }
  set lengths(value) {}

  constructor(gridX: number, gridY: number, size: Cloud["size"]) {
    super();

    this.position = {
      x: GRID_DIMENSION * gridX,
      y: GRID_DIMENSION * gridY,
      z: 0,
    };
    this.size = size;
  }
}
