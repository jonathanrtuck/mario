import { FunctionComponent, useEffect, useRef } from "react";

import { Game as GameClass } from "@/classes";

import styles from "./Game.module.css";

export const Game: FunctionComponent = () => {
  const rootRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (rootRef.current) {
      const game = new GameClass(rootRef.current);

      game.init();

      return () => {
        game.destroy();
      };
    }
  }, []);

  return <canvas className={styles.root} ref={rootRef} tabIndex={-1} />;
};

Game.displayName = "Game";
