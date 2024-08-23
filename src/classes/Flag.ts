import { GRID_UNIT_LENGTH } from "@/constants";

import { CollidableEntity } from "./CollidableEntity";
import { Entity } from "./Entity";

export class Flag extends CollidableEntity {
  static patterns: typeof Entity.patterns = {};

  collidableOffset = {
    x: 0, // @todo
    y: 0,
    z: 0,
  };
  collidableSides = {
    bottom: true,
    left: true,
    right: true,
    top: true,
  };
  fill: Entity["fill"] = 9; // @todo
  length = {
    x: GRID_UNIT_LENGTH * 1,
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
