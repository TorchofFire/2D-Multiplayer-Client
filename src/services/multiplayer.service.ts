import Matter from 'matter-js';
import Character from '../objects/character';
import { WSPlayerDisconnectPacket, WSPlayerPacket } from '../types/WSPacket.type';
import { world } from '../main';
import { nameTagService } from './nameTag.service';
import { messageService } from './message.service';

class MultiplayerService {
    players: Character[] = [];
    playersMap: Map<string, Character> = new Map();

    public newPlayer(packet: WSPlayerPacket): void {
        const player = new Character(packet.position.x, packet.position.y);
        player.username = packet.username;
        this.players.push(player);
        this.playersMap.set(packet.username, player);
        Matter.World.add(world, player.body);
        nameTagService.newTag(player.username);
        messageService.sendClientMessage(`${player.username} has joined`);
    }

    public updatePlayer(packet: WSPlayerPacket): void {
        const player = this.playersMap.get(packet.username);
        if (!player) {
            this.newPlayer(packet);
            return;
        }
        player.username = packet.username;
        Matter.Body.setPosition(player.body, packet.position);
        Matter.Body.setVelocity(player.body, packet.velocity);
    }

    public removePlayer(packet: WSPlayerDisconnectPacket): void {
        const player = this.playersMap.get(packet.username);
        if (!player) return;
        Matter.World.remove(world, player.body);
        this.players = this.players.filter(plyr => plyr !== player);
        this.playersMap.delete(player.username!);
        nameTagService.removeTag(player.username!);
        messageService.sendClientMessage(`${player.username} has left`);
    }

    public inBetween(): void {
        for (const player of this.players) {
            Matter.Body.setAngle(player.body, 0);
        }
    }

}

export const multiplayerService = new MultiplayerService();
