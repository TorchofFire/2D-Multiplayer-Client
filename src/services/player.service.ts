import Matter from 'matter-js';
import { player, world } from '../main';
import { timeManagerService } from './timeManager.service';
import { raycastService } from './raycast.service';

class PlayerService {
    public logic(): void {
        this.collisions();
        this.movement();
        if (player.actions.shoot) raycastService.logic();
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
        const movement = player.actions;
        const playerVelocity = player.body.velocity;

        if (player.xSpeed <= 3 && player.actions.right) player.xSpeed += 15 * timeManagerService.deltaTime;
        if (player.xSpeed >= -3 && player.actions.left) player.xSpeed -= 15 * timeManagerService.deltaTime;

        if (!player.actions.left && !player.actions.right && player.xSpeed !== 0) {
            if (player.xSpeed > 0) {
                player.xSpeed -= 10 * timeManagerService.deltaTime;
            } else {
                player.xSpeed += 10 * timeManagerService.deltaTime;
            }
            if (Math.abs(player.xSpeed) < 0.1) player.xSpeed = 0;
        }
        if (movement.jump && player.onFloor) {
            Matter.Body.setVelocity(player.body, { x: playerVelocity.x, y: -10 });
        }
        Matter.Body.setVelocity(player.body, { x: player.xSpeed, y: playerVelocity.y });
    }
}

export const playerService = new PlayerService();
