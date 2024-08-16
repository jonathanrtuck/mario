import React, { useEffect, useTransition } from "react";

import { FPS, INITIAL_STATE, KEY_BINDING, KEYS } from "@/constants";
import { getState } from "@/state";
import { Key, State } from "@/types";

const FRAME_DURATION = Math.round(1000 / FPS); // ms

export const useState = (): State => {
  const [, startTransition] = useTransition();
  const [state, setState] = React.useState<State>(INITIAL_STATE);

  useEffect(() => {
    let animationFrameRequest: ReturnType<typeof requestAnimationFrame>;
    let nextFrameMs: number = Date.now() + FRAME_DURATION;
    const keydowns = new Set<Key>();
    const keyups = new Set<Key>();

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
      const ms = Date.now();

      if (ms >= nextFrameMs) {
        const duration = ms - nextFrameMs + FRAME_DURATION;

        nextFrameMs = ms + FRAME_DURATION;

        startTransition(() => {
          setState((prevState) => getState(prevState, duration, keydowns));
        });

        for (const key of keyups) {
          keydowns.delete(key);
        }

        keyups.clear();
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
