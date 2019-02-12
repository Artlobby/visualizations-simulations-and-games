import * as Vec2D from 'vector2d'

export class Particle {

    // holds the particle's position
    private position: Vec2D.Vector;
    
    // the velocity of the particle
    private velocity: Vec2D.Vector;

    // the acceleration
    private acceleration: Vec2D.Vector = new Vec2D.Vector(0,0);

    // the context to draw on
    private context: CanvasRenderingContext2D;

    /**
     * Construct a new Particle
     * @param {CanvasRenderingContext2D} context the context to draw on
     * @param {number} positionX the starting position-x
     * @param {number} positionY the starting position-y
     */
    constructor(context: CanvasRenderingContext2D, positionX: number, positionY: number) {

        // set the context
        this.context = context;

        // init the starting position
        this.position = new Vec2D.Vector(positionX, positionY);

        // give it a random velocity
        this.velocity =this.getRandomVector();
    }

    /**
     * Return a random value between -1 and 1 as vector
     * @returns {Vec2D.Vector} random vector
     */
    private getRandomVector(): Vec2D.Vector {
        let value = (Math.floor(Math.random()*2) == 1 ? 1 : -1) * Math.random();
        return new Vec2D.Vector(value, value);
    }

    /**
     * Draw/render the particle on the set context
     */
    public render(): void {
        this.context.beginPath();
        this.context.arc(this.position.getX(), this.position.getY(), 10, 0, 2 * Math.PI, true);
        this.context.fillStyle = 'blue';
        this.context.fill();
        this.context.lineWidth = 1;
        this.context.strokeStyle = 'white';
        this.context.stroke();
    }

    /**
     * Update the particle's position based on the veloctiy
     */
    public update(): void {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
    }

}