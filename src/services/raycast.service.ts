import Matter from 'matter-js';
import { graphicsService } from './graphics.service';

class RaycastService {
    rawMouse: Matter.Vector = {
        x: 0,
        y: 0
    };

    interpolatedMouse: Matter.Vector = {
        x: 0,
        y: 0
    };

    public raycast(): void {
        this.interpMouse();
        // use online raycast methods people have made https://github.com/liabru/matter-js/issues/181
    }

    private interpMouse(): void {
        const adjustedMouse = { x: this.rawMouse.x - window.innerWidth / 2, y: this.rawMouse.y - window.innerHeight / 2 };
        this.interpolatedMouse = Matter.Vector.mult(Matter.Vector.add(adjustedMouse, graphicsService.centerOfBounds), graphicsService.zoom);
    }
}

export const raycastService = new RaycastService();

document.addEventListener('mousemove', event => {
    raycastService.rawMouse = { x: event.clientX, y: event.clientY };
});
