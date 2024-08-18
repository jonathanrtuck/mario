import { useContext } from "react";

import { StateContext } from "@/contexts";
import { EntityComponent } from "@/types";

export const Wall: EntityComponent = ({ dimensions, id, position }) => {
  const { universe } = useContext(StateContext);

  const x = position.x;
  const y = universe.dimensions.y - position.y - dimensions.y;

  return (
    <rect
      fill="url(#Wall-pattern)"
      height={dimensions.y}
      id={id}
      width={dimensions.x}
      x={x}
      y={y}
    />
  );
};

Wall.displayName = "Wall";
