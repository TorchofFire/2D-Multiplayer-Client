import { player } from '../main';
import { WSPlayerPacket, isMovableObjectPacket, isPlayerPacket } from '../types/WSPacket.type';
import { moveableObjectService } from './moveableObjects.service';
import { multiplayerService } from './multiplayer.service';

class WebSocketService {

    ws: WebSocket | undefined;
    private isReady = false;
    private lastPacket: WSPlayerPacket | null = null;

    public connectToServer(ip: string): void {
        this.ws = new WebSocket(`ws://${ip}`);

        this.ws.onopen = (): void => {
            this.isReady = true;
        };
        this.ws.onerror = (): void => {
            console.error;
        };
        this.ws.onclose = (): void => {
            this.isReady = false;
            this.ws = undefined;
        };
        this.ws.onmessage = (event): void => {
            const packet = JSON.parse(`${event.data}`);
            if (isPlayerPacket(packet)) multiplayerService.updatePlayer(packet);
            if (isMovableObjectPacket(packet)) moveableObjectService.updateObject(packet);
        };
    }

    private sendPacket(packet: WSPlayerPacket): void {
        this.ws?.send(JSON.stringify(packet));
    }

    public netLogic(): void {
        if (!this.isReady || !player.username) return;
        const roundedVelocity = { x: Math.round(player.body.velocity.x), y: Math.round(player.body.velocity.y) };
        const packet: WSPlayerPacket = {
            username: player.username,
            velocity: roundedVelocity,
            positionX: Math.round(player.body.position.x),
            positionY: Math.round(player.body.position.y)
        };
        if (this.lastPacket
            && packet.positionX === this.lastPacket.positionX
            && packet.positionY === this.lastPacket.positionY) {
            return;
        }
        this.lastPacket = packet;
        this.sendPacket(packet);
    }
}

export const webSocketService = new WebSocketService();
