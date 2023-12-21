/* eslint-disable @typescript-eslint/no-explicit-any */
import Matter from 'matter-js';

export type WSMessagePacket = {
    username: string;
    message: string;
};

export function isMessagePacket(object: any): object is WSMessagePacket {
    return ('username' in object && 'message' in object);
}

export type WSPlayerPacket = {
    username: string;
    position: Matter.Vector;
    velocity: Matter.Vector;
};

export function isPlayerPacket(object: any): object is WSPlayerPacket {
    return ('username' in object && 'position' in object && 'velocity' in object);
}

export type WSPlayerDisconnectPacket = {
    username: string;
};

export function isPlayerDisconnectPacket(object: any): object is WSPlayerPacket {
    return 'username' in object;
}

export type WSMovableObjectPacket = {
    moveableObjectlabel: string;
    position: Matter.Vector;
    velocity: Matter.Vector;
};

export function isMovableObjectPacket(object: any): object is WSMovableObjectPacket {
    return ('moveableObjectlabel' in object && 'position' in object && 'velocity' in object);
}
