import { GRID_UNIT_LENGTH } from "@/constants";

import { CollidableEntity } from "./CollidableEntity";
import { Entity } from "./Entity";

export class Block extends CollidableEntity {
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

  collidableOffset = {
    x: 0,
    y: 0,
    z: 0,
  };
  collidableSides = {
    bottom: false,
    left: true,
    right: true,
    top: true,
  };
  fill: Entity["fill"] = "Block";
  length = {
    x: GRID_UNIT_LENGTH * 1,
    y: GRID_UNIT_LENGTH * 1,
    z: 0,
  };
  mass = Infinity;
  position;

  constructor(gridX: number, gridY: number) {
    super();

    this.position = {
      x: GRID_UNIT_LENGTH * gridX,
      y: GRID_UNIT_LENGTH * gridY,
      z: 0,
    };
  }
}
