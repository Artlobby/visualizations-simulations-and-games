import * as Vec2D from 'vector2d'

/**
 * @name Particle
 * 
 * @author Bert Maurau
 * 
 * @description Sub class for handling an individual Particle of the Flock
 */
export class Particle {

    // holds the particle's position
    private position: Vec2D.Vector;

    // the velocity of the particle
    private velocity: Vec2D.Vector;

    // the acceleration
    private acceleration: Vec2D.Vector = new Vec2D.Vector(0, 0);

    // the context to draw on
    private context: CanvasRenderingContext2D;

    // allow for specific maximum force to move in
    private maxForce: number = 0.05;

    // allow for a specific maximum speed to travel in
    private maxSpeed: number = 3;

    /**
     * Construct a new Particle
     * @param {CanvasRenderingContext2D} context the context to draw on
     * @param {number} positionX the starting position-x
     * @param {number} positionY the starting position-y
     */
    constructor(context: CanvasRenderingContext2D, positionX: number, positionY: number) {

        // set the context
        this.context = context;

        // init the starting position
        this.position = new Vec2D.Vector(positionX, positionY);

        // give it a random velocity
        this.velocity = this.getRandomVelocity();
        
    }

    /**
     * Draw/render the particle on the set context
     * @returns {void}
     */
    public render(): void {
        this.context.beginPath();
        this.context.arc(this.position.getX(), this.position.getY(), 5, 0, 2 * Math.PI, true);
        this.context.fillStyle = 'blue';
        this.context.fill();
        this.context.lineWidth = 1;
        this.context.strokeStyle = 'white';
        this.context.stroke();
    }

    /**
     * Update the particle's position based on the acceleration and the veloctiy
     * @returns {void}
     */
    public update(): void {
        this.velocity.add(this.acceleration);
        this.velocity = this.limitVector(this.velocity, this.maxSpeed);
        this.position.add(this.velocity);

        // reset the acceleration
        this.acceleration.setAxes(0,0);
    }

    /**
     * Function to check for neighbours and align with them
     * @param {Array<Particle>} particles list of all particles
     * @param {number} range the range to check neighbours in
     * @returns {void}
     */
    public flockWith(particles: Array<Particle>, ranges: Array<number> = [50, 50, 25]): void {        
        
        // calculate all the averages
        let alignment = this.alignTo(particles, ranges[0]);
        let cohesion = this.coheseTo(particles, ranges[1]);
        let separation = this.separateFrom(particles, ranges[2]);

        // add variable weights
        separation.mulS(1.5);
        alignment.mulS(1.0);
        cohesion.mulS(1.0);
        
        // add the forces
        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

    /**
     * Align to the average direction of the current particle's neighbours
     * @param {Array<Particle>} particles list of all particles
     * @param {range} range the distance to check particles in
     * @returns {Vec2D.Vector}
     */
    private alignTo(particles: Array<Particle>, range: number): Vec2D.Vector {

        let avgDirection = new Vec2D.Vector(0, 0);
        let total: number = 0;

        // iterate the given flock of particles
        for (let particle of particles) {

            // calculate the distance between this and the given particle
            let distance = this.position.distance(particle.position)

            // check if particle is within distance and not self
            if (particle !== this && distance > 0 && distance < range) {
                avgDirection.add(particle.velocity);

                // increase the total for the average value
                total++;
            }
        }

        // point towards the average direction
        if (total > 0) {
            avgDirection.divideByScalar(total);
            avgDirection.normalize();
            avgDirection.multiplyByScalar(this.maxSpeed)
            avgDirection = this.limitVector(avgDirection, this.maxForce);
        }

        return avgDirection;
    }

    /**
     * Cohese to the average location of the current particle's neighbours
     * @param {Array<Particle>} particles list of all particles
     * @param {range} range the distance to check particles in
     * @returns {Vec2D.Vector}
     */
    private coheseTo(particles: Array<Particle>, range: number): Vec2D.Vector {

        let avgLocation = new Vec2D.Vector(0, 0);
        let total: number = 0;

        // iterate the given flock of particles
        for (let particle of particles) {

            // calculate the distance between this and the given particle
            let distance = this.position.distance(particle.position)

            // check if particle is within distance and not self
            if (particle !== this && distance > 0 && distance < range) {
                avgLocation.add(particle.position);

                // increase the total for the average value
                total++;
            }
        }

        // steer towards the average location
        if (total > 0) {
            avgLocation.divideByScalar(total);
            let desired = avgLocation.clone().subtract(this.position);
            desired.normalize();
            desired.multiplyByScalar(this.maxSpeed);
            let steer = desired.clone().subtract(this.velocity);
            avgLocation = this.limitVector(steer, this.maxForce);
        }

        return avgLocation;
    }

    /**
     * Separete from the average location of the current particle's neighbours
     * @param {Array<Particle>} particles list of all particles
     * @param {range} range the distance to check particles in
     * @returns {Vec2D.Vector}
     */
    private separateFrom(particles: Array<Particle>, range: number): Vec2D.Vector {

        let avgLocation = new Vec2D.Vector(0, 0);
        let total: number = 0;

        // iterate the given flock of particles
        for (let particle of particles) {

            // calculate the distance between this and the given particle
            let distance = this.position.distance(particle.position)

            // check if particle is within distance and not self
            if (particle !== this && distance > 0 && distance < range) {
                let difference = this.position.clone().subtract(particle.position);
                difference.normalize();
                avgLocation.divideByScalar(distance);
                avgLocation.add(difference);

                // increase the total for the average value
                total++;
            }
        }

        if (total > 0) {
            avgLocation.divideByScalar(total);
          }

        // steer away from the avarage location
        if (avgLocation.magnitude() > 0) {
            avgLocation.normalize();
            avgLocation.multiplyByScalar(this.maxSpeed);
            avgLocation.subtract(this.velocity);
            avgLocation = this.limitVector(avgLocation, this.maxForce);
        }

        return avgLocation;
    }

    /**
     * Return a random value between -1 and 1 as vector
     * @returns {Vec2D.Vector} random vector
     */
    private getRandomVelocity(): Vec2D.Vector {
        let value = (Math.floor(Math.random() * 2) == 1 ? 1 : -1) * Math.random();
        return new Vec2D.Vector(value, value);
    }

    /**
     * Reset the particle's position if end is reached
     * @param {number} width the edge horizontally
     * @param {number} height the edge vertically
     * @returns {void}
     */
    public resetIfOnEdge(width: number, height: number): void {
        this.position.x = (this.position.x > width) ? 0 : (this.position.x < 0) ? width : this.position.x;
        this.position.y = (this.position.y > height) ? 0 : (this.position.y < 0) ? height : this.position.y;
    }

    /**
     * Limit a vector to the given maxValue
     * @param {any} vector the vector to limit
     * @param {number} maxValue the maxValue to limit to
     * @returns {any} Vector or AbstractVector
     */
    private limitVector(vector: any, maxValue: number): any {
        let squaredMagnitude = vector.x * vector.x + vector.y * vector.y;
        if (squaredMagnitude > maxValue * maxValue) {
            vector.divideByScalar(Math.sqrt(squaredMagnitude)).multiplyByScalar(maxValue);
        }
        return vector;
    }

}