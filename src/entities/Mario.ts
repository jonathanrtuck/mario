import {
  MARIO_STANDING_LEFT_SMALL,
  MARIO_STANDING_RIGHT_SMALL,
} from "@/bitmaps";
import {
  Acceleration,
  Button,
  CollidableEntity,
  MovableEntity,
  Side,
  Velocity,
} from "@/types";
import {
  gridUnits,
  gridUnitsPerSecond,
  gridUnitsPerSecondPerSecond,
  pixels,
} from "@/utils";

const ACCELERATION: Acceleration = {
  x: gridUnitsPerSecondPerSecond(13.125),
  y: gridUnitsPerSecondPerSecond(13.125),
};
const VELOCITY: Velocity = {
  x: gridUnitsPerSecond(1),
  y: gridUnitsPerSecond(15.75), // @todo
};

// @see https://www.researchgate.net/publication/314374307_You_Say_Jump_I_Say_How_High_Operationalising_the_Game_Feel_of_Jumping
export class Mario implements CollidableEntity, MovableEntity {
  private get bitmap(): OffscreenCanvas {
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
  isAccelerating = false;
  isCrouching = false;
  isJumping = false;
  isSliding = false;
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
    };
  }
  get mass() {
    return this.size === "large" ? 155 : 77.5;
  }
  get vmax() {
    return {
      x: gridUnitsPerSecond(6 * (this.isAccelerating ? 2 : 1)),
      y: gridUnitsPerSecond(17.25),
    };
  }
  get vmin() {
    return {
      x: 1,
      y: gridUnitsPerSecond(8),
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
    switch (side) {
      case "bottom":
        this.acceleration.y = 0;
        this.velocity.y = 0;
        this.isJumping = false;
        break;
      case "left":
        break;
      case "right":
        break;
      case "top":
        break;
    }
  }

  press(button: Button, buttons: Set<Button>): void {
    switch (button) {
      case "a":
        break;
      case "b":
        // jump
        this.acceleration.y = ACCELERATION.y;
        this.velocity.y = VELOCITY.y;
        this.isJumping = true;

        // @todo if has flower, throw fireball
        break;
      case "down":
        if (!buttons.has("up")) {
          this.isCrouching = true;
        }
        break;
      case "left":
        if (buttons.has("right")) {
          this.acceleration.x = 0;
        } else {
          this.acceleration.x = -ACCELERATION.x;
          this.facing = "left";
        }
        break;
      case "right":
        if (buttons.has("left")) {
          this.acceleration.x = 0;
        } else {
          this.acceleration.x = ACCELERATION.x;
          this.facing = "right";
        }
        break;
      case "up":
        break;
    }
  }

  release(button: Button, buttons: Set<Button>): void {
    switch (button) {
      case "a":
        break;
      case "b":
        this.acceleration.y = 0;
        break;
      case "down":
        break;
      case "left":
        if (buttons.has("right")) {
          this.acceleration.x = ACCELERATION.x;
          this.facing = "right";
        } else {
          this.acceleration.x = 0;
        }
        break;
      case "right":
        if (buttons.has("left")) {
          this.acceleration.x = -ACCELERATION.x;
          this.facing = "left";
        } else {
          this.acceleration.x = 0;
        }
        break;
      case "up":
        if (!buttons.has("down")) {
          this.isCrouching = true;
        }
        break;
    }
  }

  render(context: CanvasRenderingContext2D): void {
    context.drawImage(
      this.bitmap,
      pixels(-2),
      0,
      this.length.x + pixels(4),
      this.length.y
    );
  }
}
