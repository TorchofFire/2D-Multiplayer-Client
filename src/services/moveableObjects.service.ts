import Matter from 'matter-js';
import { WSMovableObjectPacket } from '../types/WSPacket.type';

class MoveableObjectService {
    objects: Matter.Body[] = [];

    public updateObject(packet: WSMovableObjectPacket): void {
        const object = this.objects.find(obj => obj.label === packet.moveableObjectlabel);
        if (!object) return;
        const distance = Math.sqrt(
            (object.position.x - packet.positionX) ** 2
            + (object.position.y - packet.positionY) ** 2
        );
        if (distance < ((Math.abs(object.velocity.x) + Math.abs(object.velocity.y)) * 20) + 20) return;

        Matter.Body.setPosition(object, { x: packet.positionX, y: packet.positionY });
        Matter.Body.setVelocity(object, packet.velocity);
    }
}

export const moveableObjectService = new MoveableObjectService();
