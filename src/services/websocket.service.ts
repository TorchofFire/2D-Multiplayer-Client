import { player } from '../main';
import { WSPacket } from '../types/WSPacket.type';

class WebSocketService {

    ws: WebSocket | undefined;
    private isReady = false;

    public connectToServer(ip: string): void {
        this.ws = new WebSocket(`wss://${ip}`);

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

    private sendPacket(packet: WSPacket): void {
        this.ws?.send(JSON.stringify(packet));
    }

    public netLogic(): void {
        if (this.isReady && player.username) {
            this.sendPacket({
                username: player.username,
                keypresses: {
                    down: player.movement.down,
                    left: player.movement.left,
                    right: player.movement.right,
                    up: player.movement.up
                },
                positionX: player.body.position.x,
                positionY: player.body.position.y
            });
        }
    }
}

export const webSocketService = new WebSocketService();
