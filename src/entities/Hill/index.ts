import { EntityConfiguration } from "@/types";

import { Hill } from "./Hill";
import { HillDefs } from "./HillDefs";

export const ENTITY_HILL: EntityConfiguration = {
  Component: Hill,
  Defs: HillDefs,
  type: "Hill",
};
