import { GRID_UNIT_LENGTH } from "@/constants";

import { CollidableEntity } from "./CollidableEntity";
import { Entity } from "./Entity";

export class QuestionBlock extends CollidableEntity {
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

  collidableOffset = {
    x: 0,
    y: 0,
    z: 0,
  };
  isVisible: boolean;
  length = {
    x: GRID_UNIT_LENGTH * 1,
    y: GRID_UNIT_LENGTH * 1,
    z: 1,
  };
  mass = 0;
  position;

  get collidableSides() {
    if (!this.isVisible) {
      return {
        bottom: true,
        left: false,
        right: false,
        top: false,
      };
    }

    return {
      bottom: true,
      left: true,
      right: true,
      top: true,
    };
  }
  set collidableSides(value) {}

  get fill() {
    if (!this.isVisible) {
      return 0;
    }

    return "QuestionBlock";
  }
  set fill(value) {}

  constructor(
    gridX: number,
    gridY: number,
    isVisible: QuestionBlock["isVisible"] = true
  ) {
    super();

    this.isVisible = isVisible;
    this.position = {
      x: GRID_UNIT_LENGTH * gridX,
      y: GRID_UNIT_LENGTH * gridY,
      z: 0,
    };
  }
}
