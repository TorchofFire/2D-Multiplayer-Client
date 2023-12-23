import { raycastService } from './raycast.service';

const crosshairDiv = document.getElementById('crosshair') as HTMLDivElement;
crosshairDiv.style.position = 'fixed';
crosshairDiv.style.transform = 'translate(-50%, -50%)';

class OverlayService {
    public moveCrosshairToMouse(): void {
        crosshairDiv.style.top = `${raycastService.rawMouse.y}px`;
        crosshairDiv.style.left = `${raycastService.rawMouse.x}px`;
    }
}

export const overlayService = new OverlayService();
