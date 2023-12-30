/* eslint-disable @typescript-eslint/no-explicit-any */
import Matter from 'matter-js';

export type WSHandShakePacket = {
    username: string;
    version: string;
};

export function isHandShakePacket(object: any): object is WSHandShakePacket {
    return ('username' in object && 'version' in object);
}

export type WSInitPacket = {
    players: WSPlayerPacket[];
    moveableObjects: {
        label: string;
        position: Matter.Vector;
        velocity: Matter.Vector;
    }[];
};

export function isInitPacket(object: any): object is WSInitPacket {
    return ('players' in object && 'moveableObjects' in object);
}

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
    moveableObjects: {
        label: string;
        position: Matter.Vector;
        velocity: Matter.Vector;
    }[];
};

export function isMovableObjectPacket(object: any): object is WSMovableObjectPacket {
    return ('moveableObjects' in object);
}
