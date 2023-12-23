import Matter from 'matter-js';
import { render } from '../main';

class GraphicsService {

    zoom = 0;
    centerOfBounds: Matter.Vector = { x: 0, y: 0 };

    public updateViewportCalculations(): void {
        if (!render.options.width) return;
        this.zoom = (render.options.width / Math.abs(render.bounds.min.x - render.bounds.max.x));
        this.centerOfBounds = Matter.Vector.div(Matter.Vector.add(render.bounds.min, render.bounds.max), 2);
    }

    public moveDivToBody(div: HTMLDivElement, body: Matter.Body, offset?: {x: number; y: number}): void {
        const divPositionViewport = Matter.Vector.sub(body.position, this.centerOfBounds);

        div.style.position = 'fixed';
        div.style.transform = 'translate(-50%, -50%)';
        if (offset) {
            divPositionViewport.x += offset.x;
            divPositionViewport.y += offset.y;
        }
        div.style.left = `${divPositionViewport.x * this.zoom + window.innerWidth / 2}px`;
        div.style.top = `${divPositionViewport.y * this.zoom + window.innerHeight / 2}px`;
    }
}

export const graphicsService = new GraphicsService();
