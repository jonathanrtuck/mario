import {
  MARIO_STANDING_LEFT_SMALL,
  MARIO_STANDING_RIGHT_SMALL,
} from "@/bitmaps";
import {
  Button,
  CollidableEntity,
  ControllableEntity,
  MovableEntity,
  Side,
} from "@/types";
import { gridUnits, pixels } from "@/utils";

export class Mario
  implements CollidableEntity, ControllableEntity, MovableEntity
{
  private get Image(): OffscreenCanvas {
    switch (this.size) {
      // @todo
      case "large":
        return MARIO_STANDING_RIGHT_SMALL;
      default:
        return this.facing === "left"
          ? MARIO_STANDING_LEFT_SMALL
          : MARIO_STANDING_RIGHT_SMALL;
    }
  }

  acceleration = {
    x: 0,
    y: 0,
  };
  collidableSides = {
    bottom: true,
    left: true,
    right: true,
    top: true,
  };
  facing: "left" | "right" = "right";
  friction = 3;
  isAccelerating = false;
  isCrouching = false;
  isJumping = false;
  isSliding = false;
  isVisible = true;
  isWalking = false;
  position;
  size: "small" | "large";
  velocity = {
    x: 0,
    y: 0,
  };

  get length() {
    return {
      x: gridUnits(1) - pixels(4),
      y: gridUnits(this.size === "large" && !this.isCrouching ? 2 : 1),
      z: 1,
    };
  }
  get mass() {
    return this.size === "large" ? 155 : 77.5;
  }
  get vmax() {
    return {
      x: 1 * (this.isAccelerating ? 2 : 1),
      y: 1,
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

  collide(entity: CollidableEntity, side: Side): void {
    //
  }

  press(button: Button, buttons: Set<Button>): void {
    if (button === "left" && !buttons.has("right")) {
      this.facing = "left";
    }
    if (button === "right" && !buttons.has("left")) {
      this.facing = "right";
    }
  }

  release(button: Button, buttons: Set<Button>): void {
    if (button === "left" && buttons.has("right")) {
      this.facing = "right";
    }
    if (button === "right" && buttons.has("left")) {
      this.facing = "left";
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
}
