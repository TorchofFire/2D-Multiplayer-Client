import { player } from '../main';
import { WSPlayerPacket, isMessagePacket, isMovableObjectPacket, isPlayerDisconnectPacket, isPlayerPacket } from '../types/WSPacket.type';
import { messageService } from './message.service';
import { moveableObjectService } from './moveableObjects.service';
import { multiplayerService } from './multiplayer.service';

class WebSocketService {

    ws: WebSocket | undefined;
    private isReady = false;
    private lastPacket: WSPlayerPacket | null = null;

    public connectToServer(ip: string): void {
        const portReg = /:\d+$/;
        if (portReg.test(ip)) {
            this.ws = new WebSocket(`ws://${ip}`);
        } else {
            this.ws = new WebSocket(`ws://${ip}:8080`);
        }

        this.ws.onopen = (): void => {
            this.isReady = true;
            messageService.sendClientMessage('Connected to Server');
        };
        this.ws.onerror = (): void => {
            console.error;
        };
        this.ws.onclose = (): void => {
            this.isReady = false;
            this.ws = undefined;
            messageService.sendClientMessage('Lost Connection to Server');
        };
        this.ws.onmessage = (event): void => {
            const packet = JSON.parse(`${event.data}`);
            if (isPlayerPacket(packet)) {
                multiplayerService.updatePlayer(packet);
                return;
            }
            if (isMovableObjectPacket(packet)) {
                moveableObjectService.updateObject(packet);
                return;
            }
            if (isMessagePacket(packet)) {
                messageService.receiveMessage(packet);
                return;
            }
            // this should be last since it is the most simple packet. (can be confused with others)
            if (isPlayerDisconnectPacket(packet)) {
                multiplayerService.removePlayer(packet);
            }
        };
    }

    private sendPlayerPacket(packet: WSPlayerPacket): void {
        this.ws?.send(JSON.stringify(packet));
    }

    public netLogic(): void {
        if (!this.isReady || !player.username) return;
        const roundedVelocity = { x: Math.round(player.body.velocity.x), y: Math.round(player.body.velocity.y) };
        const packet: WSPlayerPacket = {
            username: player.username,
            velocity: roundedVelocity,
            position: { x: Math.round(player.body.position.x), y: Math.round(player.body.position.y) }
        };
        if (this.lastPacket
            && packet.position.x === this.lastPacket.position.x
            && packet.position.y === this.lastPacket.position.y) {
            return;
        }
        this.lastPacket = packet;
        this.sendPlayerPacket(packet);
    }
}

export const webSocketService = new WebSocketService();
