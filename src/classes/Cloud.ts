import { GRID_UNIT_LENGTH } from "@/constants";

import { Entity } from "./Entity";

export class Cloud extends Entity {
  static patterns: typeof Entity.patterns = {
    // prettier-ignore
    CloudLarge: [
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,2,2,2,2,1,0,0,0,0,0,0,0,1,1,2,2,2,2,2,2,1,0,0,0,0,0,0,0,1,1,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,1,0,1,0,0,0,0,1,2,2,2,2,2,2,2,2,1,0,1,0,0,0,0,1,2,2,2,2,2,2,2,2,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,1,2,1,0,0,0,1,2,2,2,2,2,2,2,2,2,1,2,1,0,0,0,1,2,2,2,2,2,2,2,2,2,1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,6,2,2,2,2,2,1,0,0,1,2,2,2,2,2,2,6,2,2,2,2,2,1,0,0,1,2,2,2,2,2,2,6,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,6,6,2,2,2,6,2,2,2,2,1,0,1,2,2,2,6,6,2,2,2,6,2,2,2,2,1,0,1,2,2,2,6,6,2,2,2,6,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,6,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,6,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,6,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,1,2,1,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,1,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,1,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,1,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,1,2,2,6,2,2,2,2,2,2,2,2,2,2,2,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,6,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,1,2,2,6,2,2,6,2,2,2,2,2,2,6,2,2,2,2,2,2,2,2,6,2,2,2,2,2,2,6,2,2,2,2,2,2,2,2,6,2,2,2,2,2,2,6,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,6,6,6,6,2,2,2,6,6,6,6,2,2,2,2,6,2,6,6,6,2,2,2,6,6,6,6,2,2,2,2,6,2,6,6,6,2,2,2,6,6,6,6,2,2,2,2,6,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,6,6,6,6,6,6,2,6,6,6,6,6,2,2,2,2,6,6,6,6,6,6,2,6,6,6,6,6,2,2,2,2,6,6,6,6,6,6,2,6,6,6,6,6,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,2,2,2,2,6,6,2,2,2,2,6,6,6,2,2,2,2,2,2,2,6,6,2,2,2,2,6,6,6,2,2,2,2,2,2,2,6,6,2,2,2,2,6,6,6,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1,2,2,1,1,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,2,1,0,1,1,2,2,2,2,1,1,0,1,1,2,2,2,1,0,1,1,2,2,2,2,1,1,0,1,1,2,2,2,1,0,1,1,2,2,2,2,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
    ],
    // prettier-ignore
    CloudMedium: [
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,2,2,2,2,1,0,0,0,0,0,0,0,1,1,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,1,0,1,0,0,0,0,1,2,2,2,2,2,2,2,2,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,1,2,1,0,0,0,1,2,2,2,2,2,2,2,2,2,1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,6,2,2,2,2,2,1,0,0,1,2,2,2,2,2,2,6,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,6,6,2,2,2,6,2,2,2,2,1,0,1,2,2,2,6,6,2,2,2,6,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,6,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,6,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,1,2,1,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,1,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,1,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,1,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,1,2,2,6,2,2,2,2,2,2,2,2,2,2,2,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,6,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,1,2,2,6,2,2,6,2,2,2,2,2,2,6,2,2,2,2,2,2,2,2,6,2,2,2,2,2,2,6,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,6,6,6,6,2,2,2,6,6,6,6,2,2,2,2,6,2,6,6,6,2,2,2,6,6,6,6,2,2,2,2,6,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,6,6,6,6,6,6,2,6,6,6,6,6,2,2,2,2,6,6,6,6,6,6,2,6,6,6,6,6,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,2,2,2,2,6,6,2,2,2,2,6,6,6,2,2,2,2,2,2,2,6,6,2,2,2,2,6,6,6,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1,2,2,1,1,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,2,1,0,1,1,2,2,2,2,1,1,0,1,1,2,2,2,1,0,1,1,2,2,2,2,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
    ],
    // prettier-ignore
    CloudSmall: [
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,6,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,6,6,2,2,2,6,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,6,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,1,2,1,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,1,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,1,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,1,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,1,2,2,6,2,2,2,2,2,2,2,2,2,2,2,6,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,1,2,2,6,2,2,6,2,2,2,2,2,2,6,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,6,6,6,6,2,2,2,6,6,6,6,2,2,2,2,6,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,6,6,6,6,6,6,2,6,6,6,6,6,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,2,2,2,2,6,6,2,2,2,2,6,6,6,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1,2,2,1,1,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,2,1,0,1,1,2,2,2,2,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
      new Uint8ClampedArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
    ],
  };

  mass = 0;
  position;
  size: "small" | "medium" | "large";

  get fill(): Entity["fill"] {
    switch (this.size) {
      case "large":
        return "CloudLarge";
      case "medium":
        return "CloudMedium";
      case "small":
        return "CloudSmall";
      default:
        return 2;
    }
  }
  set fill(value) {}

  get length() {
    return {
      x:
        GRID_UNIT_LENGTH *
        (this.size === "large" ? 5 : this.size === "medium" ? 4 : 3),
      y: GRID_UNIT_LENGTH * 2,
      z: 0,
    };
  }
  set length(value) {}

  constructor(gridX: number, gridY: number, size: Cloud["size"]) {
    super();

    this.position = {
      x: GRID_UNIT_LENGTH * gridX,
      y: GRID_UNIT_LENGTH * gridY,
      z: -4,
    };
    this.size = size;
  }
}
