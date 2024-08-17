import { useContext } from "react";

import { StateContext } from "@/contexts";
import { EntityComponent } from "@/types";

import styles from "./Protagonist.module.css";

export const Protagonist: EntityComponent = ({ dimensions, position }) => {
  const { universe } = useContext(StateContext);

  return (
    <rect
      className={styles.root}
      fill="var(--color-green)"
      height={dimensions.y}
      width={dimensions.x}
      x={position.x}
      y={universe.dimensions.y - position.y - dimensions.y}
    />
  );
};

Protagonist.displayName = "Protagonist";
