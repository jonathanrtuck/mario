import { GRID_DIMENSION, KEYS } from "@/constants";
import { Entity, Key, State, Velocity } from "@/types";

type Collision = Entity | null | true;

type Collisions = {
  bottom: Collision;
  left: Collision;
  right: Collision;
  top: Collision;
};

const clamp = (min: number, num: number, max: number): number =>
  num <= min ? min : num >= max ? max : num;

// @todo handle collisions with same entity on multiple sides? (e.g. diagonal overlap)
const getCollisions =
  ({ entities, viewport }: State) =>
  (entity: Entity): Collisions => {
    const collisions: Collisions = {
      bottom: null,
      left: null,
      right: null,
      top: null,
    };

    for (let i = 0; i !== entities.length; i++) {
      const otherEntity = entities[i];

      // cannot collide with itself
      if (entity.id === otherEntity.id) {
        continue;
      }

      // no depth overlap
      if (entity.position.z !== otherEntity.position.z) {
        continue;
      }

      const left = entity.position.x;
      const right = entity.position.x + entity.dimensions.x;
      const otherRight = otherEntity.position.x + otherEntity.dimensions.x;

      if (left > otherRight || right < left) {
        continue;
      }

      const bottom = entity.position.y;
      const top = entity.position.y + entity.dimensions.y;
      const otherBottom = otherEntity.position.y;
      const otherTop = otherEntity.position.y + otherEntity.dimensions.y;

      if (bottom > otherTop || top < otherBottom) {
        continue;
      }

      const otherLeft = otherEntity.position.x;

      if (
        bottom <= otherTop &&
        bottom > otherTop - GRID_DIMENSION / 2 &&
        bottom > otherBottom &&
        ((left > otherLeft && left < otherRight) ||
          (right > otherLeft && right < otherRight))
      ) {
        collisions.bottom = otherEntity;
      }

      if (
        left <= otherRight &&
        left > otherRight - GRID_DIMENSION / 2 &&
        left > otherLeft &&
        ((bottom > otherBottom && bottom < otherTop) ||
          (top > otherBottom && top < otherTop))
      ) {
        collisions.left = otherEntity;
      }

      if (
        right >= otherLeft &&
        right < otherLeft + GRID_DIMENSION / 2 &&
        right < otherRight &&
        ((bottom > otherBottom && bottom < otherTop) ||
          (top > otherBottom && top < otherTop))
      ) {
        collisions.right = otherEntity;
      }

      if (
        top >= otherBottom &&
        top < otherBottom + GRID_DIMENSION / 2 &&
        top < otherTop &&
        ((left > otherLeft && left < otherRight) ||
          (right > otherLeft && right < otherRight))
      ) {
        collisions.top = otherEntity;
      }
    }

    // mario can also collide with viewport edges
    if (entity.type === "Mario") {
      if (!collisions.left && entity.position.x <= viewport.position.x) {
        collisions.left = true;
      }

      if (
        !collisions.right &&
        entity.position.x + entity.dimensions.x >=
          viewport.position.x + viewport.dimensions.x
      ) {
        collisions.right = true;
      }
    }

    return collisions;
  };

const getPosition =
  (state: State, seconds: number) =>
  (entity: Entity, collisions: Collisions): Entity["position"] => {
    let x = entity.position.x;
    let y = entity.position.y;

    if ("velocity" in entity) {
      x += entity.velocity.x * seconds;
      y += entity.velocity.y * seconds;
    }

    if (collisions.bottom) {
      y = Math.max(
        y,
        collisions.bottom === true
          ? state.viewport.position.y
          : collisions.bottom.position.y + collisions.bottom.dimensions.y
      );
    }

    if (collisions.left) {
      x = Math.max(
        x,
        collisions.left === true
          ? state.viewport.position.x
          : collisions.left.position.x + collisions.left.dimensions.x
      );
    }

    if (collisions.right) {
      x = Math.min(
        x,
        collisions.right === true
          ? state.viewport.position.x +
              state.viewport.dimensions.x -
              entity.dimensions.x
          : collisions.right.position.x - entity.dimensions.x
      );
    }

    if (collisions.top) {
      y = Math.min(
        y,
        collisions.top === true
          ? state.viewport.position.y +
              state.viewport.dimensions.y -
              entity.dimensions.y
          : collisions.top.position.y - entity.dimensions.y
      );
    }

    return { x, y, z: entity.position.z };
  };

