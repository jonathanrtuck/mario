import { FunctionComponent, useEffect, useRef } from "react";

import { Game as GameClass } from "@/classes";

import styles from "./Game.module.css";

export const Game: FunctionComponent = () => {
  const rootRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const rootElement = rootRef.current;

    if (rootElement) {
      const game = new GameClass(rootElement);

      game.init();

      const onFocus = ({ relatedTarget, target }: FocusEvent) => {
        if (
          !relatedTarget ||
          !(target as HTMLCanvasElement).contains(relatedTarget as HTMLElement)
        ) {
          game.unpause();
        }
      };
      const onBlur = ({ relatedTarget, target }: FocusEvent) => {
        if (!relatedTarget) {
          game.pause();
        }
      };

      rootElement.addEventListener("focus", onFocus);
      rootElement.addEventListener("blur", onBlur);

      return () => {
        game.destroy();

        rootElement.removeEventListener("focus", onFocus);
        rootElement.removeEventListener("blur", onBlur);
      };
    }
  }, []);

  return <canvas className={styles.root} ref={rootRef} tabIndex={-1} />;
};

Game.displayName = "Game";
