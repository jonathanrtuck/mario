import { useContext } from "react";

import { StateContext } from "@/contexts";
import { Color, EntityComponent } from "@/types";

import styles from "./Protagonist.module.css";

export const Protagonist: EntityComponent = ({ dimensions, position }) => {
  const { inputs, universe } = useContext(StateContext);

  const color: Color = inputs.get("a") ? "blue" : "green";

  return (
    <rect
      className={styles.root}
      fill={`var(--color-${color})`}
      height={dimensions.y}
      width={dimensions.x}
      x={position.x}
      y={universe.dimensions.y - position.y - dimensions.y}
    />
  );
};

Protagonist.displayName = "Protagonist";
