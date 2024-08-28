import { FunctionComponent, useEffect, useRef } from "react";

import { Game } from "@/classes";

export const NES: FunctionComponent = () => {
  const rootRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const rootElement = rootRef.current;

    if (rootElement) {
      const game = new Game(rootElement);

      const onFocus = ({ relatedTarget, target }: FocusEvent) => {
        if (
          !relatedTarget ||
          !(target as HTMLCanvasElement).contains(relatedTarget as HTMLElement)
        ) {
          game.unpause();
        }
      };
      const onBlur = ({ relatedTarget }: FocusEvent) => {
        if (!relatedTarget) {
          game.pause();
        }
      };

      game.start();

      rootElement.addEventListener("focus", onFocus);
      rootElement.addEventListener("blur", onBlur);

      return () => {
        rootElement.removeEventListener("focus", onFocus);
        rootElement.removeEventListener("blur", onBlur);

        game.stop();
      };
    }
  }, []);

  return (
    <canvas
      ref={rootRef}
      style={{
        outline: 0,
      }}
      tabIndex={-1}
    />
  );
};

NES.displayName = "NES";
