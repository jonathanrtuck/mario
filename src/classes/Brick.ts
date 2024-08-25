import { GRID_UNIT_LENGTH } from "@/constants";

import { CollidableEntity } from "./CollidableEntity";
import { Entity } from "./Entity";

export class Brick extends CollidableEntity {
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

  collidableOffset = {
    x: 0,
    y: 0,
    z: 0,
  };
  collidableSides = {
    bottom: true,
    left: true,
    right: true,
    top: true,
  };
  fill: Entity["fill"] = "Brick";
  length = {
    x: GRID_UNIT_LENGTH * 1,
    y: GRID_UNIT_LENGTH * 1,
    z: 1,
  };
  mass = 0;
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
