import { useContext } from "react";

import { PIXEL_DIMENSION } from "@/constants";
import { StateContext } from "@/contexts";
import { EntityComponent } from "@/types";

export const Mario: EntityComponent = ({ dimensions, id, position }) => {
  const { universe } = useContext(StateContext);

  const x = position.x;
  const y = universe.dimensions.y - position.y - dimensions.y;

  return (
    <g id={id}>
      <rect
        fill="var(--color-red)"
        height={PIXEL_DIMENSION * 2}
        width={dimensions.x}
        x={x + PIXEL_DIMENSION * 0}
        y={y + PIXEL_DIMENSION * 0}
      />
      <rect
        fill="var(--color-yellow-dark)"
        height={PIXEL_DIMENSION * 5}
        width={dimensions.x}
        x={x + PIXEL_DIMENSION * 0}
        y={y + PIXEL_DIMENSION * 2}
      />
      <rect
        fill="var(--color-brown)"
        height={PIXEL_DIMENSION * 2}
        width={dimensions.x}
        x={x + PIXEL_DIMENSION * 0}
        y={y + PIXEL_DIMENSION * 7}
      />
      <rect
        fill="var(--color-red)"
        height={PIXEL_DIMENSION * 1}
        width={dimensions.x}
        x={x + PIXEL_DIMENSION * 0}
        y={y + PIXEL_DIMENSION * 9}
      />
      <rect
        fill="var(--color-yellow-dark)"
        height={PIXEL_DIMENSION * 1}
        width={dimensions.x}
        x={x + PIXEL_DIMENSION * 0}
        y={y + PIXEL_DIMENSION * 10}
      />
      <rect
        fill="var(--color-red)"
        height={PIXEL_DIMENSION * 3}
        width={dimensions.x}
        x={x + PIXEL_DIMENSION * 0}
        y={y + PIXEL_DIMENSION * 11}
      />
      <rect
        fill="var(--color-brown)"
        height={PIXEL_DIMENSION * 2}
        width={dimensions.x}
        x={x + PIXEL_DIMENSION * 0}
        y={y + PIXEL_DIMENSION * 14}
      />
    </g>
  );
};

Mario.displayName = "Mario";
