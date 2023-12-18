import { player } from '../main';
import { WSPacketToServer } from '../types/WSPacket.type';

class WebSocketService {

    ws: WebSocket | undefined;
    private isReady = false;
    private lastPacket: WSPacketToServer | null = null;

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
        this.ws.onmessage = (data): void => {
            console.log('received: %s', data);
        };
    }

    private sendPacket(packet: WSPacketToServer): void {
        this.ws?.send(JSON.stringify(packet));
    }

    public netLogic(): void {
        if (!this.isReady || !player.username) return;
        const packet: WSPacketToServer = {
            username: player.username,
            keypresses: {
                down: player.movement.down,
                left: player.movement.left,
                right: player.movement.right,
                up: player.movement.up
            },
            positionX: player.body.position.x,
            positionY: player.body.position.y
        };
        if (this.lastPacket) {
            if (
                Math.round(packet.positionX) === Math.round(this.lastPacket?.positionX)
                && Math.round(packet.positionX) === Math.round(this.lastPacket?.positionX)
            ) {
                return;
            }
        }
        this.lastPacket = packet;
        this.sendPacket(packet);
    }
}

export const webSocketService = new WebSocketService();
