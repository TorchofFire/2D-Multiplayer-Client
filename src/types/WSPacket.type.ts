/* eslint-disable @typescript-eslint/no-explicit-any */
import Matter from 'matter-js';

export type WSPlayerPacket = {
    username: string;
    positionX: number;
    positionY: number;
    velocity: Matter.Vector;
};

export function isPlayerPacket(object: any): object is WSPlayerPacket {
    return 'username' in object; // username is a unique field to WSPlayerPacket
}
