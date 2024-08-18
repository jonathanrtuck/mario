import { FunctionComponent, ReactElement, useMemo } from "react";

import { StateContext } from "@/contexts";
import * as entityConfigurations from "@/entities";
import { useState } from "@/hooks";

import styles from "./Game.module.css";

export const Game: FunctionComponent = () => {
  // eslint-disable-next-line react/hook-use-state
  const state = useState();

  const { entities, universe, viewport } = state;

  const defs = useMemo<(ReactElement | null)[]>(
    () =>
      Object.values(entityConfigurations).map(({ Defs, type }) =>
        Defs ? <Defs key={type} /> : null
      ),
    []
  );

  return (
    <StateContext.Provider value={state}>
      <svg
        className={styles.root}
        preserveAspectRatio="xMidYMid meet"
        style={{
          aspectRatio: `${viewport.dimensions.x} / ${viewport.dimensions.y}`,
          backgroundColor: `var(--color-${universe.color})`,
        }}
        version="1.1"
        viewBox={`${viewport.position.x} ${
          universe.dimensions.y - viewport.dimensions.y - viewport.position.y
        } ${viewport.dimensions.x} ${viewport.dimensions.y}`}
        xmlns="http://www.w3.org/2000/svg">
        <defs>{defs}</defs>
        {entities.map(({ type, ...entity }) => {
          const EntityComponent = Object.values(entityConfigurations).find(
            (configurtation) => configurtation.type === type
          )?.Component;

          if (!EntityComponent) {
            return null;
          }

          return <EntityComponent key={entity.id} {...entity} />;
        })}
      </svg>
    </StateContext.Provider>
  );
};

Game.displayName = "Game";
