import {
  GRID_UNIT_LENGTH,
  PIXEL_LENGTH,
  NUM_PIXELS_PER_GRID_UNIT,
} from "@/constants";

import { CollidableEntity } from "./CollidableEntity";
import { Entity } from "./Entity";

const WIDTH = GRID_UNIT_LENGTH * 0.5;

export class Flag extends CollidableEntity {
  static patterns: typeof Entity.patterns = {
    // prettier-ignore
    Flag: [
      new Uint8ClampedArray([0,0,1,1,1,1,0,0]),
      new Uint8ClampedArray([0,1,9,7,7,7,1,0]),
      new Uint8ClampedArray([1,9,7,7,7,7,7,1]),
      new Uint8ClampedArray([1,9,7,7,7,7,7,1]),
      new Uint8ClampedArray([1,7,7,7,7,7,7,1]),
      new Uint8ClampedArray([1,7,7,7,7,7,7,1]),
      new Uint8ClampedArray([0,1,7,7,7,7,1,0]),
      new Uint8ClampedArray([0,0,1,1,1,1,0,0]),
    ].concat(
      new Array(13 * NUM_PIXELS_PER_GRID_UNIT).fill(
        new Uint8ClampedArray([0,0,0,9,9,0,0,0])
      )
    ),
  };

  collidableOffset = {
    x: WIDTH / 2 - PIXEL_LENGTH,
    y: 0,
    z: 0,
  };
  collidableSides = {
    bottom: true,
    left: true,
    right: true,
    top: true,
  };
  fill: Entity["fill"] = "Flag";
  length = {
    x: WIDTH,
    y: GRID_UNIT_LENGTH * 10,
    z: 0,
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
