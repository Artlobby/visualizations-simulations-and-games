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

    // the range a particle should flock with
    private flockRange: number = 50;

    /**
     * Construct this with the given canvas element
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas: HTMLCanvasElement, flockRange: number) {

        // init the Context class
        super(canvas);

        // set the range
        this.flockRange = flockRange;

        // add 100 particles to start with
        for (let index = 0; index < 150; index++) {
            this.flock.push(new Particle(
                this.context, 
                this.getRandomPosition(this.canvas.width), 
                this.getRandomPosition(this.canvas.height)));
        }

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
            particle.resetIfOnEdge(this.canvas.width, this.canvas.height);

            // flock with ranges: alignment | cohesion | separation
            particle.flockWith(this.flock, [50, 50, 25]);
            particle.update();
            particle.render();
        }

        // request next frame
        window.requestAnimationFrame(() => this.draw());

    }

    /**
     * Return a random value between 0 and the max-value
     * @param {number} max the max value
     * @returns {number} a random number between 0 and the max
     */
    private getRandomPosition(max: number): number {
        return Math.min(0 + (Math.random() * max), max);
    }
}