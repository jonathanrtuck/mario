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
  Neighbors,
} from "@/types";
import {
  drawBitmap,
  gridUnits,
  gridUnitsPerSecond,
  gridUnitsPerSecondPerSecond,
  pixels,
} from "@/utils";

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
  x: gridUnitsPerSecondPerSecond(19),
  y: gridUnitsPerSecondPerSecond(57),
  z: 0,
};
const JUMP_INPUT_DURATION = 250; // ms

export class Mario implements CollidableEntity, MovableEntity {
  private jumpInputDuration: MS = JUMP_INPUT_DURATION;

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
      y: gridUnits(this.size === "large" ? 2 : 1),
      z: 1,
    };
  }

  get vmax() {
    return {
      x: gridUnitsPerSecond(this.isAccelerating ? 12 : 6),
      y: gridUnitsPerSecond(38),
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

  update(elapsedTime: MS, buttons: Set<Button>, neighbors: Neighbors): void {
    const isPressingA = buttons.has("a");
    const isPressingB = buttons.has("b");
    const isPressingDown = buttons.has("down") && !buttons.has("up");
    const isPressingLeft = buttons.has("left") && !buttons.has("right");
    const isPressingRight = buttons.has("right") && !buttons.has("left");
    const isTouchingBottom = neighbors.bottom.length !== 0;
    const isTouchingLeft = neighbors.left.length !== 0;
    const isTouchingRight = neighbors.right.length !== 0;

    if (!isPressingB) {
      this.jumpInputDuration = JUMP_INPUT_DURATION;
    }
    if (isPressingLeft) {
      this.isFacingLeft = true;
    }
    if (isPressingRight) {
      this.isFacingLeft = false;
    }

    if (isTouchingBottom) {
      this.jumpInputDuration = 0;
      this.isJumping = false;
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

    if (isPressingB) {
      if (!this.isJumping && isTouchingBottom) {
        this.isJumping = true;
        this.jumpInputDuration = elapsedTime;
        this.acceleration.y = ACCELERATION.y;
      } else if (
        this.isJumping &&
        this.jumpInputDuration < JUMP_INPUT_DURATION
      ) {
        this.jumpInputDuration += elapsedTime;
        this.acceleration.y = ACCELERATION.y;
      }

      // @todo if has flower, throw fireball
    }
  }
}
