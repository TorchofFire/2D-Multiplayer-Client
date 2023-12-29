import Matter from 'matter-js';
import { WSMovableObjectPacket } from '../types/WSPacket.type';

class MoveableObjectService {
    objects: Matter.Body[] = [];

    public updateObject(packet: WSMovableObjectPacket): void {
        for (const moveableObject of packet.moveableObject) {
            const object = this.objects.find(obj => obj.label === moveableObject.label);
            if (!object) return;
            const distance = Math.sqrt(
                (object.position.x - moveableObject.position.x) ** 2
                + (object.position.y - moveableObject.position.y) ** 2
            );
            if (distance < ((Math.abs(object.velocity.x) + Math.abs(object.velocity.y)) * 20) + 20) return;

            Matter.Body.setPosition(object, moveableObject.position);
            Matter.Body.setVelocity(object, moveableObject.velocity);
        }
    }
}

export const moveableObjectService = new MoveableObjectService();
