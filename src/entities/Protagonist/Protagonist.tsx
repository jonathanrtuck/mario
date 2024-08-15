import { useContext } from "react";

import { StateContext } from "@/contexts";
import { Color, EntityComponent } from "@/types";

export const Protagonist: EntityComponent = ({ height, width, x, y }) => {
  const { inputs } = useContext(StateContext);

  const color: Color = inputs.get("a") ? "blue" : "green";

  return (
    <rect
      fill={`var(--color-${color})`}
      height={height}
      width={width}
      x={x - width / 2}
      y={y - height}
    />
  );
};

Protagonist.displayName = "Protagonist";
