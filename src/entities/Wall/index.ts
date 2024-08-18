import { EntityConfiguration } from "@/types";

import { Wall } from "./Wall";
import { WallDefs } from "./WallDefs";

export const ENTITY_WALL: EntityConfiguration = {
  Component: Wall,
  Defs: WallDefs,
  type: "Wall",
};
