import { WSMessagePacket } from '../types/WSPacket.type';

const messagesDiv = document.querySelector('.messages');

class MessageService {

    public sendMessage(msg: string): void {
        const newDiv = document.createElement('div');
        newDiv.textContent = msg;
        messagesDiv?.appendChild(newDiv);

        setTimeout(() => {
            newDiv.remove();
        }, 10000);
    }

    public receiveMessage(packet: WSMessagePacket): void {
        const message = `${packet.username}: ${packet.message}`;
        this.sendMessage(message);
    }
}

export const messageService = new MessageService();
