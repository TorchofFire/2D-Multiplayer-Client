import Matter from 'matter-js';
import { render } from '../main';

class OverlayService {

    public moveDivToBody(div: HTMLDivElement, body: Matter.Body, offset?: {x: number; y: number}): void {
        if (!render.options.width) return;
        const zoom = (render.options.width / Math.abs(render.bounds.min.x - render.bounds.max.x));
        const centerOfBounds = Matter.Vector.div(Matter.Vector.add(render.bounds.min, render.bounds.max), 2);
        const playerPositionViewport = Matter.Vector.sub(body.position, centerOfBounds);

        div.style.position = 'fixed';
        div.style.transform = 'translate(-50%, -50%)';
        if (offset) {
            playerPositionViewport.x += offset.x;
            playerPositionViewport.y += offset.y;
        }
        div.style.left = `${playerPositionViewport.x * zoom + window.innerWidth / 2}px`;
        div.style.top = `${playerPositionViewport.y * zoom + window.innerHeight / 2}px`;
    }
}

export const overlayService = new OverlayService();
