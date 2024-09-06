import {
  COLOR_GREEN_DARK,
  COLOR_RED,
  COLOR_TRANSPARENT,
  COLOR_YELLOW_DARK,
  UPDATES_PER_TICK,
} from "@/constants";
import {
  Acceleration,
  Bitmap,
  Button,
  CollidableEntity,
  MovableEntity,
  Neighbors,
  Side,
} from "@/types";
import {
  drawBitmap,
  flip,
  gridUnits,
  gridUnitsPerSecond,
  gridUnitsPerSecondPerSecond,
  pixels,
} from "@/utils";

import { Flag } from "./Flag";

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
// prettier-ignore
const WALKING_RIGHT_SMALL_A_BITMAP: Bitmap = [
  [T,T,T,T,T,R,R,R,R,R,T,T,T,T,T,T],
  [T,T,T,T,R,R,R,R,R,R,R,R,R,T,T,T],
  [T,T,T,T,G,G,G,Y,Y,G,Y,T,T,T,T,T],
  [T,T,T,G,Y,G,Y,Y,Y,G,Y,Y,Y,T,T,T],
  [T,T,T,G,Y,G,G,Y,Y,Y,G,Y,Y,Y,T,T],
  [T,T,T,G,G,Y,Y,Y,Y,G,G,G,G,T,T,T],
  [T,T,T,T,T,Y,Y,Y,Y,Y,Y,Y,T,T,T,T],
  [T,T,G,G,G,G,R,R,G,G,T,T,T,T,T,T],
  [Y,Y,G,G,G,G,R,R,R,G,G,G,Y,Y,Y,T],
  [Y,Y,Y,T,G,G,R,Y,R,R,R,G,G,Y,Y,T],
  [Y,Y,T,T,R,R,R,R,R,R,R,T,T,G,T,T],
  [T,T,T,R,R,R,R,R,R,R,R,R,G,G,T,T],
  [T,T,R,R,R,R,R,R,R,R,R,R,G,G,T,T],
  [T,G,G,R,R,R,T,T,T,R,R,R,G,G,T,T],
  [T,G,G,G,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,G,G,G,T,T,T,T,T,T,T,T,T,T,T],
];
// prettier-ignore
const WALKING_RIGHT_SMALL_B_BITMAP: Bitmap = [
  [T,T,T,T,T,R,R,R,R,R,T,T,T,T,T,T],
  [T,T,T,T,R,R,R,R,R,R,R,R,R,T,T,T],
  [T,T,T,T,G,G,G,Y,Y,G,Y,T,T,T,T,T],
  [T,T,T,G,Y,G,Y,Y,Y,G,Y,Y,Y,T,T,T],
  [T,T,T,G,Y,G,G,Y,Y,Y,G,Y,Y,Y,T,T],
  [T,T,T,G,G,Y,Y,Y,Y,G,G,G,G,T,T,T],
  [T,T,T,T,T,Y,Y,Y,Y,Y,Y,Y,T,T,T,T],
  [T,T,T,T,G,G,R,G,G,G,T,T,T,T,T,T],
  [T,T,T,G,G,G,G,R,R,G,G,T,T,T,T,T],
  [T,T,T,G,G,G,R,R,Y,R,R,Y,T,T,T,T],
  [T,T,T,G,G,G,G,R,R,R,R,R,T,T,T,T],
  [T,T,T,R,G,G,Y,Y,Y,R,R,R,T,T,T,T],
  [T,T,T,T,R,G,Y,Y,R,R,R,T,T,T,T,T],
  [T,T,T,T,T,R,R,R,G,G,G,T,T,T,T,T],
  [T,T,T,T,T,G,G,G,G,G,G,G,T,T,T,T],
  [T,T,T,T,T,G,G,G,G,T,T,T,T,T,T,T],
];
// prettier-ignore
const WALKING_RIGHT_SMALL_C_BITMAP: Bitmap = [
  [T,T,T,T,T,T,T,T,T,T,T,T,T,T,T,T],
  [T,T,T,T,T,T,R,R,R,R,R,T,T,T,T,T],
  [T,T,T,T,T,R,R,R,R,R,R,R,R,R,T,T],
  [T,T,T,T,T,G,G,G,Y,Y,G,Y,T,T,T,T],
  [T,T,T,T,G,Y,G,Y,Y,Y,G,Y,Y,Y,T,T],
  [T,T,T,T,G,Y,G,G,Y,Y,Y,G,Y,Y,Y,T],
  [T,T,T,T,G,G,Y,Y,Y,Y,G,G,G,G,T,T],
  [T,T,T,T,T,T,Y,Y,Y,Y,Y,Y,Y,T,T,T],
  [T,T,T,T,T,G,G,G,G,R,G,T,Y,T,T,T],
  [T,T,T,T,Y,G,G,G,G,G,G,Y,Y,Y,T,T],
  [T,T,T,Y,Y,R,G,G,G,G,G,Y,Y,T,T,T],
  [T,T,T,G,G,R,R,R,R,R,R,R,T,T,T,T],
  [T,T,T,G,R,R,R,R,R,R,R,R,T,T,T,T],
  [T,T,G,G,R,R,R,T,R,R,R,T,T,T,T,T],
  [T,T,G,T,T,T,T,G,G,G,T,T,T,T,T,T],
  [T,T,T,T,T,T,T,G,G,G,G,T,T,T,T,T],
];

