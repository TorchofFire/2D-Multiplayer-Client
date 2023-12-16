import Matter from 'matter-js';
import { keyManagerService } from './services/keyManager.service';
import { playerService } from './services/player.service';
import Character from './objects/character';
import { timeManagerService } from './services/timeManager.service';
import { nameTagService } from './services/nameTag.service';
import { mapService } from './services/map.service';

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

export const player = new Character(400, 300);

Matter.World.add(world, player.body);

let viewDistance = 500;

function gameLoop(): void {

    timeManagerService.logic();
    playerService.logic();
    Matter.Engine.update(engine);

    Matter.Render.lookAt(render, {
        min: { x: player.body.position.x - viewDistance, y: player.body.position.y - viewDistance },
        max: { x: player.body.position.x + viewDistance, y: player.body.position.y + viewDistance }
    });

    nameTagService.moveMainTagToPlayer();

    requestAnimationFrame(gameLoop);
}
gameLoop();

document.addEventListener('keydown', event => keyManagerService.handleKeyDown(event));
document.addEventListener('keyup', event => keyManagerService.handleKeyUp(event));

document.addEventListener('wheel', event => {
    const delta = Math.sign(event.deltaY);
    viewDistance += delta * viewDistance / 2;
});
