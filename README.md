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

- flag bitmap
- castle bitmap
- collision detection
  - two entities can only collide with one side at a time
    - i.e. hitting a block diagonally shouldn't push you back the direction you came from
  - custom hitbox position/length
    - needed for flag
  - die when mario hits y=0
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
- hidden blocks
  - one-up
  - against castle door
    - disappear when mario collides with it
- text at the top
  - _Score_, _Coins_, _World_, _Time_, _Lives_
  - font
- a better way of logging fps
- pause game when document loses focus?