const JUMPING_RIGHT_SMALL = drawBitmap(JUMPING_RIGHT_SMALL_BITMAP);
const STANDING_RIGHT_SMALL = drawBitmap(STANDING_RIGHT_SMALL_BITMAP);
const WALKING_RIGHT_SMALL_A = drawBitmap(WALKING_RIGHT_SMALL_A_BITMAP);
const WALKING_RIGHT_SMALL_B = drawBitmap(WALKING_RIGHT_SMALL_B_BITMAP);
const WALKING_RIGHT_SMALL_C = drawBitmap(WALKING_RIGHT_SMALL_C_BITMAP);

const JUMPING_LEFT_SMALL = drawBitmap(flip(JUMPING_RIGHT_SMALL_BITMAP));
const STANDING_LEFT_SMALL = drawBitmap(flip(STANDING_RIGHT_SMALL_BITMAP));
const WALKING_LEFT_SMALL_A = drawBitmap(flip(WALKING_RIGHT_SMALL_A_BITMAP));
const WALKING_LEFT_SMALL_B = drawBitmap(flip(WALKING_RIGHT_SMALL_B_BITMAP));
const WALKING_LEFT_SMALL_C = drawBitmap(flip(WALKING_RIGHT_SMALL_C_BITMAP));

const ACCELERATION: Acceleration = {
  x: gridUnitsPerSecondPerSecond(13),
  y: gridUnitsPerSecondPerSecond(900),
  z: 0,
};
const MAX_NUM_JUMP_INPUT_FRAMES = 24;

export class Mario implements CollidableEntity, MovableEntity {
  private numJumpInputFrames = 0;
  private numWalkingFrames = 0;

  private get Image(): OffscreenCanvas {
    if (this.size === "large") {
      return STANDING_RIGHT_SMALL;
    }

    if (this.isJumping) {
      return this.isFacingLeft ? JUMPING_LEFT_SMALL : JUMPING_RIGHT_SMALL;
    }

    if (this.isWalking) {
      const variant =
        Math.floor(
          this.numWalkingFrames /
            (UPDATES_PER_TICK / (this.isAccelerating ? 6 : 3))
        ) % 3;

      switch (variant) {
        case 0:
          return this.isFacingLeft
            ? WALKING_LEFT_SMALL_A
            : WALKING_RIGHT_SMALL_A;
        case 1:
          return this.isFacingLeft
            ? WALKING_LEFT_SMALL_B
            : WALKING_RIGHT_SMALL_B;
        case 2:
          return this.isFacingLeft
            ? WALKING_LEFT_SMALL_C
            : WALKING_RIGHT_SMALL_C;
      }
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
  elasticity = 0;
  friction = 3;
  isAccelerating = false;
  isCrouching = false;
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
      y: gridUnits(this.size === "large" && !this.isCrouching ? 2 : 1),
      z: 1,
    };
  }
  get vmax() {
    return {
      x: gridUnitsPerSecond(6.4) * (this.isAccelerating ? 2 : 1),
      y: gridUnitsPerSecond(16),
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

  collide(side: Side, entity: CollidableEntity): void {
    if (entity instanceof Flag) {
      console.debug("win");
    }

    if (side === "bottom") {
      this.isJumping = false;
    }
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

  update(buttons: Set<Button>, neighbors: Neighbors): void {
    if (this.position.y < 0) {
      console.debug("lose");
    }

    const isPressingA = buttons.has("a");
    const isPressingB = buttons.has("b");
    const isPressingDown = buttons.has("down") && !buttons.has("up");
    const isPressingLeft = buttons.has("left") && !buttons.has("right");
    const isPressingRight = buttons.has("right") && !buttons.has("left");
    const isTouchingBottom = neighbors.bottom.length !== 0;
    const isTouchingLeft = neighbors.left.length !== 0;
    const isTouchingRight = neighbors.right.length !== 0;

    if (!isPressingB) {
      this.numJumpInputFrames = 0;
    }
    if (isPressingLeft) {
      this.isFacingLeft = true;
    }
    if (isPressingRight) {
      this.isFacingLeft = false;
    }

    this.isAccelerating = isPressingA;
    this.isCrouching = this.size === "large" && isPressingDown;

    this.acceleration.x = 0;
    this.acceleration.y = 0;

    if (isPressingLeft && !isTouchingLeft) {
      this.acceleration.x = -ACCELERATION.x;
    }
    if (isPressingRight && !isTouchingRight) {
      this.acceleration.x = ACCELERATION.x;
    }

    if (
      !isTouchingBottom ||
      (this.velocity.x === 0 && !isPressingLeft && !isPressingRight)
    ) {
      this.isWalking = false;
    } else if (this.isWalking) {
      this.numWalkingFrames++;

      if (this.numWalkingFrames === UPDATES_PER_TICK) {
        this.numWalkingFrames = 0;
      }
    }

    if (
      !this.isWalking &&
      isTouchingBottom &&
      (isPressingLeft || isPressingRight)
    ) {
      this.numWalkingFrames = 0;
      this.isWalking = true;
    }

    if (isPressingB) {
      if (
        !this.isJumping &&
        this.numJumpInputFrames === 0 &&
        isTouchingBottom
      ) {
        this.isJumping = true;
        this.numJumpInputFrames = 1;
        this.acceleration.y = ACCELERATION.y;
      } else if (
        this.isJumping &&
        this.numJumpInputFrames !== 0 &&
        this.numJumpInputFrames < MAX_NUM_JUMP_INPUT_FRAMES
      ) {
        this.numJumpInputFrames++;
        this.acceleration.y = ACCELERATION.y / 8;
      }

      // @todo if has flower, throw fireball
    }
  }
}
