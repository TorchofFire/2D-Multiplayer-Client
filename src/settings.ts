import { player } from './main';
import { webSocketService } from './services/websocket.service';

export function setupSettingsModal(): void {
    const settingsButton = document.getElementById('settings-button');
    const modal = document.getElementById('settings-modal');
    const closeModalButton = document.querySelector('.close');
    const saveSettingsButton = document.getElementById('saveSettingsButton');
    const serverIpInput = document.getElementById('serverIpInput') as HTMLInputElement;
    const usernameInput = document.getElementById('usernameInput') as HTMLInputElement;

    settingsButton?.addEventListener('click', () => {
        if (!modal) return;
        modal.style.display = 'block';
    });

    closeModalButton?.addEventListener('click', () => {
        if (!modal) return;
        modal.style.display = 'none';
    });

    window.addEventListener('click', event => {
        if (!modal) return;
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    saveSettingsButton?.addEventListener('click', () => {
        if (!modal) return;
        const serverIp = serverIpInput?.value;
        const username = usernameInput?.value;
        player.username = username;

        if (!webSocketService.ws) webSocketService.connectToServer(serverIp);

        modal.style.display = 'none';
    });
}
