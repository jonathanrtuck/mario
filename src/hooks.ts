import React, { useEffect, useTransition } from "react";

import { INITIAL_STATE, IS_DEBUG_MODE, KEY_BINDING, KEYS } from "@/constants";
import { getState } from "@/state";
import { Key, State } from "@/types";

export const useState = (): State => {
  const [, startTransition] = useTransition();
  const [state, setState] = React.useState<State>(INITIAL_STATE);

  useEffect(() => {
    let animationFrameRequest: ReturnType<typeof requestAnimationFrame>;
    let prevMs: number = Date.now();
    let msSincePrevSecond: number = 0;
    let numFrames: number = 0;
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

      if (IS_DEBUG_MODE) {
        msSincePrevSecond += elapsedMs;
        numFrames += 1;

        if (msSincePrevSecond >= 1000) {
          // eslint-disable-next-line no-console
          console.debug("fps", numFrames);

          msSincePrevSecond = 0;
          numFrames = 0;
        }
      }

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
