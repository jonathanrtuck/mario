import { GRID_DIMENSION } from "@/constants";

import { Entity } from "./Entity";

export class Pipe extends Entity {
  /*
    static patterns = {
      // prettier-ignore
      Pipe: [],
    };
    */

  collidableSides = {
    bottom: false,
    left: true,
    right: true,
    top: true,
  };
  fill: Entity["fill"] = 7; // @todo
  lengths;
  mass = Infinity;
  position;

  constructor(gridX: number, gridY: number, gridHeight: number) {
    super();

    this.lengths = {
      x: GRID_DIMENSION * 2,
      y: GRID_DIMENSION * gridHeight,
      z: 0,
    };
    this.position = {
      x: GRID_DIMENSION * gridX,
      y: GRID_DIMENSION * gridY,
      z: 0,
    };
  }
}
