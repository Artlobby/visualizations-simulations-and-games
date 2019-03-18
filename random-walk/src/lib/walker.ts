interface IPosition {
    x: number,
    y: number,
}

enum Direction {
    UP,
    RIGHT,
    DOWN,
    LEFT,
}

/**
 * @name Walker
 * 
 * @author Bert Maurau
 * 
 * @description Sub class for the actual Walker
 */
export class Walker {

    // holds the star's position
    private position: IPosition;

    // the context to draw on
    private context: CanvasRenderingContext2D;

    // canvas width/height
    private width: number;
    private height: number;

    /**
     * Construct a new Star
     * @param {CanvasRenderingContext2D} context the context to draw on
     * @param {number} positionX the starting position-x
     * @param {number} positionY the starting position-y
     * @param {number} positionZ the starting position-z
     */
    constructor(context: CanvasRenderingContext2D, width: number, height: number) {

        // set the context
        this.context = context;

        // init the starting position
        this.position = { x: 0, y: 0 };

        // keep track of canvas size fof the boundaries
        this.width = width;
        this.height = height;

    }

    /**
     * Draw/render the walker on the set context
     * @returns {void}
     */
    public render(): void {

        // draw the star (circle)
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, true);
        this.context.fillStyle = 'black';
        this.context.fill();

    }

    /**
     * Walk to a new position
     * @returns {void}
     */
    public walk(): void {

        switch (Math.floor(Math.random() * Object.keys(Direction).length)) {
            case 0:
                this.position.y -= 10;
                break;
            case 1:
                this.position.x += 10;
                break;
            case 2:
                this.position.y += 10;
                break;
            case 3:
                this.position.x -= 10;
                break;
        }

        // check for boundaries
        if (this.position.x <= -this.width) {
            this.position.x = this.width;
        } else if (this.position.x >= this.width) {
            this.position.x = -this.width;
        }
        if (this.position.y <= -this.height) {
            this.position.y = this.height;
        } else if (this.position.y >= this.height) {
            this.position.y = -this.height;
        }

    }

}