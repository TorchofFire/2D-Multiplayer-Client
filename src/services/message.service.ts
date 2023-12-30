import { player } from '../main';
import { WSMessagePacket } from '../types/WSPacket.type';
import { webSocketService } from './websocket.service';

const messagesDiv = document.querySelector('.messages') as Element;
const messageInput = document.getElementById('messageInput') as HTMLInputElement;
class MessageService {

    public sendClientMessage(msg: string, color?: string): void {
        const newDiv = document.createElement('div');
        newDiv.textContent = msg;
        if (color) newDiv.style.color = color;
        messagesDiv.insertBefore(newDiv, messagesDiv.firstChild);

        setTimeout(() => {
            newDiv.remove();
        }, 2 * 1000 * 60);
    }

    public receiveMessage(packet: WSMessagePacket): void {
        const message = `${packet.username}: ${packet.message}`;
        this.sendClientMessage(message);
    }

    public sendMessageToServer(msg: string): void {
        if (!webSocketService.ws) return;
        const packet: WSMessagePacket = { username: player.username!, message: msg };
        webSocketService.ws.send(JSON.stringify(packet));
    }

}

export const messageService = new MessageService();

messageInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        const enteredText = messageInput.value.trim();
        if (enteredText) {
            messageService.sendMessageToServer(enteredText);
            messageInput.value = '';
        }
        event.preventDefault();
    }
});
