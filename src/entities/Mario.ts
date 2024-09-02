import {
  COLOR_GREEN_DARK,
  COLOR_RED,
  COLOR_TRANSPARENT,
  COLOR_YELLOW_DARK,
} from "@/constants";
import {
  Acceleration,
  Bitmap,
  Button,
  CollidableEntity,
  MovableEntity,
  MS,
} from "@/types";
import { drawBitmap, gridUnits, pixels } from "@/utils";

const G = COLOR_GREEN_DARK;
const R = COLOR_RED;
const T = COLOR_TRANSPARENT;
const Y = COLOR_YELLOW_DARK;

// prettier-ignore
const JUMPING_RIGHT_SMALL_BITMAP: Bitmap = [
  [T,T,T,T,T,T,T,T,T,T,T,T,T,Y,Y,Y],
  [T,T,T,T,T,T,R,R,R,R,R,T,T,Y,Y,Y],
  [T,T,T,T,T,R,R,R,R,R,R,R,R,R,Y,Y],
  [T,T,T,T,T,G,G,G,Y,Y,G,Y,T,G,G,G],
  [T,T,T,T,G,Y,G,Y,Y,Y,G,Y,Y,G,G,G],
  [T,T,T,T,G,Y,G,G,Y,Y,Y,G,Y,Y,Y,G],
  [T,T,T,T,G,G,Y,Y,Y,Y,G,G,G,G,G,T],
  [T,T,T,T,T,T,Y,Y,Y,Y,Y,Y,Y,G,T,T],
  [T,T,G,G,G,G,G,R,G,G,G,R,G,T,T,T],
  [T,G,G,G,G,G,G,G,R,G,G,G,R,T,T,G],
  [Y,Y,G,G,G,G,G,G,R,R,R,R,R,T,T,G],
  [Y,Y,Y,T,R,R,G,R,R,Y,R,R,Y,R,G,G],
  [T,Y,T,G,R,R,R,R,R,R,R,R,R,R,G,G],
  [T,T,G,G,G,R,R,R,R,R,R,R,R,R,G,G],
  [T,G,G,G,R,R,R,R,R,R,R,T,T,T,T,T],
  [T,G,T,T,R,R,R,R,T,T,T,T,T,T,T,T],
]
// prettier-ignore
const STANDING_RIGHT_SMALL_BITMAP: Bitmap = [
  [T,T,T,T,T,R,R,R,R,R,T,T,T,T,T,T],
  [T,T,T,T,R,R,R,R,R,R,R,R,R,T,T,T],
  [T,T,T,T,G,G,G,Y,Y,G,Y,T,T,T,T,T],
  [T,T,T,G,Y,G,Y,Y,Y,G,Y,Y,Y,T,T,T],
  [T,T,T,G,Y,G,G,Y,Y,Y,G,Y,Y,Y,T,T],
  [T,T,T,G,G,Y,Y,Y,Y,G,G,G,G,T,T,T],
  [T,T,T,T,T,Y,Y,Y,Y,Y,Y,Y,T,T,T,T],
  [T,T,T,T,G,G,R,G,G,G,T,T,T,T,T,T],
  [T,T,T,G,G,G,R,G,G,R,G,G,G,T,T,T],
  [T,T,G,G,G,G,R,R,R,R,G,G,G,G,T,T],
  [T,T,Y,Y,G,R,Y,R,R,Y,R,G,Y,Y,T,T],
  [T,T,Y,Y,Y,R,R,R,R,R,R,Y,Y,Y,T,T],
  [T,T,Y,Y,R,R,R,R,R,R,R,R,Y,Y,T,T],
  [T,T,T,T,R,R,R,T,T,R,R,R,T,T,T,T],
  [T,T,T,G,G,G,T,T,T,T,G,G,G,T,T,T],
  [T,T,G,G,G,G,T,T,T,T,G,G,G,G,T,T],
];

