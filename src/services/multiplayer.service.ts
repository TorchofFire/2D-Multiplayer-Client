import Matter from 'matter-js';
import Character from '../objects/character';
import { WSPlayerPacket } from '../types/WSPacket.type';
import { world } from '../main';

class MultiplayerService {
    players: Character[] = [];
    playersMap: Map<string, Character> = new Map();

    public newPlayer(packet: WSPlayerPacket): void {
        if (this.playersMap.has(packet.username)) return;
        const player = new Character(packet.positionX, packet.positionY);
        player.movement = packet.keypresses;
        this.players.push(player);
        this.playersMap.set(packet.username, player);
        Matter.World.add(world, player.body);
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

}

export const multiplayerService = new MultiplayerService();
