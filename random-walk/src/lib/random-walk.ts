import { Walker } from './walker';
import { Context2D } from './../../../shared/context-2d';

/**
 * @name RandomWalk
 * 
 * @author Bert Maurau
 * 
 * @description Main class for handling the simulation/virtualization
 */
export class RandomWalk extends Context2D {

    // the actual walker-object
    private walker: Walker;

    /**
     * Construct this with the given canvas element
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas: HTMLCanvasElement) {

        // init the Context class
        super(canvas);

        // translate context to center of canvas
        this.context.translate(this.canvas.width / 2, this.canvas.height / 2);

        // init a new Walker
        this.walker = new Walker(this.context, this.canvas.width / 2, this.canvas.height / 2);

        // set the background (just once to keep the "history")
        this.context.fillStyle = "white";
        this.context.fillRect(-this.canvas.width / 2, -this.canvas.height / 2, this.canvas.width, this.canvas.height);

    }

    /**
     * The draw function that gets executed via the requestAnimationFrame()
     * @returns {void}
     */
    public draw(): void {

        // just to make him walk faster
        for (let index = 0; index < 5; index++) {

            // walk you peasant..
            this.walker.walk();
            this.walker.render();
        }

        // request next frame
        window.requestAnimationFrame(() => this.draw());

    }
}