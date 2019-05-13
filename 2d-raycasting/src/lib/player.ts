import { Obstacle } from "./obstacle";
import { Position } from "./raycasting-2d";
import * as Vec2D from 'vector2d'
import { Ray } from "./ray";

/**
 * @name Player
 * 
 * @author Bert Maurau
 * 
 * @description The Player
 */
export class Player {

    // holds the positions
    private position: Vec2D.Vector;

    // the rays
    private rays: Array<Ray> = [];

    // holds the context to draw in
    private context: CanvasRenderingContext2D;

    private fov: number = 360;

    /**
     * Construct this with the given canvas element
     * @param {CanvasRenderingContext2D} context 
     * @param {Position} position 
     */
    constructor(context: CanvasRenderingContext2D, position: Position, fov?: number) {

        // set the context to draw in
        this.context = context;

        // set the position
        this.position = new Vec2D.Vector(position.x, position.y);

        if (typeof fov === 'undefined') {
            fov = 360;
        }

        // save the fov
        this.fov = fov;

        // set the initial position
        this.moveTo(this.position);
    }

    /**
     * Draw the "player"
     */
    public draw(): void {
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI, true);
        this.context.fillStyle = 'blue';
        this.context.fill();
        this.context.lineWidth = 0;
        this.context.strokeStyle = 'black';
        this.context.stroke();
    }

    /**
     * Move the player to given position
     * @param {Position} position 
     */
    public moveTo(position: Position): void {
        this.position = new Vec2D.Vector(position.x, position.y);

        // beam the rays
        this.rays = [];
        for (let angle = 0; angle < this.fov; angle += 1) {
            this.rays = [...this.rays, new Ray(this.context, this.position, angle * (Math.PI / 180))];
        }
    }

    /**
     * Draw the vision of the player
     * @param {Array<obstacles>} obstacles
     * @returns {void}
     */
    public drawVision(obstacles: Array<Obstacle>): void {

        this.rays.forEach((ray: Ray) => {

            // draw the short ray
            ray.draw();

            let closest: Vec2D.Vector = new Vec2D.Vector(0, 0);
            let closestFound: boolean = false;
            let record = Infinity;

            obstacles.forEach((obstacle: Obstacle) => {

                // check for point of obstacle
                let point = ray.castTo(obstacle);
                if (point) {

                    let distance = this.position.distance(point);
                    if (distance < record) {

                        // set new record distance
                        record = distance;

                        // set the closest point
                        closest = point;
                        closestFound = true;
                    }

                    // get the closest value
                    record = Math.min(distance, record);
                }
            });

            // draw the actual full ray from this position to the point of intersection
            if (closestFound) {
                this.context.beginPath();
                this.context.moveTo(this.position.x, this.position.y);
                this.context.lineTo(closest.x, closest.y);
                this.context.lineWidth = 1;
                this.context.strokeStyle = 'grey';
                this.context.stroke();
            }
        });
    }

}