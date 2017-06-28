const config = require('../constants');
const helpers = require('../helpers');
const particle = require('./orbitParticles');

module.exports = (canvas, c) => {

	const Particle = particle(canvas, c);
	const particles = ['','','','','','','','',];
	// const particles = new Array(10);

	return function Atom(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.originalRadius = radius;
		this.beatRadius = radius * 1.2;
		this.color = color;
		// this.particle = [];

		// this.particles = particles.map(() => {
		// 	const rand1 = Math.random();
		// 	const rand2 = Math.random();
		//
		// 	const particle = new Particle(canvas.width/2, canvas.height/2, (rand1 * 300), (rand2 * 300), 2, '#F2F3F4', (rand1 * 2 * Math.PI));
		// 	return particle;
		// })
		// console.log('this.particles', this.particles);


		this.particles = [
			new Particle(canvas.width/2, canvas.height/2, 150, 300, 2, '#F2F3F4', 0, 1, 1),
			new Particle(canvas.width/2, canvas.height/2, 300, 150, 2, '#F2F3F4', 0, 1, 1),
			new Particle(canvas.width/2, canvas.height/2, 300, 150, 2, '#F2F3F4', (80 * (Math.PI/180)), 1 , 1),
			new Particle(canvas.width/2, canvas.height/2, 300, 150, 2, '#F2F3F4', (260 * (Math.PI/180)), -1 , -1),
		];

// new Particle(canvas.width/2, canvas.height/2, 50, 100, 2, '#F2F3F4')

		this.update = (timer) => {
			this.particles.forEach((particle) => {
				particle.update(timer);
			});

			if (timer % 10 === 0) {
				this.radius = this.beatRadius;
			} else {
				this.radius = this.originalRadius;
			}

			this.draw();
		};

		this.draw = () => {

			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			c.fillStyle = this.color;
			c.shadowColor = '#F2F3F4';
			c.shadowBlur = 50;
			c.fill();
			c.closePath();
		};
	}
}
