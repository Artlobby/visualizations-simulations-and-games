import { Obstacle } from "./obstacle";
import { Position } from "./raycasting-2d";
import * as Vec2D from 'vector2d'
import { Vector } from "vector2d";

/**
 * @name Ray
 * 
 * @author Bert Maurau
 * 
 * @description A single Ray
 */
export class Ray {

    // holds the positions
    private position: Vec2D.Vector;

    // the direction
    private direction: Vec2D.Vector = new Vec2D.Vector(0, 0);

    // holds the context to draw in
    private context: CanvasRenderingContext2D;

    /**
     * Construct this with the given canvas element
     * @param {CanvasRenderingContext2D} context 
     * @param {Position} position 
     */
    constructor(context: CanvasRenderingContext2D, position: Position, angleRadians: number) {

        // set the position
        this.position = new Vec2D.Vector(position.x, position.y);

        // set the direction
        this.direction = new Vec2D.Vector(Math.cos(angleRadians), Math.sin(angleRadians));
        
        // set the context to draw in
        this.context = context;

    }

    /**
     * Draw the ray
     * @returns {void}
     */
    public draw(): void {

        this.context.save();
        this.context.translate(this.position.x, this.position.y);
        this.context.beginPath();
        this.context.moveTo(0, 0);
        this.context.lineTo(this.direction.x * 20, this.direction.y * 20);
        this.context.lineWidth = 1;
        this.context.strokeStyle = 'lightgrey';
        this.context.stroke();
        this.context.restore();
    }

    public lookAt(position: Position): void {
        this.direction.x = position.x - this.position.x;
        this.direction.y = position.y - this.position.y;
        this.direction.normalize();
    }

    public castTo(obstacle: Obstacle): Vec2D.Vector | null {

        let posWall: any = obstacle.getPosition();

        let x1 = posWall.a.x;
        let y1 = posWall.a.y;
        let x2 = posWall.b.x;
        let y2 = posWall.b.y;

        let x3 = this.position.x;
        let y3 = this.position.y;
        let x4 = this.position.x + this.direction.x;
        let y4 = this.position.y + this.direction.y;

        // let den1 = (posWall.a.x - posWall.b.x) * (this.position.y - (this.position.y + this.direction.y));
        // let den2 = (posWall.a.y - posWall.b.y) * (this.position.x - (this.position.x + this.direction.x));
        // let den = den1 - den2;
        let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den === 0) {
            return null;
        }

        // let _t_num1 = (posWall.a.x - this.position.x) * (this.position.y - (this.position.y + this.direction.y));
        // let _t_num2 = (posWall.a.y - this.position.y) * (this.position.x - (this.position.x + this.direction.x));
        // let _t_num = _t_num1 - _t_num2;

        // let t = _t_num / den;
        let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;

        // let _u_num1 = (posWall.a.x - posWall.b.x) * (posWall.a.y - (this.position.y + this.direction.y));
        // let _u_num2 = (posWall.a.y - this.position.y) * (this.position.x - (this.position.x + this.direction.x));
        // let _u_num = _u_num1 - _u_num2;

        // let u = -(_u_num / den);
        let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
        if (t > 0 && t < 1 && u > 0) {
            // has intersecting point
            let point = new Vec2D.Vector(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
            return point;
        }

        return null;
    }

}