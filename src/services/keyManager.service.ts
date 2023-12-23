import { player } from '../main';

class KeyManagerService {

    keybinds = {
        up: [' ', 'w', 'ArrowUp'],
        down: ['s', 'ArrowDown'],
        left: ['a', 'ArrowLeft'],
        right: ['d', 'ArrowRight']
    };

    public handleKeyDown(event: KeyboardEvent): void {
        if (this.keybinds.up.includes(event.key)) player.movement.up = true;
        if (this.keybinds.down.includes(event.key)) player.movement.down = true;
        if (this.keybinds.left.includes(event.key)) player.movement.left = true;
        if (this.keybinds.right.includes(event.key)) player.movement.right = true;
    }

    public handleKeyUp(event: KeyboardEvent): void {
        if (this.keybinds.up.includes(event.key)) player.movement.up = false;
        if (this.keybinds.down.includes(event.key)) player.movement.down = false;
        if (this.keybinds.left.includes(event.key)) player.movement.left = false;
        if (this.keybinds.right.includes(event.key)) player.movement.right = false;
    }
}

export const keyManagerService = new KeyManagerService();
