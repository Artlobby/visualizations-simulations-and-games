import { Context2D } from './../../../shared/context-2d';
import { Obstacle } from './obstacle';
import { Ray } from './ray';
import { Player } from './player';

/**
 * A postion
 */
export interface Position {
    x: number,
    y: number,
}

/**
 * @name Raycasting2D
 * 
 * @author Bert Maurau
 * 
 * @description Main class for handling the simulation/virtualization
 */
export class Raycasting2D extends Context2D {

    // holds the position of the cursor
    private positionMouse: Position = { x: 0, y: 0 };

    // list of obstacles to render
    private obstacles: Array<Obstacle> = [];

    // list of rays to render
    // private rays: Array<Ray> = [];

    private player: Player;

    /**
     * Construct this with the given canvas element
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas: HTMLCanvasElement) {

        // init the Context class
        super(canvas);

        // add mousemove listener
        document.addEventListener('mousemove', this.onMouseMove)

        // generate some obstacles
        for (let index = 0; index < 6; index++) {

            // generate some random positions
            let posA: Position = { x: Math.random() * this.canvas.width, y: Math.random() * this.canvas.height };
            let posB: Position = { x: Math.random() * this.canvas.width, y: Math.random() * this.canvas.height };

            this.obstacles = [...this.obstacles, new Obstacle(this.context, posA, posB)];

        }

        // add the screen borders as well
        this.obstacles = [...this.obstacles, new Obstacle(this.context, { x: 0, y: 0 }, { x: 0, y: this.canvas.height })];
        this.obstacles = [...this.obstacles, new Obstacle(this.context, { x: 0, y: this.canvas.height }, { x: this.canvas.width, y: this.canvas.height })];
        this.obstacles = [...this.obstacles, new Obstacle(this.context, { x: this.canvas.width, y: this.canvas.height }, { x: this.canvas.width, y: 0 })];
        this.obstacles = [...this.obstacles, new Obstacle(this.context, { x: this.canvas.width, y: 0 }, { x: 0, y: 0 })];

        // create a new moveable player
        this.player = new Player(this.context, { x: this.canvas.width / 2, y: this.canvas.height / 2 }, 360);
    }

    /**
     * The draw function that gets executed via the requestAnimationFrame()
     * @returns {void}
     */
    public draw(): void {

        // set the background
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // render every obstacle
        this.obstacles.forEach((obstacle: Obstacle) => {
            obstacle.draw();
        });

        // draw the player and its vision
        this.player.moveTo(this.positionMouse);
        this.player.draw();
        this.player.drawVision(this.obstacles);

        // request next frame
        window.requestAnimationFrame(() => this.draw());

    }

    public onMouseMove: { (event: MouseEvent): void } = (event: MouseEvent) => {
        this.positionMouse = { x: event.pageX, y: event.pageY };
    }

}