import { player } from '../main';
import { WSPlayerPacket } from '../types/WSPacket.type';
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
        };
        this.ws.onmessage = (event): void => {
            console.log(JSON.parse(event.data));
            multiplayerService.updatePlayer(JSON.parse(event.data));
        };
    }

    private sendPacket(packet: WSPlayerPacket): void {
        this.ws?.send(JSON.stringify(packet));
    }

    public netLogic(): void {
        if (!this.isReady || !player.username) return;
        const packet: WSPlayerPacket = {
            username: player.username,
            keypresses: {
                down: player.movement.down,
                left: player.movement.left,
                right: player.movement.right,
                up: player.movement.up
            },
            positionX: Math.round(player.body.position.x),
            positionY: Math.round(player.body.position.y)
        };
        if (this.lastPacket
            && packet.positionX === this.lastPacket.positionX
            && packet.positionX === this.lastPacket.positionX) {
            return;
        }
        this.lastPacket = packet;
        this.sendPacket(packet);
    }
}

export const webSocketService = new WebSocketService();
