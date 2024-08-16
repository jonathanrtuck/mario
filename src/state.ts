import { KEYS } from "@/constants";
import { Key, State } from "@/types";

const clamp = (min: number, num: number, max: number): number =>
  num <= min ? min : num >= max ? max : num;

export const getState = (
  prevState: State,
  duration: number,
  keys: Set<Key>
): State => {
  const seconds = 1 / (1000 / duration);

  const inputs: State["inputs"] = new Map();
  for (let i = 0; i !== KEYS.length; i++) {
    const key = KEYS[i];

    inputs.set(key, keys.has(key));
  }

  const entities: State["entities"] = new Array(prevState.entities.length);
  for (let i = 0; i !== prevState.entities.length; i++) {
    const entity = prevState.entities[i];

    let positionX = entity.position.x + entity.velocity.x * seconds;
    let positionY = entity.position.y + entity.velocity.y * seconds;
    let velocityX =
      entity.velocity.x + prevState.universe.acceleration.x * seconds;
    let velocityY =
      entity.velocity.y + prevState.universe.acceleration.y * seconds;

    if (entity.type === "Protagonist") {
      // stop if hit edge of universe
      if (positionX <= 0 || positionX >= prevState.universe.dimensions.x) {
        velocityX = 0;
      }

      // @todo use collision detection for this
      // if on the ground
      if (positionY <= 0) {
        const friction = entity.friction; // @todo combined with colliding entity's friction

        velocityY = 0;

        // @todo use friction
        // decelerate if moving left but no longer holding left
        if (velocityX < 0 && !inputs.get("left")) {
          velocityX += Math.min(entity.deceleration.x * seconds, -velocityX);
        }

        // @todo use friction
        // decelerate if moving right but no longer holding right
        if (velocityX > 0 && !inputs.get("right")) {
          velocityX -= Math.min(entity.deceleration.x * seconds, velocityX);
        }

        // @todo use friction?
        // accelerate accordingly if holding left or right
        if (inputs.get("left") !== inputs.get("right")) {
          velocityX +=
            entity.acceleration.x * seconds * (inputs.get("left") ? -1 : 1);
        }

        // if pressed b (jump)
        if (inputs.get("b")) {
          velocityY += entity.acceleration.y;

          // if pressed since last frame
          if (!prevState.inputs.get("b")) {
            // convert some horizontal velocity to additional vertical velocity
            if (velocityX < -prevState.universe.acceleration.x * seconds) {
              const delta = -velocityX * friction;

              velocityX += delta;
              velocityY += delta;
            }

            if (velocityX > prevState.universe.acceleration.x * seconds) {
              const delta = velocityX * friction;

              velocityX -= delta;
              velocityY += delta;
            }
          }
        }
      }
    }

    entities[i] = {
      ...entity,
      position: {
        ...entity.position,
        x: clamp(0, positionX, prevState.universe.dimensions.x),
        y: clamp(0, positionY, prevState.universe.dimensions.y),
      },
      velocity: {
        ...entity.velocity,
        x: clamp(-entity.vmax.x, velocityX, entity.vmax.x),
        y: clamp(-entity.vmax.y, velocityY, entity.vmax.y),
      },
    };
  }

  return {
    ...prevState,
    entities,
    inputs,
  };
};
