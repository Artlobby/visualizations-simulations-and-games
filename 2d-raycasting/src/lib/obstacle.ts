
/**
 * A postion
 */
export interface Position {
    x: number,
    y: number,
}

/**
 * @name Obstacle
 * 
 * @author Bert Maurau
 * 
 * @description A single obstacle
 */
export class Obstacle {

    // holds the positions
    private pointA: Position;
    private pointB: Position;

    // holds the context to draw in
    private context: CanvasRenderingContext2D;

    /**
     * Construct this with the given canvas element
     * @param {CanvasRenderingContext2D} context 
     * @param {Position} position 
     */
    constructor(context: CanvasRenderingContext2D, pointA: Position, pointB: Position) {

        // set the positions
        this.pointA = pointA;
        this.pointB = pointB;

        // set the context to draw in
        this.context = context;

    }

    /**
     * Draw the obstacle
     * @returns {void}
     */
    public draw(): void {

        this.context.beginPath();
        this.context.moveTo(this.pointA.x, this.pointA.y);
        this.context.lineTo(this.pointB.x, this.pointB.y);
        this.context.lineWidth = 5;
        this.context.strokeStyle = 'white';
        this.context.stroke();

    }

    /**
     * Get the position of the obstacle
     * @returns {any} The position of point A and B
     */
    public getPosition(): any {
        return { a: this.pointA, b: this.pointB };
    }

}