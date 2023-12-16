import Matter from 'matter-js';
import { world } from '../main';
import { degreeToRadian } from '../helpers';

class MapService {

    public createLevel(): void {
        this.salutation();
    }

    private salutation(): void {
        // ceiling & left wall & right wall
        this.addRect({ x: 0, y: -2000 }, 5000, 300, { isStatic: true });
        this.addRect({ x: -2175, y: -500 }, 300, 3000, { isStatic: true });
        this.addRect({ x: 2175, y: -500 }, 300, 3000, { isStatic: true });

        // mid
        this.addRect({ x: 0, y: 400 }, 250, 20, { isStatic: true });
        this.addRect({ x: 0, y: 300 }, 100, 100);
        this.addRect({ x: 0, y: 0 }, 400, 20, { isStatic: true });
        this.addRect({ x: -300, y: 200 }, 20, 500, { isStatic: true });
        this.addRect({ x: -327, y: -50 }, 75, 20, { isStatic: true });
        this.addRect({ x: -200, y: 200 }, 200, 20, { isStatic: true });
        this.addRect({ x: 300, y: 200 }, 20, 500, { isStatic: true });
        this.addRect({ x: 327, y: -50 }, 75, 20, { isStatic: true });
        this.addRect({ x: 200, y: 200 }, 200, 20, { isStatic: true });
        this.addRect({ x: 0, y: -200 }, 200, 20, { isStatic: true });

        // main platform
        this.addTrap({ x: 0, y: 675 }, 1100, 150, 0.3, { isStatic: true });
        Matter.Body.setAngle(this.addTrap({ x: 0, y: 820 }, 1090, 150, 0.3, { isStatic: true }), degreeToRadian(180));

        // underground section
        this.addRect({ x: -350, y: 1190 }, 300, 300, { isStatic: true });
        this.addRect({ x: 350, y: 1190 }, 300, 300, { isStatic: true });
        this.addRect({ x: 0, y: 1490 }, 400, 300, { isStatic: true });
        this.addCirc({ x: 0, y: 1350 }, 50);
        this.addRect({ x: 0, y: 1025 }, 50, 250, { isStatic: true });

        // left side
        this.addTrap({ x: -1400, y: 900 }, 1800, 300, 0.3, { isStatic: true });
        this.addRect({ x: -1140, y: 510 }, 20, 100, { isStatic: true });
        this.addRect({ x: -1400, y: 550 }, 500, 20, { isStatic: true });
        this.addRect({ x: -1900, y: 350 }, 300, 20, { isStatic: true });
        this.addRect({ x: -1100, y: 150 }, 1100, 20, { isStatic: true });
        this.addRect({ x: -800, y: 50 }, 100, 100);
        this.addRect({ x: -1000, y: -100 }, 700, 20, { isStatic: true });
        this.addRect({ x: -950, y: -210 }, 200, 200, { isStatic: true });
        this.addRect({ x: -750, y: -310 }, 200, 400, { isStatic: true });
        Matter.Body.setAngle(this.addRect({ x: -600, y: -300 }, 150, 20, { isStatic: true }), degreeToRadian(20));

        // left spawn
        this.addRect({ x: -1800, y: -200 }, 200, 20, { isStatic: true });
        this.addRect({ x: -1700, y: -270 }, 20, 150, { isStatic: true });

        // right side
        this.addTrap({ x: 1400, y: 900 }, 1800, 300, 0.3, { isStatic: true });
        this.addRect({ x: 1140, y: 510 }, 20, 100, { isStatic: true });
        this.addRect({ x: 1400, y: 550 }, 500, 20, { isStatic: true });
        this.addRect({ x: 1900, y: 350 }, 300, 20, { isStatic: true });
        this.addRect({ x: 1100, y: 150 }, 1100, 20, { isStatic: true });
        this.addRect({ x: 800, y: 50 }, 100, 100);
        this.addRect({ x: 1000, y: -100 }, 700, 20, { isStatic: true });
        this.addRect({ x: 950, y: -210 }, 200, 200, { isStatic: true });
        this.addRect({ x: 750, y: -310 }, 200, 400, { isStatic: true });
        Matter.Body.setAngle(this.addRect({ x: 600, y: -300 }, 150, 20, { isStatic: true }), degreeToRadian(-20));

        // right spawn
        this.addRect({ x: 1800, y: -200 }, 200, 20, { isStatic: true });
        this.addRect({ x: 1700, y: -270 }, 20, 150, { isStatic: true });
    }

    private addRect(position: Matter.Vector, width: number, height: number, options?: Matter.IChamferableBodyDefinition): Matter.Body {
        const rect = Matter.Bodies.rectangle(position.x, position.y, width, height, options);
        Matter.World.add(world, rect);
        return rect;
    }

    private addCirc(position: Matter.Vector, radius: number, options?: Matter.IChamferableBodyDefinition): void {
        Matter.World.add(world, Matter.Bodies.circle(position.x, position.y, radius, options));
    }

    private addTrap(position: Matter.Vector, width: number, height: number, slope: number, options?: Matter.IChamferableBodyDefinition): Matter.Body {
        const trap = Matter.Bodies.trapezoid(position.x, position.y, width, height, slope, options);
        Matter.World.add(world, trap);
        return trap;
    }
}

export const mapService = new MapService();
