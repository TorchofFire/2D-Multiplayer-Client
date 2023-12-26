import Matter from 'matter-js';
import { player, world } from '../main';
import { timeManagerService } from './timeManager.service';
import { raycastService } from './raycast.service';

class PlayerService {
    public logic(): void {
        this.collisions();
        this.movement();
        if (player.movement.down) raycastService.logic();
    }

    private collisions(): void {
        const collisions = Matter.Query.collides(player.body, world.bodies);
        collisions.pop();
        if (collisions.length < 1) {
            player.onFloor = false;
            return;
        }
        for (const collision of collisions) {
            if (collision.normal.y > 0.5) {
                player.onFloor = true;
                return;
            }
        }
        player.onFloor = false;
    }

    private movement(): void {
        Matter.Body.setAngle(player.body, 0);
        const movement = player.movement;
        const playerVelocity = player.body.velocity;

        if (player.xSpeed <= 3 && player.movement.right) player.xSpeed += 15 * timeManagerService.deltaTime;
        if (player.xSpeed >= -3 && player.movement.left) player.xSpeed -= 15 * timeManagerService.deltaTime;

        if (!player.movement.left && !player.movement.right && player.xSpeed !== 0) {
            if (player.xSpeed > 0) {
                player.xSpeed -= 10 * timeManagerService.deltaTime;
            } else {
                player.xSpeed += 10 * timeManagerService.deltaTime;
            }
            if (Math.abs(player.xSpeed) < 0.1) player.xSpeed = 0;
        }
        if (movement.up && player.onFloor) {
            Matter.Body.setVelocity(player.body, { x: playerVelocity.x, y: -10 });
        }
        Matter.Body.setVelocity(player.body, { x: player.xSpeed, y: playerVelocity.y });
    }
}

export const playerService = new PlayerService();
