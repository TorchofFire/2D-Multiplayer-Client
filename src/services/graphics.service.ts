import Matter from 'matter-js';
import { render } from '../main';

let zoom: number;
let centerOfBounds: Matter.Vector;

class GraphicsService {

    public updateViewportCalculations(): void {
        if (!render.options.width) return;
        zoom = (render.options.width / Math.abs(render.bounds.min.x - render.bounds.max.x));
        centerOfBounds = Matter.Vector.div(Matter.Vector.add(render.bounds.min, render.bounds.max), 2);
    }

    public moveDivToBody(div: HTMLDivElement, body: Matter.Body, offset?: {x: number; y: number}): void {
        if (!render.options.width) return;
        const divPositionViewport = Matter.Vector.sub(body.position, centerOfBounds);

        div.style.position = 'fixed';
        div.style.transform = 'translate(-50%, -50%)';
        if (offset) {
            divPositionViewport.x += offset.x;
            divPositionViewport.y += offset.y;
        }
        div.style.left = `${divPositionViewport.x * zoom + window.innerWidth / 2}px`;
        div.style.top = `${divPositionViewport.y * zoom + window.innerHeight / 2}px`;
    }
}

export const graphicsService = new GraphicsService();
