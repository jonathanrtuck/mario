import { GRID_DIMENSION } from "@/constants";

import { Entity } from "./Entity";

export class Mario extends Entity {
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
  lengths;
  mass = 70;
  position;
  size: "small" | "large";
  type: Entity["type"] = "Mario";
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
    return 11;
  }
  set fill(value) {}

  constructor(gridX: number, gridY: number, size: Mario["size"]) {
    super();

    this.lengths = {
      x: GRID_DIMENSION * 1,
      y: GRID_DIMENSION * (size === "large" ? 2 : 1),
      z: 0,
    };
    this.position = {
      x: GRID_DIMENSION * gridX,
      y: GRID_DIMENSION * gridY,
      z: 0,
    };
    this.size = size;
  }
}
