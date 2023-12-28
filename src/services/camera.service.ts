import Matter from 'matter-js';
import { render, player } from '../main';
import { timeManagerService } from './timeManager.service';

let viewDistance = 500;

class CameraService {

    public cameraToPlayer(): void {
        this.lookAt(player.body.position, 20);
    }

    private lookAt(vector: Matter.Vector, quickness: number): void {
        const vectorMin = { x: vector.x - viewDistance, y: vector.y - viewDistance };
        const vectorMax = { x: vector.x + viewDistance, y: vector.y + viewDistance };

        const min = this.lerpVector(render.bounds.min, vectorMin, timeManagerService.deltaTime * quickness);
        const max = this.lerpVector(render.bounds.max, vectorMax, timeManagerService.deltaTime * quickness);
        Matter.Render.lookAt(render, {
            min: min,
            max: max
        });
    }

    private lerpVector(vectorA: Matter.Vector, vectorB: Matter.Vector, factor: number): Matter.Vector {
        return {
            x: vectorA.x + factor * (vectorB.x - vectorA.x),
            y: vectorA.y + factor * (vectorB.y - vectorA.y)
        };
    }
}

document.addEventListener('wheel', event => {
    const delta = Math.sign(event.deltaY);
    viewDistance += delta * (viewDistance / 2);
});

export const cameraService = new CameraService();
