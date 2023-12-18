import Matter from 'matter-js';

export default class Character {
    constructor(x: number, y: number) {
        this.body = Matter.Bodies.rectangle(x, y, 20, 70, {
            restitution: 0,
            friction: 0
        });
    }

    username: string | null = null;

    xSpeed = 0;
    // ySpeed is fully handled by the physics engine

    onFloor = false;

    movement = {
        up: false,
        down: false,
        left: false,
        right: false
    };

    body: Matter.Body;

}
