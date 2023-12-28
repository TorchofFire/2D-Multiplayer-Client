/* eslint-disable max-classes-per-file */
import Matter from 'matter-js';

// Credit to Technostalgic
// JS Code grabbed and turned into TS from pastebin link https://pastebin.com/7M2CvK29

// 2d vector data type; contains information and methods for
// 2-dimensional vectors
export class Vector2 {
    // initailizes a 'Vector2' object with specified values
    constructor(x = 0, y = x) {
        this.x = x;
        this.y = y;
    }

    x: number;
    y: number;

    normalized(magnitude = 1): Vector2 {
        // returns a vector 2 with the same direction as this but
        // with a specified magnitude
        return this.multiply(magnitude / this.distance());
    }

    get inverted(): Vector2 {
        // returns the opposite of this vector
        return this.multiply(-1);
    }

    multiply(factor: number): Vector2 {
        // returns this multiplied by a specified factor
        return new Vector2(this.x * factor, this.y * factor);
    }

    plus(vec: Vector2): Vector2 {
        // returns the result of this added to another
        // specified 'Vector2' object
        return new Vector2(this.x + vec.x, this.y + vec.y);
    }

    minus(vec: Vector2): Vector2 {
        // returns the result of this subtracted by another
        // specified 'Vector2' object
        return this.plus(vec.inverted);
    }

    rotate(rot: number): Vector2 {
        // rotates the vector by the specified angle
        let ang = this.direction;
        const mag = this.distance();
        ang += rot;
        return Vector2.fromAng(ang, mag);
    }

    toPhysVector(): Matter.Vector {
        // converts this to a vector compatible with the
        // matter.js physics engine
        return Matter.Vector.create(this.x, this.y);
    }

    get direction(): number {
        // returns the angle this vector is pointing in radians
        return Math.atan2(this.y, this.x);
    }

    distance(vec = new Vector2()): number {
        // returns the distance between this and a specified
        // 'Vector2' object
        const d = Math.sqrt(
            (this.x - vec.x) ** 2
            + (this.y - vec.y) ** 2
        );
        return d;
    }

    clone(): Vector2 {
        // returns a new instance of a 'Vector2' object with the
        // same value
        return new Vector2(this.x, this.y);
    }

    static fromAng(angle: number, magnitude = 1): Vector2 {
        // returns a vector which points in the specified angle
        // and has the specified magnitude
        return new Vector2(
            Math.cos(angle) * magnitude,
            Math.sin(angle) * magnitude
        );
    }

    static fromOther(vector: Matter.Vector): Vector2 {
        // converts other data types that contain 'x' and 'y'
        // properties to a 'Vector2' object type
        return new Vector2(vector.x, vector.y);
    }

    toString(): string {
        return `vector<${this.x}, ${this.y}>`;
    }
}

// data type that contains information about an intersection
// between a ray and a body
export class Raycol {
    // initailizes a 'raycol' object with the given data
    // param 'body' - stores the body that the ray has
    //  collided with
    // param 'point' - stores the collision point
    // param 'normal' - stores the normal of the edge that
    //  the ray collides with
    // param 'verts' - stores the vertices of the edge that
    //  the ray collides with
    constructor(body: Matter.Body, point: Vector2, normal: Vector2, verts: Matter.Vertices) {
        this.body = body;
        this.point = point;
        this.normal = normal;
        this.verts = verts;
    }

    body: Matter.Body;
    point: Vector2;
    normal: Vector2;
    verts: Matter.Vertices;
}

// in order to avoid miscalculations due to floating points
// error, which for whatever reason javascript has a ton of
// example:
// var m = 6; m -= 1; m -= 3; m += 4
// now 'm' probably equals 6.0000000008361 or something stupid
function compareNum(a: number, b: number, leniency = 0.00001): boolean {
    return Math.abs(b - a) <= leniency;
}

// data type that contains information and methods for a
// ray object
export class Ray {
    // initializes a ray instance with the given parameters
    // param 'start' - the starting point of the ray
    // param 'end' - the ending point of the ray
    constructor(start: Vector2, end: Vector2) {
        this.start = start;
        this.end = end;
    }

    start: Vector2;
    end: Vector2;
    verts: Matter.Vector[] = [];

    yValueAt(x: number): number {
        // returns the y value on the ray at the specified x
        // slope-intercept form:
        // y = m * x + b
        return this.offsetY + this.slope * x;
    }

    xValueAt(y: number): number {
        // returns the x value on the ray at the specified y
        // slope-intercept form:
        // x = (y - b) / m
        return (y - this.offsetY) / this.slope;
    }

