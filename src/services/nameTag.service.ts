import { player, render } from '../main';
import { graphicsService } from './graphics.service';
import { multiplayerService } from './multiplayer.service';

const mainNametag = document.querySelector('.main-nametag') as HTMLDivElement;
const graphicsDiv = document.querySelector('.graphics') as HTMLDivElement;

class NameTagService {
    nametags: HTMLDivElement[] = [];
    nametagsMap: Map<string, HTMLDivElement> = new Map();

    private moveMainTagToPlayer(): void {
        if (!mainNametag || !render.options.width) return;
        graphicsService.moveDivToBody(mainNametag, player.body, { x: 0, y: -50 });
    }

    public updateMainTag(name: string): void {
        mainNametag.textContent = name;
    }

    public moveTagsToPlayers(): void {
        this.moveMainTagToPlayer();
        for (const nametag of this.nametags) {
            if (!nametag.textContent) continue;
            const mPlayer = multiplayerService.playersMap.get(nametag.textContent);
            if (!mPlayer || !render.options.width) return;
            graphicsService.moveDivToBody(nametag, mPlayer.body, { x: 0, y: -50 });
        }
    }

    public newTag(playerName: string): void {
        if (this.nametagsMap.has(playerName)) return;
        const nametag = document.createElement('div');
        nametag.className = 'nametag';
        nametag.textContent = playerName;
        graphicsDiv.appendChild(nametag);
        this.nametags.push(nametag);
        this.nametagsMap.set(playerName, nametag);
    }

    public removeTag(playerName: string): void {
        const nametag = this.nametagsMap.get(playerName);
        if (!nametag) return;
        this.nametags = this.nametags.filter(tag => tag !== nametag);
        this.nametagsMap.delete(playerName);
    }
}

export const nameTagService = new NameTagService();
