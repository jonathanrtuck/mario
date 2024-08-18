import { FunctionComponent } from "react";

import { Bitmap } from "@/components/Bitmap";
import { GRID_DIMENSION } from "@/constants";
import { Pixels } from "@/types";

// prettier-ignore
const BITMAP: Pixels = [
  [3, 4, 4, 4, 4, 4, 4, 4, 4, 1, 3, 4, 4, 4, 4, 3],
  [4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 1],
  [4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 1],
  [4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 1],
  [4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 1, 3, 3, 3, 1],
  [4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 1, 1, 1, 1, 3],
  [4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 4, 4, 4, 4, 1],
  [4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 1],
  [4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 1],
  [4, 3, 3, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 1],
  [1, 1, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 3, 1],
  [4, 4, 1, 1, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 3, 1],
  [4, 3, 4, 4, 1, 1, 1, 1, 4, 3, 3, 3, 3, 3, 3, 1],
  [4, 3, 3, 3, 4, 4, 4, 1, 4, 3, 3, 3, 3, 3, 3, 1],
  [4, 3, 3, 3, 3, 3, 3, 1, 4, 3, 3, 3, 3, 3, 1, 1],
  [3, 1, 1, 1, 1, 1, 1, 3, 4, 1, 1, 1, 1, 1, 1, 3],
];

export const WallDefs: FunctionComponent = () => (
  <pattern
    height={GRID_DIMENSION}
    id="Wall-pattern"
    patternUnits="userSpaceOnUse"
    width={GRID_DIMENSION}
    x={0}
    y={0}>
    <Bitmap pixels={BITMAP} />
  </pattern>
);

WallDefs.displayName = "WallDefs";
