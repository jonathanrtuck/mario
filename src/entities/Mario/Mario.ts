import { COLOR_RED } from "@/constants";
import { Button, CollidableEntity, MovableEntity } from "@/types";
import { getRGBA, gridUnits, pixels } from "@/utils";

export class Mario implements CollidableEntity, MovableEntity {
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

  constructor(gridX: number, gridY: number, size: Mario["size"]) {
    this.length = {
      x: gridUnits(1),
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
    context.fillStyle = getRGBA(COLOR_RED);
    context.fillRect(0, 0, this.length.x, this.length.y);
  }

  update(buttons: Set<Button>): void {
    //
  }
}
