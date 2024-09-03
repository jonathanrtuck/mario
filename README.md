# mario

## keys

| Key(s)            | Action               |
| ----------------- | -------------------- |
| `Shift`, `z`      | run / throw fireball |
| `Spacebar`, `x`   | jump                 |
| `a`, `LeftArrow`  | move left            |
| `d`, `RightArrow` | move right           |
| `s`, `DownArrow`  | crouch               |

## physics

An (movable) entity should only update its `acceleration` to affect its movement: the `Game` will use that to update its `velocity` and `position` accordingly.

Acceleration is only applied (converted to change in velocity) once per update (`TIME_UNIT_LENGTH`).

## collision detection

On each update, determine where each rendered entity should be now based on its previous updated position and velocity. Then check if any collisions occurred. If so, determine which collision happened the earliest, using it to set the actual position and velocity of the corresponding entity(s) and all other rendered entities at that moment in time. Then calculate each entity's new expected positions now, check for collisions again, and handle the earliest found again. Repeat this until there are no longer any collisions found and the positions and velocities of all rendered entities have be updated to reflect the current moment.

### notes

- A collision must involve overlap, not just touching. Otherwise, the entity's velocity will cause an overlap on next update, and it will be handled then.
- This implementation assumes multiple collisions between two entities cannot occur simultaneously (e.g. mario hits the left and bottom of a brick at the same time when jumping into it diagonally).
  - It is assumed that one of the collisions must have occurred earlier, so only that one is handled in the update.
  - If the collisions do actually occur at the exact same moment somehow, which one the code will choose to handle is not defined.
    - The collisions are unstably sorted by time.
- This implemention does not account for the following scenario:
  - Say there are 16ms between updates. If, during an update, it is discovered that a movable entity (A) fell onto a collidable entity (B) after 1ms, its Y-velocity is set to and stays at `0` unto gravity is applied at the next update. Thus, if 1ms later entity B's position changes, entity A will continue to hang in mid-air for the remaining 14ms of the update cycle.
  - This can only happen if a movable entity collides with and remins against a collidable entity that is susequently collided with and moved by another movable entity. However, I do not believe this scenario can happen in this game, because Mario is the only movable entity that remains against a collidable entity, and there are no other entities that can cause a collidable entity to move.
- This implemention could be modified to handle 3D collisions (entities with velocity in the Z dimension).

## todo

- question block bitmaps/animation
- mario bitmaps/animation
- enemies
- items
  - coin
  - mushroom
  - flower
  - star
- underworld
- text at the top
  - _Score_, _Coins_, _World_, ~~_Time_~~, _Lives_
