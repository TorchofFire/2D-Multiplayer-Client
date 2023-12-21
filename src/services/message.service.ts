const messagesDiv = document.querySelector('.messages');

class MessageService {

    public sendMessage(msg: string): void {
        const newDiv = document.createElement('div');
        newDiv.textContent = msg;
        messagesDiv?.appendChild(newDiv);

        setTimeout(() => {
            newDiv.remove();
        }, 5000);
    }
}

export const messageService = new MessageService();
