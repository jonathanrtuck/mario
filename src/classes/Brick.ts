import { GRID_DIMENSION } from "@/constants";

import { Entity } from "./Entity";

export class Brick extends Entity {
  static patterns: typeof Entity.patterns = {
    // prettier-ignore
    Brick: [
      new Uint8ClampedArray([4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]),
      new Uint8ClampedArray([3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,1]),
      new Uint8ClampedArray([3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,1]),
      new Uint8ClampedArray([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]),
      new Uint8ClampedArray([3,3,3,1,3,3,3,3,3,3,3,1,3,3,3,3]),
      new Uint8ClampedArray([3,3,3,1,3,3,3,3,3,3,3,1,3,3,3,3]),
      new Uint8ClampedArray([3,3,3,1,3,3,3,3,3,3,3,1,3,3,3,3]),
      new Uint8ClampedArray([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]),
      new Uint8ClampedArray([3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,1]),
      new Uint8ClampedArray([3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,1]),
      new Uint8ClampedArray([3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,1]),
      new Uint8ClampedArray([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]),
      new Uint8ClampedArray([3,3,3,1,3,3,3,3,3,3,3,1,3,3,3,3]),
      new Uint8ClampedArray([3,3,3,1,3,3,3,3,3,3,3,1,3,3,3,3]),
      new Uint8ClampedArray([3,3,3,1,3,3,3,3,3,3,3,1,3,3,3,3]),
      new Uint8ClampedArray([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]),
    ],
  };

  collidableSides = {
    bottom: true,
    left: true,
    right: true,
    top: true,
  };
  fill: Entity["fill"] = "Brick";
  length = {
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
