import Matter from 'matter-js';
import Character from '../objects/character';
import { WSPlayerPacket } from '../types/WSPacket.type';
import { world } from '../main';
import { nameTagService } from './nameTag.service';

class MultiplayerService {
    players: Character[] = [];
    playersMap: Map<string, Character> = new Map();

    public newPlayer(packet: WSPlayerPacket): void {
        if (this.playersMap.has(packet.username)) return;
        const player = new Character(packet.positionX, packet.positionY);
        player.movement = packet.keypresses;
        player.username = packet.username;
        this.players.push(player);
        this.playersMap.set(packet.username, player);
        Matter.World.add(world, player.body);
        nameTagService.newTag(player.username);
    }

    public updatePlayer(packet: WSPlayerPacket): void {
        const player = this.playersMap.get(packet.username);
        if (!player) {
            this.newPlayer(packet);
            return;
        }
        player.username = packet.username;
        player.body.position.x = packet.positionX;
        player.body.position.y = packet.positionY;
        player.movement = packet.keypresses;
    }

    public inBetween(): void {
        for (const player of this.players) {
            Matter.Body.setAngle(player.body, 0);
            Matter.Body.setVelocity(player.body, { x: 0, y: 0 }); // TODO: get the correct velocity
        }
    }

}

export const multiplayerService = new MultiplayerService();
