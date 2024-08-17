import React, { useEffect, useTransition } from "react";

import { INITIAL_STATE, KEY_BINDING, KEYS } from "@/constants";
import { getState } from "@/state";
import { Key, State } from "@/types";

export const useState = (): State => {
  const [, startTransition] = useTransition();
  const [state, setState] = React.useState<State>(INITIAL_STATE);

  useEffect(() => {
    let animationFrameRequest: ReturnType<typeof requestAnimationFrame>;
    let prevMs: number = Date.now();
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
      const elapsedMs = ms - prevMs;

      startTransition(() => {
        setState((prevState) => getState(prevState, elapsedMs, keydowns));
      });

      for (const key of keyups) {
        keydowns.delete(key);
      }
      keyups.clear();
      prevMs = ms;
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
