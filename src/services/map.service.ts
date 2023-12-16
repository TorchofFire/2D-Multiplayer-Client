import Matter, { IChamferableBodyDefinition, Vector } from 'matter-js';
import { world } from '../main';

class MapService {

    public createLevel(): void {
        this.addRect({ x: 400, y: 600 }, 800, 20, { isStatic: true });
        this.addRect({ x: 400, y: 400 }, 200, 20, { isStatic: true });
        this.addRect({ x: 810, y: 560 }, 20, 1000, { isStatic: true });
        this.addCirc({ x: 400, y: 400 }, 20, { friction: 0 });
    }

    private addRect(position: Vector, width: number, height: number, options?: IChamferableBodyDefinition): void {
        Matter.World.add(world, Matter.Bodies.rectangle(position.x, position.y, width, height, options));
    }

    private addCirc(position: Vector, radius: number, options?: IChamferableBodyDefinition): void {
        Matter.World.add(world, Matter.Bodies.circle(position.x, position.y, radius, options));
    }
}

export const mapService = new MapService();
