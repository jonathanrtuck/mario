import { GRID_DIMENSION } from "@/constants";

import { Entity } from "./Entity";

export class Hill extends Entity {
  /*
  static patterns = {
    // prettier-ignore
    Hill: [],
  };
  */

  fill: Entity["fill"] = 7; // @todo
  mass = Infinity;
  position;
  size: "small" | "large";

  get lengths() {
    return {
      x: GRID_DIMENSION * (this.size === "large" ? 5 : 3),
      y: GRID_DIMENSION * (this.size === "large" ? 3 : 2),
      z: 0,
    };
  }
  set lengths(value) {}

  constructor(gridX: number, gridY: number, size: Hill["size"]) {
    super();

    this.position = {
      x: GRID_DIMENSION * gridX,
      y: GRID_DIMENSION * gridY,
      z: 0,
    };
    this.size = size;
  }
}
