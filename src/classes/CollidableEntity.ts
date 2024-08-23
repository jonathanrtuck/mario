import { Length, Side } from "@/types";

export abstract class CollidableEntity {
  abstract collidableOffset: Length;
  abstract collidableSides: Record<Side, boolean>;
}
