# mario

## keys

| Key        | Action               |
| ---------- | -------------------- |
| z          | run / throw fireball |
| x          | jump                 |
| LeftArrow  | move left            |
| RightArrow | move right           |
| DownArrow  | crouch               |

## todo

- determine if mario is in the air
  - for preventing double jumps or the application of running X accelaration
- lose when mario hits y=0
- win when mario hits flag
- move entity logic into entity classes
- mario bitmaps/animation
- game time
  - needed to animate i.e. question blocks
    - so pass to entities?
      - how?
        - entities provide a `render` method?
- enemies
- items
  - coin
  - mushroom
  - flower
  - star
- underworld
- text at the top
  - _Score_, _Coins_, _World_, _Time_, _Lives_
  - font
- a better way of logging fps

## collision detection

A collision must involve overlap, not just touching. Otherwise, the entity's
velocity will cause an overlap on next update, and it will be handled then.

This implemention should handle 3D collisions (entities with velocity in the Z
dimension), but it has not been tested.

### notes

This implemention does not account for the following scenario:

Say there are 16ms between updates. If, during an update, it is discovered that
a movable entity (A) fell onto a collidable entity (B) after 1ms, its Y-velocity
is set to and stays at `0` unto gravity is applied at the next update. Thus, if
1ms later entity B's position changes, entity A will continue to hang in mid-air
for the remaining 14ms of the update cycle.

This can only happen if a movable entity collides with and remins against a
collidable entity that is susequently collided with and moved by another movable
entity. However, I do not believe this scenario can happen in this game, because
Mario is the only movable entity that remains against a collidable entity, and
there are no other entities that can cause a collidable entity to move.
