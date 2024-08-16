import { KEYS } from "@/constants";
import { Key, State } from "@/types";

const clamp = (num: number, min: number, max: number): number =>
  num <= min ? min : num >= max ? max : num;

export const getState =
  (keydowns: Set<Key>, keyups: Set<Key>) =>
  (prevState: State): State => {
    const entities: State["entities"] = [];
    const inputs: State["inputs"] = new Map();

    /*
    for (let i = 0; i !== prevState.entities.length; i++) {
      const entity = prevState.entities[i];

      const isMoving = true; // @todo

      if (isMoving) {
        velocity = {
          ...entity.velocity,
          horizontal: clamp(
            entity.velocity.horizontal - prevState.gravity.horizontal,
            -entity.velocity.maxHorizontal,
            entity.velocity.maxHorizontal
          ),
          vertical: clamp(
            entity.velocity.vertical + prevState.gravity.vertical,
            -entity.velocity.maxVertical,
            entity.velocity.maxVertical
          ),
        };
      }

      entities.push({
        ...entity,
        velocity,
        x: entity.x + velocity.horizontal,
        y: entity.y + velocity.vertical,
      });
    }
		*/

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
      inputs,
    };
  };
