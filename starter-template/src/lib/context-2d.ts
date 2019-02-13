
export class Context2D {

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

        // start the animation
        window.requestAnimationFrame(() => this.draw());

    }

    /**
     * Base function that gets requested via requestAnimationFrame (Gets overriden)
     */
    protected draw() {

    }
}