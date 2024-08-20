import { GRID_DIMENSION } from "@/constants";

import { Entity } from "./Entity";

export class Pipe extends Entity {
  static patterns: typeof Entity.patterns = {
    // prettier-ignore
    Pipe: [
      new Uint8ClampedArray([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]),
      new Uint8ClampedArray([1,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,1]),
      new Uint8ClampedArray([1,7,7,7,7,7,9,9,9,9,9,9,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,1]),
      new Uint8ClampedArray([1,9,9,9,7,7,9,9,9,9,9,9,7,9,9,7,7,7,7,7,7,7,7,7,7,9,7,9,7,9,9,1]),
      new Uint8ClampedArray([1,9,9,9,7,7,9,9,9,9,9,9,7,9,9,7,7,7,7,7,7,7,7,7,7,7,9,7,9,9,9,1]),
      new Uint8ClampedArray([1,9,9,9,7,7,9,9,9,9,9,9,7,9,9,7,7,7,7,7,7,7,7,7,7,9,7,9,7,9,9,1]),
      new Uint8ClampedArray([1,9,9,9,7,7,9,9,9,9,9,9,7,9,9,7,7,7,7,7,7,7,7,7,7,7,9,7,9,9,9,1]),
      new Uint8ClampedArray([1,9,9,9,7,7,9,9,9,9,9,9,7,9,9,7,7,7,7,7,7,7,7,7,7,9,7,9,7,9,9,1]),
      new Uint8ClampedArray([1,9,9,9,7,7,9,9,9,9,9,9,7,9,9,7,7,7,7,7,7,7,7,7,7,7,9,7,9,9,9,1]),
      new Uint8ClampedArray([1,9,9,9,7,7,9,9,9,9,9,9,7,9,9,7,7,7,7,7,7,7,7,7,7,9,7,9,7,9,9,1]),
      new Uint8ClampedArray([1,9,9,9,7,7,9,9,9,9,9,9,7,9,9,7,7,7,7,7,7,7,7,7,7,7,9,7,9,9,9,1]),
      new Uint8ClampedArray([1,9,9,9,7,7,9,9,9,9,9,9,7,9,9,7,7,7,7,7,7,7,7,7,7,9,7,9,7,9,9,1]),
      new Uint8ClampedArray([1,9,9,9,7,7,9,9,9,9,9,9,7,9,9,7,7,7,7,7,7,7,7,7,7,7,9,7,9,9,9,1]),
      new Uint8ClampedArray([1,9,9,9,7,7,9,9,9,9,9,9,7,9,9,7,7,7,7,7,7,7,7,7,7,9,7,9,7,9,9,1]),
      new Uint8ClampedArray([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]),
      new Uint8ClampedArray([0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0]),
    ].concat(new Array(13 * (16 / 2)).fill(undefined).reduce((acc: Uint8ClampedArray[]) => {
      acc.push(new Uint8ClampedArray([0,0,1,9,9,9,7,7,9,9,9,9,9,7,9,9,7,7,7,7,7,7,7,7,9,7,9,9,9,1,0,0]));
      acc.push(new Uint8ClampedArray([0,0,1,9,9,9,7,7,9,9,9,9,9,7,9,9,7,7,7,7,7,7,7,7,7,9,7,9,9,1,0,0]));

      return acc;
    }, [])),
  };

  collidableSides = {
    bottom: false,
    left: true,
    right: true,
    top: true,
  };
  fill: Entity["fill"] = "Pipe";
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
