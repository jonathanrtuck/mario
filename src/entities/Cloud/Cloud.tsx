import { useContext } from "react";

import { PIXEL_DIMENSION } from "@/constants";
import { StateContext } from "@/contexts";
import { EntityComponent } from "@/types";

export const Cloud: EntityComponent = ({ dimensions, id, position }) => {
  const { universe } = useContext(StateContext);

  const x = position.x;
  const y = universe.dimensions.y - position.y - dimensions.y;

  const variation = "small"; // @todo

  return (
    <g id={id}>
      <rect
        // fill={`url(#Cloud-pattern--${variation})`}
        fill="var(--color-white)"
        height={dimensions.y}
        width={dimensions.x}
        x={x + PIXEL_DIMENSION * 0}
        y={y + PIXEL_DIMENSION * 0}
      />
    </g>
  );
};

Cloud.displayName = "Cloud";
