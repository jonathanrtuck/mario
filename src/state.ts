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

  let viewport = prevState.viewport;

  const entities: State["entities"] = new Array(prevState.entities.length);
  for (let i = 0; i !== prevState.entities.length; i++) {
    const entity = prevState.entities[i];

    let positionX = entity.position.x;
    let positionY = entity.position.y;
    let velocityX = 0;
    let velocityY = 0;

    if ("velocity" in entity) {
      positionX += entity.velocity.x * seconds;
      positionY += entity.velocity.y * seconds;
      velocityX = entity.velocity.x;
      velocityY = entity.velocity.y;
    }

    // universal gravitation only affects entities with mass, but consider entities with infinite mass unmovable
    if (entity.mass !== 0 && entity.mass !== Infinity) {
      velocityX += prevState.universe.acceleration.x * seconds;
      velocityY += prevState.universe.acceleration.y * seconds;
    }

    // only need to check for collision if entity has velocity
    // @todo use collision detection (check against positions of other entities of same position.z)
    let isCollisionBottom = Boolean(false);
    let isCollisionLeft = Boolean(false);
    let isCollisionRight = Boolean(false);
    let isCollisionTop = Boolean(false);

    // character can also collide with viewport edges
    if (entity.type === "Mario") {
      isCollisionBottom = isCollisionBottom || positionY <= 0; // @todo remove this and die if positionY <= 0
      isCollisionLeft = isCollisionLeft || positionX <= viewport.position.x;
      isCollisionRight =
        isCollisionRight ||
        positionX + entity.dimensions.x >=
          viewport.position.x + viewport.dimensions.x;
    }

    if (isCollisionBottom) {
      positionY = 0; // @todo collidingEntity.position.y + collidingEntity.dimensions.y

      if (velocityY < 0) {
        velocityY = 0;
      }
    }
    if (isCollisionTop) {
      positionY = Infinity; // @todo collidingEntity.position.y

      if (velocityY > 0) {
        velocityY = 0;
      }
    }
    if (isCollisionLeft) {
      positionX = viewport.position.x; // @todo collidingEntity.position.x + collidingEntity.dimensions.x

      if (velocityX < 0) {
        velocityX = 0;
      }
    }
    if (isCollisionRight) {
      positionX = prevState.universe.dimensions.x - entity.dimensions.x; // @todo collidingEntity.position.x

      if (velocityX > 0) {
        velocityX = 0;
      }
    }

    if (entity.type === "Mario") {
      const entityCenterX = positionX + entity.dimensions.x / 2;
      const viewportCenterX = viewport.position.x + viewport.dimensions.x / 2;
      const maxViewportPositionX =
        prevState.universe.dimensions.x - viewport.dimensions.x;

      // follow entity with viewport
      if (
        entityCenterX > viewportCenterX &&
        viewport.position.x < maxViewportPositionX
      ) {
        viewport = {
          ...viewport,
          position: {
            ...viewport.position,
            x: clamp(
              viewport.position.x,
              entityCenterX - viewport.dimensions.x / 2,
              maxViewportPositionX
            ),
          },
        };
      }

      // if on the ground
      if (isCollisionBottom) {
        const friction = entity.friction; // @todo combined with colliding entity's friction

        // @todo use friction
        // decelerate if moving left but no longer holding left
        if (velocityX < 0 && !inputs.get("left") && "deceleration" in entity) {
          velocityX += Math.min(entity.deceleration.x * seconds, -velocityX);
        }
        // @todo use friction
        // decelerate if moving right but no longer holding right
        if (velocityX > 0 && !inputs.get("right") && "deceleration" in entity) {
          velocityX -= Math.min(entity.deceleration.x * seconds, velocityX);
        }

        // @todo use friction?
        // accelerate if holding left
        if (
          !isCollisionLeft &&
          inputs.get("left") &&
          !inputs.get("right") &&
          "acceleration" in entity
        ) {
          velocityX -= entity.acceleration.x * seconds;
        }
        // @todo use friction?
        // accelerate if holding right
        if (
          !isCollisionRight &&
          inputs.get("right") &&
          !inputs.get("left") &&
          "acceleration" in entity
        ) {
          velocityX += entity.acceleration.x * seconds;
        }

        // if pressed b (jump) since last frame
        if (
          inputs.get("b") &&
          !prevState.inputs.get("b") &&
          "acceleration" in entity
        ) {
          velocityY += entity.acceleration.y;
        }
      }
    }

    entities[i] = {
      ...entity,
      position: {
        x: positionX,
        y: positionY,
        z: entity.position.z,
      },
      velocity: {
        x:
          "vmax" in entity
            ? clamp(-entity.vmax?.x, velocityX, entity.vmax?.x)
            : velocityX,
        y:
          "vmax" in entity
            ? clamp(-entity.vmax?.y, velocityY, entity.vmax?.y)
            : velocityY,
        z: "velocity" in entity ? entity.velocity.z : 0,
      },
    };
  }

  return {
    ...prevState,
    entities,
    inputs,
    viewport,
  };
};
