
export type WSPacketToServer = {
    username: string;
    positionX: number;
    positionY: number;
    keypresses: {up: boolean; down: boolean; left: boolean; right: boolean};
};
