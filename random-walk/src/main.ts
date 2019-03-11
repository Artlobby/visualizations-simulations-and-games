import { RandomWalk } from './lib/random-walk';

// get the html canvas element
let canvas = <HTMLCanvasElement>document.getElementById('canvas');

// start a new starfield on given canvas
new RandomWalk(canvas);