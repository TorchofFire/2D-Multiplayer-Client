import Matter from 'matter-js';
import { render } from '../main';

class GraphicsService {

    graphicsDiv = document.querySelector('.graphics') as HTMLDivElement;

    zoom = 0;
    centerOfBounds: Matter.Vector = { x: 0, y: 0 };

    public updateViewportCalculations(): void {
        if (!render.options.width) return;
        this.zoom = (render.options.width / Math.abs(render.bounds.min.x - render.bounds.max.x));
        this.centerOfBounds = Matter.Vector.div(Matter.Vector.add(render.bounds.min, render.bounds.max), 2);
    }

    public moveDivToPosition(div: HTMLDivElement, position: Matter.Vector, offset?: {x: number; y: number}): void {
        const divPositionViewport = Matter.Vector.sub(position, this.centerOfBounds);

        div.style.position = 'fixed';
        div.style.transform = 'translate(-50%, -50%)';
        if (offset) {
            divPositionViewport.x += offset.x;
            divPositionViewport.y += offset.y;
        }
        div.style.left = `${divPositionViewport.x * this.zoom + window.innerWidth / 2}px`;
        div.style.top = `${divPositionViewport.y * this.zoom + window.innerHeight / 2}px`;
    }

    public createBulletImpact(position: Matter.Vector, direction: number): void {
        const impactDiv = document.createElement('div');
        impactDiv.style.width = `${this.zoom * 5}px`;
        impactDiv.style.height = `${this.zoom * 5}px`;
        impactDiv.style.rotate = `${direction}rad`;
        impactDiv.style.backgroundColor = 'orange';
        this.moveDivToPosition(impactDiv, position);

        this.graphicsDiv.appendChild(impactDiv);
        setTimeout(() => {
            this.graphicsDiv.removeChild(impactDiv);
        }, 2000);
    }
}

export const graphicsService = new GraphicsService();