const getVelocity =
  (state: State, seconds: number, inputs: State["inputs"]) =>
  (entity: Entity, collisions: Collisions): Velocity | undefined => {
    if ("velocity" in entity) {
      let x = entity.velocity.x;
      let y = entity.velocity.y;

      if (collisions.bottom) {
        if (y < 0) {
          y = 0;
        }
        // universal gravitation only affects entities with mass, but consider entities with infinite mass unmovable
      } else if (entity.mass !== 0 && entity.mass !== Infinity) {
        x += state.universe.acceleration.x * seconds;
        y += state.universe.acceleration.y * seconds;
      }

      if (collisions.left) {
        if (x < 0) {
          x = 0;
        }
      }

      if (collisions.right) {
        if (x > 0) {
          x = 0;
        }
      }

      if (collisions.top) {
        if (y > 0) {
          y = 0;
        }
      }

      if (entity.type === "Mario") {
        console.debug(collisions);
        // if on the ground
        if (collisions.bottom) {
          const friction = entity.friction; // @todo combined with colliding entity's friction

          // @todo use friction
          // decelerate if moving left but no longer holding left
          if (x < 0 && !state.inputs.get("left") && "deceleration" in entity) {
            x += Math.min(entity.deceleration.x * seconds, -x);
          }
          // @todo use friction
          // decelerate if moving right but no longer holding right
          if (x > 0 && !state.inputs.get("right") && "deceleration" in entity) {
            x -= Math.min(entity.deceleration.x * seconds, x);
          }

          // @todo use friction?
          // accelerate if holding left
          if (
            !collisions.left &&
            inputs.get("left") &&
            !inputs.get("right") &&
            "acceleration" in entity
          ) {
            x -= entity.acceleration.x * seconds * (inputs.get("a") ? 2 : 1);
          }
          // @todo use friction?
          // accelerate if holding right
          if (
            !collisions.right &&
            inputs.get("right") &&
            !inputs.get("left") &&
            "acceleration" in entity
          ) {
            x += entity.acceleration.x * seconds * (inputs.get("a") ? 2 : 1);
          }

          // if pressed b (jump) since last frame
          if (
            inputs.get("b") &&
            !state.inputs.get("b") &&
            "acceleration" in entity
          ) {
            y += entity.acceleration.y;
          }
        }
      }

      if ("vmax" in entity) {
        const vmaxX = entity.vmax?.x * (inputs.get("a") ? 2 : 1);
        const vmaxY = entity.vmax?.y;

        x = clamp(-vmaxX, x, vmaxX);
        y = clamp(-vmaxY, y, vmaxY);
      }

      return { x, y, z: entity.velocity.z };
    }

    return undefined;
  };

export const getState = (
  prevState: State,
  duration: number,
  keys: Set<Key>
): State => {
  const seconds = 1 / (1000 / duration);

  const entities: State["entities"] = new Array(prevState.entities.length);
  const inputs: State["inputs"] = new Map();

  let viewport = prevState.viewport;

  for (let i = 0; i !== KEYS.length; i++) {
    const key = KEYS[i];

    inputs.set(key, keys.has(key));
  }

  const getCollisionsByEntity = getCollisions(prevState);
  const getPositionByEntity = getPosition(prevState, seconds);
  const getVelocityByEntity = getVelocity(prevState, seconds, inputs);

  for (let i = 0; i !== prevState.entities.length; i++) {
    const entity = prevState.entities[i];

    if ("velocity" in entity) {
      const collisions = getCollisionsByEntity(entity);
      const position = getPositionByEntity(entity, collisions);
      const velocity = getVelocityByEntity(entity, collisions)!;

      if (entity.type === "Mario") {
        const entityCenterX = position.x + entity.dimensions.x / 2;
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
      }

      entities[i] = {
        ...entity,
        position,
        velocity,
      };
    } else {
      entities[i] = entity;
    }
  }

  return {
    ...prevState,
    entities,
    inputs,
    viewport,
  };
};
