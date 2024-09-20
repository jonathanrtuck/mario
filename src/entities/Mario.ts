import {
  MARIO_CLIMBING_LEFT_SMALL,
  MARIO_CLIMBING_RIGHT_SMALL,
  MARIO_JUMPING_LEFT_SMALL,
  MARIO_JUMPING_RIGHT_SMALL,
  MARIO_SKIDDING_LEFT_SMALL,
  MARIO_SKIDDING_RIGHT_SMALL,
  MARIO_STANDING_LEFT_SMALL,
  MARIO_STANDING_RIGHT_SMALL,
  MARIO_WALKING_LEFT_SMALL_A,
  MARIO_WALKING_LEFT_SMALL_B,
  MARIO_WALKING_LEFT_SMALL_C,
  MARIO_WALKING_RIGHT_SMALL_A,
  MARIO_WALKING_RIGHT_SMALL_B,
  MARIO_WALKING_RIGHT_SMALL_C,
} from "@/bitmaps";
import { FRAME_INTERVAL } from "@/constants";
import {
  Button,
  CollidableEntity,
  Collision,
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
        if (this.isClimbing) {
          return this.facing === "left"
            ? MARIO_CLIMBING_LEFT_SMALL
            : MARIO_CLIMBING_RIGHT_SMALL;
        }

        if (this.isJumping) {
          return this.facing === "left"
            ? MARIO_JUMPING_LEFT_SMALL
            : MARIO_JUMPING_RIGHT_SMALL;
        }

        if (this.isSkidding) {
          return this.facing === "left"
            ? MARIO_SKIDDING_LEFT_SMALL
            : MARIO_SKIDDING_RIGHT_SMALL;
        }

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
  isClimbing = false;
  isCrouching = false;
  isJumping = false;
  isSkidding = false;
  position = {
    x: 0,
    y: 0,
    z: 0,
  };
  size: "small" | "large" = "small";
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
  get vmax(): Velocity {
    return {
      x: gridUnitsPerSecond(6 * (this.isAccelerating ? 2 : 1)),
      y: gridUnitsPerSecond(17.25),
    };
  }

  collide(collisions: Collision[]): void {
    console.debug(collisions);
    /*
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
    */
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

  reset(gridX: number, gridY: number): void {
    this.facing = "right";
    this.isAccelerating = false;
    this.isClimbing = false;
    this.isCrouching = false;
    this.isJumping = false;
    this.isSkidding = false;
    this.position.x = gridUnits(gridX);
    this.position.y = gridUnits(gridY);
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  update(frame: number, buttons: Set<Button>): void {
    this.isAccelerating = buttons.has("a");
    this.isSkidding = false;

    if (buttons.has("left")) {
      this.facing = "left";
      this.acceleration.x = gridUnitsPerSecondPerSecond(-13.125);

      // @todo && isTouchingBottom
      if (this.velocity.x > 0) {
        this.isSkidding = true;
        this.acceleration.x = gridUnitsPerSecondPerSecond(-30);
      }
    } else if (this.velocity.x < 0) {
      if (
        this.velocity.x >
        gridUnitsPerSecondPerSecond(-13.125) * FRAME_INTERVAL
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
        this.isSkidding = true;
        this.acceleration.x = gridUnitsPerSecondPerSecond(30);
      }
    } else if (this.velocity.x > 0) {
      if (
        this.velocity.x <
        gridUnitsPerSecondPerSecond(13.125) * FRAME_INTERVAL
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
