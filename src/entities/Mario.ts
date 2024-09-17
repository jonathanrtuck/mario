import {
  MARIO_HANGING_LEFT_SMALL,
  MARIO_HANGING_RIGHT_SMALL,
  MARIO_JUMPING_LEFT_SMALL,
  MARIO_JUMPING_RIGHT_SMALL,
  MARIO_SLIDING_LEFT_SMALL,
  MARIO_SLIDING_RIGHT_SMALL,
  MARIO_STANDING_LEFT_SMALL,
  MARIO_STANDING_RIGHT_SMALL,
  MARIO_WALKING_LEFT_SMALL_A,
  MARIO_WALKING_LEFT_SMALL_B,
  MARIO_WALKING_LEFT_SMALL_C,
  MARIO_WALKING_RIGHT_SMALL_A,
  MARIO_WALKING_RIGHT_SMALL_B,
  MARIO_WALKING_RIGHT_SMALL_C,
} from "@/bitmaps";
import { UPDATE_INTERVAL } from "@/constants";
import {
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

// @see https://www.researchgate.net/publication/314374307_You_Say_Jump_I_Say_How_High_Operationalising_the_Game_Feel_of_Jumping
export class Mario implements CollidableEntity, MovableEntity {
  private get bitmap(): OffscreenCanvas {
    switch (this.size) {
      // @todo
      case "large":
        return MARIO_STANDING_RIGHT_SMALL;
      default:
        if (this.isJumping) {
          return this.facing === "left"
            ? MARIO_JUMPING_LEFT_SMALL
            : MARIO_JUMPING_RIGHT_SMALL;
        }

        if (this.isSliding) {
          return this.facing === "left"
            ? MARIO_SLIDING_LEFT_SMALL
            : MARIO_SLIDING_RIGHT_SMALL;
        }

        return this.facing === "left"
          ? MARIO_STANDING_LEFT_SMALL
          : MARIO_STANDING_RIGHT_SMALL;
    }
  }
  private get vmax(): Velocity {
    return {
      x: gridUnitsPerSecond(6 * (this.isAccelerating ? 2 : 1)),
      y: gridUnitsPerSecond(17.25),
    };
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
        this.isJumping = false;
        this.acceleration.y = 0;
        this.velocity.y = 0;
        break;
      case "left":
        this.velocity.x = 0;
        break;
      case "right":
        this.velocity.x = 0;
        break;
      case "top":
        this.acceleration.y = 0;
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

  update(
    time: number,
    numUpdatesSinceTick: number,
    buttons: Set<Button>
  ): void {
    this.isAccelerating = buttons.has("a");
    this.isSliding = false;

    if (buttons.has("left")) {
      this.facing = "left";
      this.acceleration.x = gridUnitsPerSecondPerSecond(-13.125);

      // @todo && isTouchingBottom
      if (this.velocity.x > 0) {
        this.isSliding = true;
        this.acceleration.x = gridUnitsPerSecondPerSecond(-30);
      }
    } else if (this.velocity.x < 0) {
      if (
        this.velocity.x >
        gridUnitsPerSecondPerSecond(-13.125) * UPDATE_INTERVAL
      ) {
        this.acceleration.x = 0;
        this.velocity.x = 0;
      } else {
        this.acceleration.x = gridUnitsPerSecondPerSecond(13.125);
      }
    }

    if (buttons.has("right")) {
      this.facing = "right";
      this.acceleration.x = gridUnitsPerSecondPerSecond(13.125);

      // @todo && isTouchingBottom
      if (this.velocity.x < 0) {
        this.isSliding = true;
        this.acceleration.x = gridUnitsPerSecondPerSecond(30);
      }
    } else if (this.velocity.x > 0) {
      if (
        this.velocity.x <
        gridUnitsPerSecondPerSecond(13.125) * UPDATE_INTERVAL
      ) {
        this.acceleration.x = 0;
        this.velocity.x = 0;
      } else {
        this.acceleration.x = gridUnitsPerSecondPerSecond(-13.125);
      }
    }

    if (buttons.has("b")) {
      if (!this.isJumping) {
        this.isJumping = true;
        this.acceleration.y = gridUnitsPerSecondPerSecond(13.125);
        this.velocity.y = gridUnitsPerSecond(15.75); // @todo based on horizontal velocity
      }

      // @todo if has flower, throw fireball
    }

    if (
      this.isJumping &&
      (!buttons.has("b") || this.velocity.y < gridUnitsPerSecond(8))
    ) {
      this.acceleration.y = 0;
    }

    if (this.velocity.x > this.vmax.x) {
      this.acceleration.x = gridUnitsPerSecondPerSecond(-13.125);
    }
    if (this.velocity.x < -this.vmax.x) {
      this.acceleration.x = gridUnitsPerSecondPerSecond(13.125);
    }
  }
}
