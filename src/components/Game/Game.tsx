import { FunctionComponent } from "react";

import { StateContext } from "@/contexts";
import * as entityComponents from "@/entities";
import { useState } from "@/hooks";

import styles from "./Game.module.css";

export const Game: FunctionComponent = () => {
  const state = useState();

  const { entities, universe, viewport } = state;

  return (
    <StateContext.Provider value={state}>
      <svg
        className={styles.root}
        preserveAspectRatio="xMidYMid meet"
        style={{
          aspectRatio: `${viewport.dimensions.x} / ${viewport.dimensions.y}`,
        }}
        version="1.1"
        viewBox={`${viewport.position.x} ${
          universe.dimensions.y - viewport.dimensions.y - viewport.position.y
        } ${viewport.dimensions.x} ${viewport.dimensions.y}`}
        xmlns="http://www.w3.org/2000/svg">
        {entities.map(({ type, ...entity }) => {
          const EntityComponent = entityComponents[type];

          return <EntityComponent key={entity.id} {...entity} />;
        })}
      </svg>
    </StateContext.Provider>
  );
};

Game.displayName = "Game";
