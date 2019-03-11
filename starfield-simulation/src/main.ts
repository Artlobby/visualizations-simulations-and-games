import { Starfield } from './lib/starfield';

// get the html canvas element
let canvas = <HTMLCanvasElement>document.getElementById('canvas');

// start a new starfield on given canvas
new Starfield(canvas);