const JUMPING_LEFT_SMALL = drawBitmap(
  JUMPING_RIGHT_SMALL_BITMAP.map((row) => row.toReversed())
);
const JUMPING_RIGHT_SMALL = drawBitmap(JUMPING_RIGHT_SMALL_BITMAP);
const STANDING_LEFT_SMALL = drawBitmap(
  STANDING_RIGHT_SMALL_BITMAP.map((row) => row.toReversed())
);
const STANDING_RIGHT_SMALL = drawBitmap(STANDING_RIGHT_SMALL_BITMAP);

const ACCELERATION: Acceleration = {
  x: pixels(300) / 1000 / 1000, // pixels/s^2
  y: pixels(150) / 1000 / 1000, // pixels/s^2
  z: 0,
};
const JUMP_INPUT_DURATION = 250; // ms

export class Mario implements CollidableEntity, MovableEntity {
  private jumpInputDuration: MS | null = null;

  private get Image(): OffscreenCanvas {
    // @todo
    if (this.size === "large") {
      return STANDING_RIGHT_SMALL;
    }

    if (this.isJumping) {
      return this.isFacingLeft ? JUMPING_LEFT_SMALL : JUMPING_RIGHT_SMALL;
    }

    return this.isFacingLeft ? STANDING_LEFT_SMALL : STANDING_RIGHT_SMALL;
  }

  acceleration = {
    x: 0,
    y: 0,
    z: 0,
  };
  collidableSides = {
    bottom: true,
    left: true,
    right: true,
    top: true,
  };
  friction = 3;
  isAccelerating = false;
  isFacingLeft = false;
  isJumping = false;
  isSliding = false;
  isWalking = false;
  position;
  size: "small" | "large";
  velocity = {
    x: 0,
    y: 0,
    z: 0,
  };

  get length() {
    return {
      x: gridUnits(1) - pixels(4),
      y: gridUnits(this.size === "large" ? 2 : 1),
      z: 1,
    };
  }

  get vmax() {
    return {
      x: pixels(this.isAccelerating ? 200 : 100) / 1000, // pixels/s
      y: pixels(360) / 1000, // pixels/s
      z: 0,
    };
  }

  constructor(gridX: number, gridY: number, size: "small" | "large") {
    this.position = {
      x: gridUnits(gridX),
      y: gridUnits(gridY),
      z: 0,
    };
    this.size = size;
  }

  render(context: CanvasRenderingContext2D): void {
    context.drawImage(
      this.Image,
      pixels(-2),
      0,
      this.length.x + pixels(4),
      this.length.y
    );
  }

  update(elapsedTime: MS, buttons: Set<Button>): void {
    const isPressingA = buttons.has("a");
    const isPressingB = buttons.has("b");
    const isPressingDown = buttons.has("down") && !buttons.has("up");
    const isPressingLeft = buttons.has("left") && !buttons.has("right");
    const isPressingRight = buttons.has("right") && !buttons.has("left");

    if (!isPressingB) {
      this.jumpInputDuration = null;
    }
    if (isPressingLeft) {
      this.isFacingLeft = true;
    }
    if (isPressingRight) {
      this.isFacingLeft = false;
    }

    this.isAccelerating = isPressingA;

    this.acceleration.x = 0;

    // accelerate if pressing direction
    // @todo && isTouchingBottom
    // @todo && !isTouchingLeft
    if (isPressingLeft) {
      this.acceleration.x = -ACCELERATION.x;
    }
    // @todo && !isTouchingRight
    if (isPressingRight) {
      this.acceleration.x = ACCELERATION.x;
    }

    /*
    if (neighbors.bottom) {
      this.isJumping = false;
    }
    */

    // jump
    if (isPressingB) {
      // @todo if neighbors.bottom
      if (this.jumpInputDuration === null) {
        this.isJumping = true;
        this.jumpInputDuration = elapsedTime;
        // this.velocity.y += int(this.acceleration.y * elapsedTime);
      } else if (this.jumpInputDuration < JUMP_INPUT_DURATION) {
        this.jumpInputDuration += elapsedTime;
        // this.velocity.y += int(this.acceleration.y * elapsedTime);
      }
      // @todo if has flower, throw fireball
    }
  }
}
