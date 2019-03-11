import { Star } from './star';
import { Context2D } from './../../../shared/context-2d';

/**
 * @name Starfield
 * 
 * @author Bert Maurau
 * 
 * @description Main class for handling the simulation/virtualization
 */
export class Starfield extends Context2D {

    // holds the list of generated particles
    private starfield: Array<Star> = [];

    /**
     * Construct this with the given canvas element
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas: HTMLCanvasElement) {

        // init the Context class
        super(canvas);

        // translate context to center of canvas
        this.context.translate(this.canvas.width / 2, this.canvas.height / 2);

        // add 100 stars to start with
        for (let index = 0; index < 500; index++) {
            this.starfield.push(this.createNewStar());
        }

    }

    /**
     * The draw function that gets executed via the requestAnimationFrame()
     * @returns {void}
     */
    public draw(): void {

        // set the background
        this.context.fillStyle = "black";
        this.context.fillRect(-this.canvas.width / 2, -this.canvas.height / 2, this.canvas.width, this.canvas.height);

        // render the particles
        for (let star of this.starfield) {

            // render the star on the context
            star.render();

            // check if star needs to be removed (when out of view)
            let isStarAlive = star.update();
            if (!isStarAlive) {
                // remove from array
                this.starfield.splice(this.starfield.indexOf(star), 1);

                // create new star
                this.starfield.push(this.createNewStar());
            }
        }

        // request next frame
        window.requestAnimationFrame(() => this.draw());

    }

    /**
     * Create a new star with a new random positon
     * @returns {Star} The new star
     */
    private createNewStar(): Star {
        return new Star(
            this.context, {
                x: this.getRandomPosition(-this.canvas.width / 2, this.canvas.width / 2),
                y: this.getRandomPosition(-this.canvas.height / 2, this.canvas.height / 2),
                z: this.getRandomPosition(0, this.canvas.height / 2),
            });
    }

    /**
     * Return a random value between 0 and the max-value
     * @param {number} max the max value
     * @returns {number} a random number between 0 and the max
     */
    private getRandomPosition(min: number, max: number): number {
        return Math.min(0 + (Math.random() * (max - min) + min), max);
    }
}