import { GRID_DIMENSION } from "@/constants";

import { Entity } from "./Entity";

export class QuestionBlock extends Entity {
  static patterns: typeof Entity.patterns = {
    // prettier-ignore
    QuestionBlock: [
      new Uint8ClampedArray([0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0]),
      new Uint8ClampedArray([3,10,10,10,10,10,10,10,10,10,10,10,10,10,10, 1]),
      new Uint8ClampedArray([3,10, 1,10,10,10,10,10,10,10,10,10,10, 1,10, 1]),
      new Uint8ClampedArray([3,10,10,10,10, 3, 3, 3, 3, 3,10,10,10,10,10, 1]),
      new Uint8ClampedArray([3,10,10,10, 3, 3, 1, 1, 1, 3, 3,10,10,10,10, 1]),
      new Uint8ClampedArray([3,10,10,10, 3, 3, 1,10,10, 3, 3, 1,10,10,10, 1]),
      new Uint8ClampedArray([3,10,10,10, 3, 3, 1,10,10, 3, 3, 1,10,10,10, 1]),
      new Uint8ClampedArray([3,10,10,10,10, 1, 1,10, 3, 3, 3, 1,10,10,10, 1]),
      new Uint8ClampedArray([3,10,10,10,10,10,10, 3, 3, 1, 1, 1,10,10,10, 1]),
      new Uint8ClampedArray([3,10,10,10,10,10,10, 3, 3, 1,10,10,10,10,10, 1]),
      new Uint8ClampedArray([3,10,10,10,10,10,10,10, 1, 1,10,10,10,10,10, 1]),
      new Uint8ClampedArray([3,10,10,10,10,10,10, 3, 3,10,10,10,10,10,10, 1]),
      new Uint8ClampedArray([3,10,10,10,10,10,10, 3, 3, 1,10,10,10,10,10, 1]),
      new Uint8ClampedArray([3,10, 1,10,10,10,10,10, 1, 1,10,10,10, 1,10, 1]),
      new Uint8ClampedArray([3,10,10,10,10,10,10,10,10,10,10,10,10,10,10, 1]),
      new Uint8ClampedArray([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
    ],
  };

  collidableSides = {
    bottom: true,
    left: true,
    right: true,
    top: true,
  };
  fill: Entity["fill"] = "QuestionBlock";
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
