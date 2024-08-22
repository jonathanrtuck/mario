import { GRID_UNIT_LENGTH } from "@/constants";

import { Entity } from "./Entity";

export class Mario extends Entity {
  static patterns: typeof Entity.patterns = {
    // prettier-ignore
    MarioSmallStandingRight: [
      new Uint8ClampedArray([ 0, 0, 0,11,11,11,11,11, 0, 0, 0, 0]),
      new Uint8ClampedArray([ 0, 0,11,11,11,11,11,11,11,11,11, 0]),
      new Uint8ClampedArray([ 0, 0, 8, 8, 8,10,10, 8,10, 0, 0, 0]),
      new Uint8ClampedArray([ 0, 8,10, 8,10,10,10, 8,10,10,10, 0]),
      new Uint8ClampedArray([ 0, 8,10, 8, 8,10,10,10, 8,10,10,10]),
      new Uint8ClampedArray([ 0, 8, 8,10,10,10,10, 8, 8, 8, 8, 0]),
      new Uint8ClampedArray([ 0, 0, 0,10,10,10,10,10,10,10, 0, 0]),
      new Uint8ClampedArray([ 0, 0, 8, 8,11, 8, 8, 8, 0, 0, 0, 0]),
      new Uint8ClampedArray([ 0, 8, 8, 8,11, 8, 8,11, 8, 8, 8, 0]),
      new Uint8ClampedArray([ 8, 8, 8, 8,11,11,11,11, 8, 8, 8, 8]),
      new Uint8ClampedArray([10,10, 8,11,10,11,11,10,11, 8,10,10]),
      new Uint8ClampedArray([10,10,10,11,11,11,11,11,11,10,10,10]),
      new Uint8ClampedArray([10,10,11,11,11,11,11,11,11,11,10,10]),
      new Uint8ClampedArray([ 0, 0,11,11,11, 0, 0,11,11,11, 0, 0]),
      new Uint8ClampedArray([ 0, 8, 8, 8, 0, 0, 0, 0, 8, 8, 8, 0]),
      new Uint8ClampedArray([ 8, 8, 8, 8, 0, 0, 0, 0, 8, 8, 8, 8]),
    ],
  };

  acceleration = {
    x: 8,
    y: 15.3,
    z: 0,
  };
  collidableSides = {
    bottom: true,
    left: true,
    right: true,
    top: true,
  };
  deceleration = {
    x: 6,
    y: 0,
    z: 0,
  };
  length;
  mass = 70;
  position;
  size: "small" | "large";
  velocity = {
    x: 0,
    y: 0,
    z: 0,
  };
  vmax = {
    x: 3.6,
    y: 19.6,
    z: 0,
  };

  get fill() {
    switch (this.size) {
      case "large":
        return 11;
      default:
        return "MarioSmallStandingRight";
    }
  }
  set fill(value) {}

  constructor(gridX: number, gridY: number, size: Mario["size"]) {
    super();

    this.length = {
      x: GRID_UNIT_LENGTH * 0.75,
      y: GRID_UNIT_LENGTH * (size === "large" ? 2 : 1),
      z: 0,
    };
    this.position = {
      x: GRID_UNIT_LENGTH * gridX,
      y: GRID_UNIT_LENGTH * gridY,
      z: 0,
    };
    this.size = size;
  }
}
