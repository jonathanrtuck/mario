import { useContext } from "react";

import { PIXEL_DIMENSION } from "@/constants";
import { StateContext } from "@/contexts";
import { EntityComponent } from "@/types";

export const Bush: EntityComponent = ({ dimensions, id, position }) => {
  const { universe } = useContext(StateContext);

  const x = position.x;
  const y = universe.dimensions.y - position.y - dimensions.y;

  const variation = "large"; // @todo

  return (
    <rect
      fill={`url(#Bush-pattern--${variation})`}
      height={dimensions.y}
      id={id}
      width={dimensions.x}
      x={x + PIXEL_DIMENSION * 0}
      y={y + PIXEL_DIMENSION * 0}
    />
  );
};

Bush.displayName = "Bush";
