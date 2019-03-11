
/**
 * @name Context2D
 * 
 * @author Bert Maurau
 * 
 * @description Main shared initializer and handler for the Canvas 2D Context.
 * Initializes the given canvas-element, assigns the context and
 * starts the requestAnimationFrame caller.
 */
export abstract class Context2D {

    // holds the html canvas element
    protected canvas: HTMLCanvasElement;

    // holds the 2D context of the canvas
    protected context: CanvasRenderingContext2D;

    /**
     * Construct this with the given canvas element
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas: HTMLCanvasElement) {

        // load the canvas and the 2D context
        this.canvas = canvas;
        this.context = <CanvasRenderingContext2D>this.canvas.getContext('2d');

        // set the canvas to the resolution of the screen
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // start the animation
        window.requestAnimationFrame(() => this.draw());

    }

    /**
     * Base function that gets requested via requestAnimationFrame
     * @returns {void}
     */
    abstract draw(): void;
}