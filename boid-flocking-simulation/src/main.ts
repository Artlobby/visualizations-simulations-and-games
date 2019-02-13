import { Flocking } from './lib/flocking';

// get the html canvas element
let canvas = <HTMLCanvasElement>document.getElementById('canvas');

new Flocking(canvas);