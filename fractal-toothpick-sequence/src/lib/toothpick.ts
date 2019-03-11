/**
 * @name Toothpick
 * 
 * @author Bert Maurau
 * 
 * @description Sub class for handling an individual Toothpick of the visualization
 */

// the global length of a toothpick
const length: number = 15;

/**
 * A postion
 */
export interface Position {
    x: number,
    y: number,
}

/**
 * The available directions
 */
export enum Direction {
    Vertical,
    Horizontal,
}

export class Toothpick {

    // the endpoints of the toothpick
    private a: Position;
    private b: Position;

    // the direction of the toothpick
    private direction: Direction;

    // the context to draw on
    private context: CanvasRenderingContext2D;

    // keep track if it's a newly generated toothpick or not
    public isNewToothpick: boolean = true;

    /**
     * Construct a new Toothpick
     * @param {CanvasRenderingContext2D} context the context to draw on
     * @param {Position} position the position
     * @param {Direction} direction the direction
     */
    constructor(context: CanvasRenderingContext2D, position: Position, direction: Direction) {

        // set the context
        this.context = context;

        // set the direction
        this.direction = direction;

        // calculate positons based on the directions
        if (this.direction === Direction.Horizontal) {
            this.a = { x: position.x - (length / 2), y: position.y };
            this.b = { x: position.x + (length / 2), y: position.y };
        } else {
            this.a = { x: position.x, y: position.y - (length / 2) };
            this.b = { x: position.x, y: position.y + (length / 2) };
        }
    }

    /**
     * Render the current toothpick on the canvas
     */
    public render(): void {
        this.context.beginPath();
        this.context.moveTo(this.a.x, this.a.y);
        this.context.lineTo(this.b.x, this.b.y);
        this.context.lineWidth = 1;
        this.context.strokeStyle = (this.isNewToothpick ? 'red' : 'white');
        this.context.stroke();
    }

    /**
     * Create the neighbours for the current toothpick
     * @param {Array<Toothpick>} otherToothpicks list of others
     */
    public create(otherToothpicks: Array<Toothpick>): Array<Toothpick> {

        // keep track of availabilty
        let availableA: boolean = true;
        let availableB: boolean = true;

        // check for availablity
        for (let toothpick of otherToothpicks) {
            if (toothpick !== this && toothpick.intersects(this.a)) {
                availableA = false;
            }
            if (toothpick !== this && toothpick.intersects(this.b)) {
                availableB = false;
            }
        }

        // create new toothpicks if available
        let output: Array<Toothpick> = [];
        if (availableA) {
            output.push(new Toothpick(this.context, this.a, this.direction * -1));
        }
        if (availableB) {
            output.push(new Toothpick(this.context, this.b, this.direction * -1));
        }

        return output;
    }

    /**
     * Check if the given position intersects with the current position
     * @param {Position} postion the position to check with
     */
    private intersects(postion: Position): boolean {

        if (postion.x === this.a.x && postion.y === this.a.y) {
            // if point a intersects
            return true;
        } else if (postion.x === this.b.x && postion.y === this.b.y) {
            // if point b intersects
            return true;
        }
        return false;
    }


}