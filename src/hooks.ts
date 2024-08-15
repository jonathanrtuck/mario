import React, { useEffect } from "react";

import { FRAME_DURATION, INITIAL_STATE, KEY_BINDING, KEYS } from "@/constants";
import { getState } from "@/state";
import { Key, State } from "@/types";

export const useState = (): State => {
  const [state, setState] = React.useState<State>(INITIAL_STATE);

  useEffect(() => {
    let animationFrameRequest: ReturnType<typeof requestAnimationFrame>;
    let nextFrameMs: number = Date.now() + FRAME_DURATION;
    const keydowns = new Set<Key>();
    const keyups = new Set<Key>();
    const getNextState = getState(keydowns, keyups);

    const onKeyDown = (e: KeyboardEvent) => {
      for (let i = 0; i !== KEYS.length; i++) {
        const key = KEYS[i];

        if (KEY_BINDING[key].has(e.key)) {
          e.preventDefault();
          keydowns.add(key);
        }
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      for (let i = 0; i !== KEYS.length; i++) {
        const key = KEYS[i];

        if (KEY_BINDING[key].has(e.key)) {
          e.preventDefault();
          keyups.add(key);
        }
      }
    };
    // @recursive
    const tick = () => {
      const frameMs = Date.now();

      if (frameMs >= nextFrameMs) {
        setState(getNextState);

        nextFrameMs = frameMs + FRAME_DURATION;
      }

      animationFrameRequest = requestAnimationFrame(tick);
    };

    animationFrameRequest = requestAnimationFrame(tick);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      cancelAnimationFrame(animationFrameRequest);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return state;
};
