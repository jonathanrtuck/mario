import { KEYS } from "@/constants";
import { Key, State } from "@/types";

export const getState =
  (keydowns: Set<Key>, keyups: Set<Key>) =>
  (prevState: State): State => {
    const inputs: State["inputs"] = new Map();

    for (let i = 0; i !== KEYS.length; i++) {
      const key = KEYS[i];

      inputs.set(
        key,
        keydowns.has(key) ||
          ((prevState.inputs.get(key) ?? false) && !keyups.has(key))
      );
    }

    keydowns.clear();
    keyups.clear();

    return {
      ...prevState,
      index: prevState.index + 1,
      inputs,
    };
  };
