import { Acceleration, Velocity } from "@/types";

import { CollidableEntity } from "./CollidableEntity";

export abstract class MovableEntity extends CollidableEntity {
  abstract acceleration: Acceleration;
  abstract deceleration: Acceleration;
  abstract velocity: Velocity;
  abstract vmax: Velocity;
}
