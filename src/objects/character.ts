import Matter from 'matter-js';

export default class Character {

    constructor(x: number, y: number) {
        const characterCollisionGroup = Matter.Body.nextGroup(true);
        this.body = Matter.Bodies.rectangle(x, y, 20, 70, {
            restitution: 0,
            friction: 0,
            collisionFilter: {
                group: characterCollisionGroup,
                category: 0x0002,
                mask: 0x0001
            }
        });
    }

    username: string | null = null;

    xSpeed = 0;
    // ySpeed is fully handled by the physics engine

    onFloor = false;

    actions: {
        [key: string]: boolean;
    } = {
        jump: false,
        down: false,
        left: false,
        right: false,
        shoot: false
    };

    body: Matter.Body;

}
