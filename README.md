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
- hidden blocks
  - one-up
  - against castle door
    - disappear when mario collides with it
- underworld
- text at the top
  - _Score_, _Coins_, _World_, _Time_, _Lives_
  - font
- a better way of logging fps
