import { Context2D } from './../../../shared/context-2d';
import { Toothpick, Direction } from './toothpick';

/**
 * @name Toothpicks
 * 
 * @author Bert Maurau
 * 
 * @description Main class for handling the simulation/virtualization
 */
export class Toothpicks extends Context2D {

    // holds the list of generated particles
    private toothpicks: Array<Toothpick> = [];

    /**
     * Construct this with the given canvas element
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas: HTMLCanvasElement) {

        // init the Context class
        super(canvas);

        // create the initial center toothpick
        this.toothpicks.push(new Toothpick(this.context, { x: this.canvas.width / 2, y: this.canvas.height / 2 }, Direction.Horizontal));

        // listen for mouseclicks to generate new toothpicks
        this.canvas.addEventListener('click', (event: MouseEvent) => {
            this.draw();
        });
    }

    /**
     * The draw function that gets executed via the mouse-click-event()
     * @returns {void}
     */
    public draw(): void {

        // set the background
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // holds the list of the newly generated toothpicks
        let nextList: Array<Toothpick> = [];

        // render the "old" toothpicks and generate the new ones
        for (let toothpick of this.toothpicks) {

            // render the current one
            toothpick.render();
        }

        // generate the toothpick's neighbours
        for (let toothpick of this.toothpicks) {

            if (toothpick.isNewToothpick) {
                // generate its neighbours
                nextList = [...nextList, ...toothpick.create(this.toothpicks)];

                // mark as an old one
                toothpick.isNewToothpick = false;
            }
        }

        // add all the new ones to the original list
        this.toothpicks = [...this.toothpicks, ...nextList];

    }
}