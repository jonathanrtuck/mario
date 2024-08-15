import { FunctionComponent } from "react";

import { StateContext } from "@/contexts";
import * as entities from "@/entities";
import { useState } from "@/hooks";

import styles from "./Game.module.css";

export const Game: FunctionComponent = () => {
  const state = useState();

  return (
    <StateContext.Provider value={state}>
      <svg
        className={styles.root}
        preserveAspectRatio="xMidYMid meet"
        style={{
          aspectRatio: `${state.viewport.width} / ${state.viewport.height}`,
        }}
        version="1.1"
        viewBox={`${state.minX} ${state.minY} ${state.viewport.width} ${state.viewport.height}`}
        xmlns="http://www.w3.org/2000/svg">
        {state.entities.map((entity) => {
          const Component = entities[entity.type];

          return <Component key={entity.id} {...entity} />;
        })}
      </svg>
    </StateContext.Provider>
  );
};

Game.displayName = "Game";