    pointInBounds(point: Matter.Vector): boolean {
        // checks to see if the specified point is within
        // the ray's bounding box (inclusive)
        const minX = Math.min(this.start.x, this.end.x);
        const maxX = Math.max(this.start.x, this.end.x);
        const minY = Math.min(this.start.y, this.end.y);
        const maxY = Math.max(this.start.y, this.end.y);
        return (
            point.x >= minX
            && point.x <= maxX
            && point.y >= minY
            && point.y <= maxY);
    }

    calculateNormal(ref: Vector2): Vector2 {
        // calulates the normal based on a specified
        // reference point
        const dif = this.difference;

        // gets the two possible normals as points that lie
        // perpendicular to the ray
        const norm1 = dif.normalized().rotate(Math.PI / 2);
        const norm2 = dif.normalized().rotate(Math.PI / -2);

        // returns the normal that is closer to the provided
        // reference point
        if (this.start.plus(norm1).distance(ref) < this.start.plus(norm2).distance(ref)) { return norm1; }
        return norm2;
    }

    get difference(): Vector2 {
        // pretty self explanitory
        return this.end.minus(this.start);
    }

    get slope(): number {
        const dif = this.difference;
        return dif.y / dif.x;
    }

    get offsetY(): number {
        // the y-offset at x = 0, in slope-intercept form:
        // b = y - m * x
        // offsetY = start.y - slope * start.x
        return this.start.y - this.slope * this.start.x;
    }

    get isHorizontal(): boolean { return compareNum(this.start.y, this.end.y); }
    get isVertical(): boolean { return compareNum(this.start.x, this.end.x); }

    static intersect(rayA: Ray, rayB: Ray): Vector2 | null {
        // returns the intersection point between two rays
        // null if no intersection

        // conditional checks for axis aligned rays
        if (rayA.isVertical && rayB.isVertical) return null;
        if (rayA.isVertical) return new Vector2(rayA.start.x, rayB.yValueAt(rayA.start.x));
        if (rayB.isVertical) return new Vector2(rayB.start.x, rayA.yValueAt(rayB.start.x));
        if (compareNum(rayA.slope, rayB.slope)) return null;
        if (rayA.isHorizontal) return new Vector2(rayB.xValueAt(rayA.start.y), rayA.start.y);
        if (rayB.isHorizontal) return new Vector2(rayA.xValueAt(rayB.start.y), rayB.start.y);

        // slope intercept form:
        // y1 = m2 * x + b2; where y1 = m1 * x + b1:
        // m1 * x + b1 = m2 * x + b2:
        // x = (b2 - b1) / (m1 - m2)
        const x = (rayB.offsetY - rayA.offsetY) / (rayA.slope - rayB.slope);
        return new Vector2(x, rayA.yValueAt(x));
    }

    static collisionPoint(rayA: Ray, rayB: Ray): Vector2 | null {
        // returns the collision point of two rays
        // null if no collision
        const intersection = Ray.intersect(rayA, rayB);
        if (!intersection) return null;
        if (!rayA.pointInBounds(intersection)) return null;
        if (!rayB.pointInBounds(intersection)) return null;
        return intersection;
    }

    static bodyEdges(body: Matter.Body): Ray[] {
        // returns all of the edges of a body in the
        // form of an array of ray objects
        const r: Ray[] = [];
        for (let i = body.parts.length - 1; i >= 0; i--) {
            for (let k = body.parts[i].vertices.length - 1; k >= 0; k--) {
                let k2 = k + 1;
                if (k2 >= body.parts[i].vertices.length) { k2 = 0; }
                const tray = new Ray(
                    Vector2.fromOther(body.parts[i].vertices[k]),
                    Vector2.fromOther(body.parts[i].vertices[k2])
                );

                // stores the vertices inside the edge
                // ray for future reference
                tray.verts = [
                    body.parts[i].vertices[k],
                    body.parts[i].vertices[k2]];

                r.push(tray);
            }
        }
        return r;
    }

    static bodyCollisions(rayA: Ray, body: Matter.Body): Raycol[] {
        // returns all the collisions between a specified ray
        // and body in the form of an array of 'raycol' objects
        const r: Raycol[] = [];

        // gets the edge rays from the body
        const edges = Ray.bodyEdges(body);

        // iterates through each edge and tests for collision
        // with 'rayA'
        for (let i = edges.length - 1; i >= 0; i--) {
            // gets the collision point
            const colpoint = Ray.collisionPoint(rayA, edges[i]);

            // if there is no collision, then go to next edge
            if (!colpoint) continue;

            // calculates the edge's normal
            const normal = edges[i].calculateNormal(rayA.start);

            // adds the ray collision to the return array
            r.push(new Raycol(body, colpoint, normal, edges[i].verts));
        }

        return r;
    }
}

