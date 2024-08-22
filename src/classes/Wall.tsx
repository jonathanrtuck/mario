import { GRID_UNIT_LENGTH } from "@/constants";

import { Entity } from "./Entity";

export class Wall extends Entity {
  static patterns: typeof Entity.patterns = {
    // prettier-ignore
    Wall: [
      new Uint8ClampedArray([3,4,4,4,4,4,4,4,4,1,3,4,4,4,4,3]),
      new Uint8ClampedArray([4,3,3,3,3,3,3,3,3,1,4,3,3,3,3,1]),
      new Uint8ClampedArray([4,3,3,3,3,3,3,3,3,1,4,3,3,3,3,1]),
      new Uint8ClampedArray([4,3,3,3,3,3,3,3,3,1,4,3,3,3,3,1]),
      new Uint8ClampedArray([4,3,3,3,3,3,3,3,3,1,4,1,3,3,3,1]),
      new Uint8ClampedArray([4,3,3,3,3,3,3,3,3,1,3,1,1,1,1,3]),
      new Uint8ClampedArray([4,3,3,3,3,3,3,3,3,1,4,4,4,4,4,1]),
      new Uint8ClampedArray([4,3,3,3,3,3,3,3,3,1,4,3,3,3,3,1]),
      new Uint8ClampedArray([4,3,3,3,3,3,3,3,3,1,4,3,3,3,3,1]),
      new Uint8ClampedArray([4,3,3,3,3,3,3,3,3,1,4,3,3,3,3,1]),
      new Uint8ClampedArray([1,1,3,3,3,3,3,3,1,4,3,3,3,3,3,1]),
      new Uint8ClampedArray([4,4,1,1,3,3,3,3,1,4,3,3,3,3,3,1]),
      new Uint8ClampedArray([4,3,4,4,1,1,1,1,4,3,3,3,3,3,3,1]),
      new Uint8ClampedArray([4,3,3,3,4,4,4,1,4,3,3,3,3,3,3,1]),
      new Uint8ClampedArray([4,3,3,3,3,3,3,1,4,3,3,3,3,3,1,1]),
      new Uint8ClampedArray([3,1,1,1,1,1,1,3,4,1,1,1,1,1,1,3]),
    ],
  };

  collidableSides = {
    bottom: false,
    left: true,
    right: true,
    top: true,
  };
  fill: Entity["fill"] = "Wall";
  length;
  mass = Infinity;
  position;

  constructor(
    gridX: number,
    gridY: number,
    gridWidth: number,
    gridHeight: number
  ) {
    super();

    this.length = {
      x: GRID_UNIT_LENGTH * gridWidth,
      y: GRID_UNIT_LENGTH * gridHeight,
      z: 0,
    };
    this.position = {
      x: GRID_UNIT_LENGTH * gridX,
      y: GRID_UNIT_LENGTH * gridY,
      z: 0,
    };
  }
}
