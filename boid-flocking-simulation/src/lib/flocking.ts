import { Particle } from './particle';
import { Context2D } from './../../../shared/context-2d';

/**
 * @name Flocking
 * 
 * @author Bert Maurau
 * 
 * @description Main class for handling the simulation/virtualization
 */
export class Flocking extends Context2D {

    // holds the list of generated particles
    private flock: Array<Particle> = [];

    /**
     * Construct this with the given canvas element
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas: HTMLCanvasElement) {

        // init the Context class
        super(canvas);

        // add new particle
        this.flock.push(new Particle(this.context, this.canvas.width / 2, this.canvas.height / 2));

    }

    /**
     * The draw function that gets executed via the requestAnimationFrame()
     * @returns {void}
     */
    public draw(): void {

        // set the background
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // render the particles
        for (let particle of this.flock) {
            particle.update();
            particle.render();
        }

        // request next frame
        window.requestAnimationFrame(() => this.draw());

    }
}