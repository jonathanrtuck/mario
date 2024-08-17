import { useContext } from "react";

import { PIXEL_DIMENSION } from "@/constants";
import { StateContext } from "@/contexts";
import { EntityComponent } from "@/types";

import styles from "./Protagonist.module.css";

export const Protagonist: EntityComponent = ({ dimensions, position }) => {
  const { universe } = useContext(StateContext);

  const x = position.x;
  const y = universe.dimensions.y - position.y - dimensions.y;

  return (
    <g className={styles.root}>
      <rect
        fill="rgb(231, 62, 37)"
        height={PIXEL_DIMENSION * 2}
        width={dimensions.x}
        x={x + PIXEL_DIMENSION * 0}
        y={y + PIXEL_DIMENSION * 0}
      />
      <rect
        fill="rgb(249, 161, 75)"
        height={PIXEL_DIMENSION * 5}
        width={dimensions.x}
        x={x + PIXEL_DIMENSION * 0}
        y={y + PIXEL_DIMENSION * 2}
      />
      <rect
        fill="rgb(155, 114, 42)"
        height={PIXEL_DIMENSION * 2}
        width={dimensions.x}
        x={x + PIXEL_DIMENSION * 0}
        y={y + PIXEL_DIMENSION * 7}
      />
      <rect
        fill="rgb(231, 62, 37)"
        height={PIXEL_DIMENSION * 1}
        width={dimensions.x}
        x={x + PIXEL_DIMENSION * 0}
        y={y + PIXEL_DIMENSION * 9}
      />
      <rect
        fill="rgb(249, 161, 75)"
        height={PIXEL_DIMENSION * 1}
        width={dimensions.x}
        x={x + PIXEL_DIMENSION * 0}
        y={y + PIXEL_DIMENSION * 10}
      />
      <rect
        fill="rgb(231, 62, 37)"
        height={PIXEL_DIMENSION * 3}
        width={dimensions.x}
        x={x + PIXEL_DIMENSION * 0}
        y={y + PIXEL_DIMENSION * 11}
      />
      <rect
        fill="rgb(155, 114, 42)"
        height={PIXEL_DIMENSION * 2}
        width={dimensions.x}
        x={x + PIXEL_DIMENSION * 0}
        y={y + PIXEL_DIMENSION * 14}
      />
    </g>
  );
};

Protagonist.displayName = "Protagonist";
