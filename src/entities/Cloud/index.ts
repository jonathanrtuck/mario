import { EntityConfiguration } from "@/types";

import { Cloud } from "./Cloud";
import { CloudDefs } from "./CloudDefs";

export const ENTITY_CLOUD: EntityConfiguration = {
  Component: Cloud,
  Defs: CloudDefs,
  type: "Cloud",
};
