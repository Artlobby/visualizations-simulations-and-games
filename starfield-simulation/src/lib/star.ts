import { mapRange } from './../../../shared/map-range';

interface IPosition {
    x: number,
    y: number,
    z: number,
}

/**
 * @name Star
 * 
 * @author Bert Maurau
 * 
 * @description Sub class for handling an individual Particle of the Flock
 */
export class Star {

    // holds the star's position
    private position: IPosition;

    // the origin position z
    private origin: number;

    // the context to draw on
    private context: CanvasRenderingContext2D;

    // allow for a specific speed to travel in
    private speed: number = 10;

    /**
     * Construct a new Star
     * @param {CanvasRenderingContext2D} context the context to draw on
     * @param {number} positionX the starting position-x
     * @param {number} positionY the starting position-y
     * @param {number} positionZ the starting position-z
     */
    constructor(context: CanvasRenderingContext2D, position: IPosition) {

        // set the context
        this.context = context;

        // init the starting position
        this.position = position;

        // keep track of origin position for trailing
        this.origin = position.z;

    }

    /**
     * Draw/render the particle on the set context
     * @returns {void}
     */
    public render(): void {

        // calculate new size (larger when closer)
        let size: number = mapRange(this.position.z, 0, 400, 10, 0);

        // calculate the previous position for the trailing
        let prevX: number = mapRange(this.position.x / this.origin, 0, 1, 0, 800);
        let prevY: number = mapRange(this.position.y / this.origin, 0, 1, 0, 600);

        // calculate the new position
        let newX: number = mapRange(this.position.x / this.position.z, 0, 1, 0, 800);
        let newY: number = mapRange(this.position.y / this.position.z, 0, 1, 0, 600);

        // check for >0 to prevent radius from being <0
        if (size > 0) {

            // draw the star (circle)
            this.context.beginPath();
            this.context.arc(newX, newY, size, 0, 2 * Math.PI, true);
            this.context.fillStyle = 'white';
            this.context.fill();
            this.context.lineWidth = 1;
            this.context.strokeStyle = 'white';
            this.context.stroke();

            // add a trail (line)
            this.origin = this.position.z;
            this.context.beginPath();
            this.context.moveTo(prevX, prevY);
            this.context.lineTo(newX, newY);
            this.context.stroke();
        }
    }

    /**
     * Update the star's position and return if "dead" (out of view) or not
     * @returns {boolean}
     */
    public update(): boolean {

        // get new "depth" postition based on the speed
        this.position.z = this.position.z - this.speed;

        if (this.position.z < 1) {
            // destroy the star and let the parent create a new one
            return false;
        }

        return true;
    }

}