import { player } from '../main';

class KeyManagerService {

    keybinds = {
        up: ' ',
        down: 's',
        left: 'a',
        right: 'd'
    };

    public handleKeyDown(event: KeyboardEvent): void {
        if (event.key === this.keybinds.up) player.movement.up = true;
        if (event.key === this.keybinds.down) player.movement.down = true;
        if (event.key === this.keybinds.left) player.movement.left = true;
        if (event.key === this.keybinds.right) player.movement.right = true;
    }

    public handleKeyUp(event: KeyboardEvent): void {
        if (event.key === this.keybinds.up) player.movement.up = false;
        if (event.key === this.keybinds.down) player.movement.down = false;
        if (event.key === this.keybinds.left) player.movement.left = false;
        if (event.key === this.keybinds.right) player.movement.right = false;
    }
}

export const keyManagerService = new KeyManagerService();
