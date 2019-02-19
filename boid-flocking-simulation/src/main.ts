import { Flocking } from './lib/flocking';

// get the html canvas element
let canvas = <HTMLCanvasElement>document.getElementById('canvas');

// start a new flocking on given canvas with a flocking-range of 50
new Flocking(canvas, 50);