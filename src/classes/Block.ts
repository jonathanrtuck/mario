import { GRID_DIMENSION } from "@/constants";

import { Entity } from "./Entity";

export class Block extends Entity {
  static patterns: typeof Entity.patterns = {
    // prettier-ignore
    Block: [
      new Uint8ClampedArray([3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1]),
      new Uint8ClampedArray([4,3,4,4,4,4,4,4,4,4,4,4,4,4,1,1]),
      new Uint8ClampedArray([4,4,3,4,4,4,4,4,4,4,4,4,4,1,1,1]),
      new Uint8ClampedArray([4,4,4,3,4,4,4,4,4,4,4,4,1,1,1,1]),
      new Uint8ClampedArray([4,4,4,4,3,3,3,3,3,3,3,3,1,1,1,1]),
      new Uint8ClampedArray([4,4,4,4,3,3,3,3,3,3,3,3,1,1,1,1]),
      new Uint8ClampedArray([4,4,4,4,3,3,3,3,3,3,3,3,1,1,1,1]),
      new Uint8ClampedArray([4,4,4,4,3,3,3,3,3,3,3,3,1,1,1,1]),
      new Uint8ClampedArray([4,4,4,4,3,3,3,3,3,3,3,3,1,1,1,1]),
      new Uint8ClampedArray([4,4,4,4,3,3,3,3,3,3,3,3,1,1,1,1]),
      new Uint8ClampedArray([4,4,4,4,3,3,3,3,3,3,3,3,1,1,1,1]),
      new Uint8ClampedArray([4,4,4,4,3,3,3,3,3,3,3,3,1,1,1,1]),
      new Uint8ClampedArray([4,4,4,1,1,1,1,1,1,1,1,1,3,1,1,1]),
      new Uint8ClampedArray([4,4,1,1,1,1,1,1,1,1,1,1,1,3,1,1]),
      new Uint8ClampedArray([4,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1]),
      new Uint8ClampedArray([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3]),
    ],
  };

  collidableSides = {
    bottom: false,
    left: true,
    right: true,
    top: true,
  };
  fill: Entity["fill"] = "Block";
  length = {
    x: GRID_DIMENSION * 1,
    y: GRID_DIMENSION * 1,
    z: 0,
  };
  mass = Infinity;
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
