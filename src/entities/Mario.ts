import {
  COLOR_GREEN_DARK,
  COLOR_RED,
  COLOR_TRANSPARENT,
  COLOR_YELLOW_DARK,
} from "@/constants";
import { Button, CollidableEntity, MovableEntity } from "@/types";
import { drawBitmap, gridUnits, pixels } from "@/utils";

const G = COLOR_GREEN_DARK;
const R = COLOR_RED;
const T = COLOR_TRANSPARENT;
const Y = COLOR_YELLOW_DARK;

// prettier-ignore
const STANDING_RIGHT_SMALL_BITMAP = [
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

const STANDING_LEFT_SMALL = drawBitmap(
  STANDING_RIGHT_SMALL_BITMAP.map((row) => row.toReversed())
);
const STANDING_RIGHT_SMALL = drawBitmap(STANDING_RIGHT_SMALL_BITMAP);

export class Mario implements CollidableEntity, MovableEntity {
  private get Image(): OffscreenCanvas {
    if (this.size === "large") {
      return STANDING_RIGHT_SMALL; // @todo
    }

    return this.isFacingLeft ? STANDING_LEFT_SMALL : STANDING_RIGHT_SMALL;
  }

  acceleration = {
    x: pixels(10),
    y: pixels(10),
    z: 0,
  };
  collidableSides = {
    bottom: true,
    left: true,
    right: true,
    top: true,
  };
  deceleration = {
    x: pixels(10),
    y: 0,
    z: 0,
  };
  isFacingLeft = false;
  isInputtingJump = false;
  isJumping = false;
  isRunning = false;
  isSliding = false;
  isWalking = false;
  length;
  position;
  size: "small" | "large";
  velocity = {
    x: 0,
    y: 0,
    z: 0,
  };

  get vmax() {
    return {
      x: pixels(this.isRunning ? 8 : 4),
      y: pixels(20),
      z: 0,
    };
  }

  constructor(gridX: number, gridY: number, size: "small" | "large") {
    this.length = {
      x: gridUnits(1) - pixels(4),
      y: gridUnits(size === "large" ? 2 : 1),
      z: 1,
    };
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

  update(buttons: Set<Button>): void {
    const isPressingLeft = buttons.has("left") && !buttons.has("right");
    const isPressingRight = buttons.has("right") && !buttons.has("left");

    if (isPressingLeft) {
      this.isFacingLeft = true;
    }
    if (isPressingRight) {
      this.isFacingLeft = false;
    }
  }
}
