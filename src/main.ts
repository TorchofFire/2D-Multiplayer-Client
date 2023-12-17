import Matter from 'matter-js';
import { keyManagerService } from './services/keyManager.service';
import { playerService } from './services/player.service';
import Character from './objects/character';
import { timeManagerService } from './services/timeManager.service';
import { nameTagService } from './services/nameTag.service';
import { mapService } from './services/map.service';
import { cameraService } from './services/camera.service';
import { graphicsService } from './services/graphics.service';

const engine = Matter.Engine.create();
export const world = engine.world;
engine.gravity.y = 0.5;

export const render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight
    }
});

Matter.Render.run(render);

mapService.createLevel();

export const player = new Character(0, 300);

Matter.World.add(world, player.body);

function gameLoop(): void {

    timeManagerService.logic();
    playerService.logic();
    Matter.Engine.update(engine);

    cameraService.cameraToPlayer();
    graphicsService.updateViewportCalculations();

    nameTagService.moveMainTagToPlayer();

    requestAnimationFrame(gameLoop);
}
gameLoop();

document.addEventListener('keydown', event => keyManagerService.handleKeyDown(event));
document.addEventListener('keyup', event => keyManagerService.handleKeyUp(event));

window.addEventListener('resize', () => {
    render.options.width = window.innerWidth;
    render.options.height = window.innerHeight;
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;
});
