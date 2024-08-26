import { GRID_UNIT_LENGTH, PIXEL_LENGTH } from "@/constants";
import { Bitmap } from "@/types";

import { Entity } from "./Entity";
import { MovableEntity } from "./MovableEntity";

// prettier-ignore
const MarioSmallJumpingRight: Bitmap = [
  new Uint8ClampedArray([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,10,10,10]),
  new Uint8ClampedArray([ 0, 0, 0, 0, 0, 0,11,11,11,11,11, 0, 0,10,10,10]),
  new Uint8ClampedArray([ 0, 0, 0, 0, 0,11,11,11,11,11,11,11,11,11,10,10]),
  new Uint8ClampedArray([ 0, 0, 0, 0, 0, 8, 8, 8,10,10, 8,10, 0, 8, 8, 8]),
  new Uint8ClampedArray([ 0, 0, 0, 0, 8,10, 8,10,10,10, 8,10,10, 8, 8, 8]),
  new Uint8ClampedArray([ 0, 0, 0, 0, 8,10, 8, 8,10,10,10, 8,10,10,10, 8]),
  new Uint8ClampedArray([ 0, 0, 0, 0, 8, 8,10,10,10,10, 8, 8, 8, 8, 8, 0]),
  new Uint8ClampedArray([ 0, 0, 0, 0, 0, 0,10,10,10,10,10,10,10, 8, 0, 0]),
  new Uint8ClampedArray([ 0, 0, 8, 8, 8, 8, 8,11, 8, 8, 8,11, 8, 0, 0, 0]),
  new Uint8ClampedArray([ 0, 8, 8, 8, 8, 8, 8, 8,11, 8, 8, 8,11, 0, 0, 8]),
  new Uint8ClampedArray([10,10, 8, 8, 8, 8, 8, 8,11,11,11,11,11, 0, 0, 8]),
  new Uint8ClampedArray([10,10,10, 0,11,11, 8,11,11,10,11,11,10,11, 8, 8]),
  new Uint8ClampedArray([ 0,10, 0, 8,11,11,11,11,11,11,11,11,11,11, 8, 8]),
  new Uint8ClampedArray([ 0, 0, 8, 8, 8,11,11,11,11,11,11,11,11,11, 8, 8]),
  new Uint8ClampedArray([ 0, 8, 8, 8,11,11,11,11,11,11,11, 0, 0, 0, 0, 0]),
  new Uint8ClampedArray([ 0, 8, 0, 0,11,11,11,11, 0, 0, 0, 0, 0, 0, 0, 0]),
];
// prettier-ignore
const MarioSmallStandingRight: Bitmap = [
  new Uint8ClampedArray([ 0, 0, 0, 0, 0,11,11,11,11,11, 0, 0, 0, 0, 0, 0]),
  new Uint8ClampedArray([ 0, 0, 0, 0,11,11,11,11,11,11,11,11,11, 0, 0, 0]),
  new Uint8ClampedArray([ 0, 0, 0, 0, 8, 8, 8,10,10, 8,10, 0, 0, 0, 0, 0]),
  new Uint8ClampedArray([ 0, 0, 0, 8,10, 8,10,10,10, 8,10,10,10, 0, 0, 0]),
  new Uint8ClampedArray([ 0, 0, 0, 8,10, 8, 8,10,10,10, 8,10,10,10, 0, 0]),
  new Uint8ClampedArray([ 0, 0, 0, 8, 8,10,10,10,10, 8, 8, 8, 8, 0, 0, 0]),
  new Uint8ClampedArray([ 0, 0, 0, 0, 0,10,10,10,10,10,10,10, 0, 0, 0, 0]),
  new Uint8ClampedArray([ 0, 0, 0, 0, 8, 8,11, 8, 8, 8, 0, 0, 0, 0, 0, 0]),
  new Uint8ClampedArray([ 0, 0, 0, 8, 8, 8,11, 8, 8,11, 8, 8, 8, 0, 0, 0]),
  new Uint8ClampedArray([ 0, 0, 8, 8, 8, 8,11,11,11,11, 8, 8, 8, 8, 0, 0]),
  new Uint8ClampedArray([ 0, 0,10,10, 8,11,10,11,11,10,11, 8,10,10, 0, 0]),
  new Uint8ClampedArray([ 0, 0,10,10,10,11,11,11,11,11,11,10,10,10, 0, 0]),
  new Uint8ClampedArray([ 0, 0,10,10,11,11,11,11,11,11,11,11,10,10, 0, 0]),
  new Uint8ClampedArray([ 0, 0, 0, 0,11,11,11, 0, 0,11,11,11, 0, 0, 0, 0]),
  new Uint8ClampedArray([ 0, 0, 0, 8, 8, 8, 0, 0, 0, 0, 8, 8, 8, 0, 0, 0]),
  new Uint8ClampedArray([ 0, 0, 8, 8, 8, 8, 0, 0, 0, 0, 8, 8, 8, 8, 0, 0]),
];

export class Mario extends MovableEntity {
  static patterns: typeof Entity.patterns = {
    MarioSmallJumpingLeft: MarioSmallJumpingRight.map((row) =>
      row.toReversed()
    ),
    MarioSmallJumpingRight,
    MarioSmallStandingLeft: MarioSmallStandingRight.map((row) =>
      row.toReversed()
    ),
    MarioSmallStandingRight,
  };

  acceleration = {
    x: 8,
    y: 8,
    z: 0,
  };
  collidableOffset = {
    x: PIXEL_LENGTH * 2,
    y: 0,
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
  elasticity = 0;
  isFacingLeft = false;
  isInputtingJump = false;
  isJumping = false;
  isRunning = false;
  length;
  mass = 70;
  position;
  size: "small" | "large";
  velocity = {
    x: 0,
    y: 0,
    z: 0,
  };

  get fill() {
    switch (this.size) {
      case "large":
        return 11;
      case "small":
        return this.isFacingLeft
          ? this.isJumping
            ? "MarioSmallJumpingLeft"
            : "MarioSmallStandingLeft"
          : this.isJumping
          ? "MarioSmallJumpingRight"
          : "MarioSmallStandingRight";
    }
  }
  set fill(value) {}

  get vmax() {
    return {
      x: 4 * (this.isRunning ? 2 : 1),
      y: 19.6,
      z: 0,
    };
  }
  set vmax(value) {}

  constructor(gridX: number, gridY: number, size: Mario["size"]) {
    super();

    this.length = {
      x: GRID_UNIT_LENGTH * 1,
      y: GRID_UNIT_LENGTH * (size === "large" ? 2 : 1),
      z: 1,
    };
    this.position = {
      x: GRID_UNIT_LENGTH * gridX,
      y: GRID_UNIT_LENGTH * gridY,
      z: 0,
    };
    this.size = size;
  }
}
