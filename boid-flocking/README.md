# Boids

Boids is an artificial life program, developed by Craig Reynolds in 1986, which simulates the flocking behaviour of birds. His paper on this topic was published in 1987 in the proceedings of the ACM SIGGRAPH conference. The name "boid" corresponds to a shortened version of "bird-oid object", which refers to a bird-like object. Incidentally, "boid" is also a New York Metropolitan dialect pronunciation for "bird".

As with most artificial life simulations, Boids is an example of emergent behavior; that is, the complexity of Boids arises from the interaction of individual agents (the boids, in this case) adhering to a set of simple rules. The rules applied in the simplest Boids world are as follows:

 - separation: steer to avoid crowding local flockmates
 - alignment: steer towards the average heading of local flockmates
 - cohesion: steer to move towards the average position (center of mass) of local flockmates

## Demo

[Here](https://bertmaurau.be/projects/visualizations-and-simulations/boid-flocking/)


## Build

```
npm install && npm run build
```

Open the `index.html` in your browser.