import { FunctionComponent, useRef } from "react";

import { useGame } from "@/hooks";

import styles from "./Game.module.css";

export const Game: FunctionComponent = () => {
  const rootRef = useRef<HTMLCanvasElement>(null);

  useGame(rootRef);

  return <canvas className={styles.root} ref={rootRef} tabIndex={-1} />;
};

Game.displayName = "Game";
