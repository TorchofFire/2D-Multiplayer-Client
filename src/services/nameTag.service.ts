import { player, render } from '../main';
import { graphicsService } from './graphics.service';

const nametag = document.querySelector('.nametag') as HTMLDivElement;

class NameTagService {
    public moveMainTagToPlayer(): void {
        if (!nametag || !render.options.width) return;
        graphicsService.moveDivToBody(nametag, player.body, { x: 0, y: -50 });
    }
}

export const nameTagService = new NameTagService();