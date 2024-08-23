import { Length, Side } from "@/types";

import { Entity } from "./Entity";

export abstract class CollidableEntity extends Entity {
  abstract collidableOffset: Length;
  abstract collidableSides: Record<Side, boolean>;
}
