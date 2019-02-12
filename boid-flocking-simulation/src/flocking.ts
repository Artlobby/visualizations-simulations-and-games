import { Particle } from './particle';
import { Context } from './context';

export class Flocking extends Context {

    // holds the list of generated particles
    private flock: Array<Particle> = [];

    constructor(canvas: HTMLCanvasElement) {

        // init the Context class
        super(canvas);

        // add new particle
        this.flock.push(new Particle(this.context, this.canvas.width / 2, this.canvas.height / 2));

    }

    /**
     * Override the main Context draw function that gets
     * executed via the requestAnimationFrame()
     */
    protected draw() {

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

let canvas = <HTMLCanvasElement>document.getElementById('canvas');
new Flocking(canvas);