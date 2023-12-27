import { player } from '../main';

class KeyManagerService {

    keybinds: {
        [key: string]: string[];
    } = {
        jump: [' ', 'w', 'ArrowUp'],
        down: ['s', 'ArrowDown'],
        left: ['a', 'ArrowLeft'],
        right: ['d', 'ArrowRight'],
        shoot: ['0']
    };

    public handleKeyDown(event: KeyboardEvent): void {
        Object.keys(this.keybinds).forEach(action => {
            if (this.keybinds[action].includes(event.key)) player.actions[action] = true;
        });
    }

    public handleKeyUp(event: KeyboardEvent): void {
        Object.keys(this.keybinds).forEach(action => {
            if (this.keybinds[action].includes(event.key)) player.actions[action] = false;
        });
    }

    // Mouse buttons:
    // 0 = Left | 1 = Middle | 2 = Right | 3 = Back | 4 = Forward

    public handleMouseDown(event: MouseEvent): void {
        Object.keys(this.keybinds).forEach(action => {
            if (this.keybinds[action].includes(event.button.toString())) player.actions[action] = true;
        });
    }

    public handleMouseUp(event: MouseEvent): void {
        Object.keys(this.keybinds).forEach(action => {
            if (this.keybinds[action].includes(event.button.toString())) player.actions[action] = false;
        });
    }
}

export const keyManagerService = new KeyManagerService();
