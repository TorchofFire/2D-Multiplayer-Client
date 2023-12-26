import Matter from 'matter-js';
import { graphicsService } from './graphics.service';
import { Ray, Vector2 } from '../objects/raycast';
import { mapService } from './map.service';
import { player } from '../main';

class RaycastService {
    rawMouse: Matter.Vector = {
        x: 0,
        y: 0
    };

    interpolatedMouse: Matter.Vector = {
        x: 0,
        y: 0
    };

    public logic(): void {
        this.interpMouse();
        // found topic on raycasting for matter.js here https://github.com/liabru/matter-js/issues/181
        const collisions = this.raycast(mapService.collisionBodies, player.body.position, this.interpolatedMouse);
        console.log(collisions);
    }

    private interpMouse(): void {
        const adjustedMouse = { x: this.rawMouse.x - window.innerWidth / 2, y: this.rawMouse.y - window.innerHeight / 2 };
        this.interpolatedMouse = Matter.Vector.mult(Matter.Vector.add(adjustedMouse, graphicsService.centerOfBounds), graphicsService.zoom);
    }

    private raycast(bodies: Matter.Body[], s: Matter.Vector, e: Matter.Vector, sort = true): Matter.Bodies {
        // Credit to Technostalgic
        // JS Code grabbed and turned into TS from pastebin link https://pastebin.com/7M2CvK29

        // convert the start & end parameters to my custom
        // 'Vector2' object type
        const start = Vector2.fromOther(s);
        const end = Vector2.fromOther(e);

        // The bodies that the raycast will be tested against
        // are queried and stored in the variable 'query'.
        // This uses the built-in raycast method which takes
        // advantage of the broad-phase collision optomizations
        // instead of iterating through each body in the list
        const query = Matter.Query.ray(bodies, start, end);

        // 'cols': the array that will contain the ray
        // collision information
        const cols = [];
        // 'raytest': the ray object that will be tested for
        // collision against the bodies
        const raytest = new Ray(start, end);

        // Next, since all the bodies that the ray collides with
        // have already been queried, we iterate through each
        // one to see where the ray intersects with the body
        // and gather other information
        for (let i = query.length - 1; i >= 0; i--) {
            const bcols = Ray.bodyCollisions(raytest, query[i].parentA);
            for (let k = bcols.length - 1; k >= 0; k--) {
                cols.push(bcols[k]);
            }
        }

        // if desired, we then sort the collisions based on the
        // disance from the ray's start
        if (sort) {
            cols.sort((a, b) => {
                return a.point.distance(start) - b.point.distance(start);
            }); // fix from singerbj
        }

        return cols;

    }
}

export const raycastService = new RaycastService();

document.addEventListener('mousemove', event => {
    raycastService.rawMouse = { x: event.clientX, y: event.clientY };
});
