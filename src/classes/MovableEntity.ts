import { Acceleration, Velocity } from "@/types";

import { CollidableEntity } from "./CollidableEntity";

export abstract class MovableEntity extends CollidableEntity {
  abstract acceleration: Acceleration;
  abstract deceleration: Acceleration;
  abstract elasticity: number; // coefficient (>= 0 & <= 1)
  abstract velocity: Velocity;
  abstract vmax: Velocity;
}
