import { GRID_DIMENSION } from "@/constants";

import { Entity } from "./Entity";

export class Brick extends Entity {
  /*
  static patterns = {
    // prettier-ignore
    Brick: [],
  };
  */

  collidableSides = {
    bottom: true,
    left: true,
    right: true,
    top: true,
  };
  fill: Entity["fill"] = 3; // @todo
  lengths = {
    x: GRID_DIMENSION * 1,
    y: GRID_DIMENSION * 1,
    z: 0,
  };
  mass = 0;
  position;

  constructor(gridX: number, gridY: number) {
    super();

    this.position = {
      x: GRID_DIMENSION * gridX,
      y: GRID_DIMENSION * gridY,
      z: 0,
    };
  }
}
