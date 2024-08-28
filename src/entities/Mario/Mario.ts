import { COLOR_RED, GRID_UNIT_LENGTH, PIXEL_LENGTH } from "@/constants";
import { CollidableEntity, MovableEntity } from "@/types";
import { getRGBA } from "@/utils";

export class Mario implements CollidableEntity, MovableEntity {
  acceleration = {
    x: 10 * PIXEL_LENGTH,
    y: 10 * PIXEL_LENGTH,
    z: 0,
  };
  collidableSides = {
    bottom: true,
    left: true,
    right: true,
    top: true,
  };
  deceleration = {
    x: 6,
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
      x: 4 * PIXEL_LENGTH * (this.isRunning ? 2 : 1),
      y: 20 * PIXEL_LENGTH,
      z: 0,
    };
  }

  constructor(gridX: number, gridY: number, size: Mario["size"]) {
    this.length = {
      x: GRID_UNIT_LENGTH * 1,
      y: GRID_UNIT_LENGTH * (size === "large" ? 2 : 1),
      z: 1,
    };
    this.position = {
      x: GRID_UNIT_LENGTH * gridX,
      y: GRID_UNIT_LENGTH * gridY,
      z: 0,
    };
    this.size = size;
  }

  render(context: CanvasRenderingContext2D): void {
    context.fillStyle = getRGBA(COLOR_RED);
    context.fillRect(0, 0, this.length.x, this.length.y);
  }
}
