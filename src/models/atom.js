const config = require('../constants');
const helpers = require('../helpers');
const particle = require('./orbitParticles');

module.exports = (canvas, c) => {

	const Particle = particle(canvas, c);

	return function Atom(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.originalRadius = radius;
		this.beatRadius = radius * 1.3;
		this.maxRadius = radius * 1.8;
		this.color = color;
		this.visualizeMode = false;

		let delays = ['','','','','',''];
		delays = delays.map((item) => (Math.random()/5 + 0.8))

		this.particles = [
			new Particle(canvas.width/2, canvas.height/2, 150, 300, 5, 0, 1, 1),
			new Particle(canvas.width/2, canvas.height/2, 300, 150, 5, 0, 1, 1),
			new Particle(canvas.width/2, canvas.height/2, 300, 150, 5, (80 * (Math.PI/180)), -1, -1),
			new Particle(canvas.width/2, canvas.height/2, 300, 150, 5, (80 * (Math.PI/180)), 1 , 1),
			new Particle(canvas.width/2, canvas.height/2, 300, 150, 5, (240 * (Math.PI/180)), -1 , -1),

			// new Particle(canvas.width/2, canvas.height/2, 150, 300, 5, 0, 1, 1, 0.05),
			// new Particle(canvas.width/2, canvas.height/2, 300, 150, 5, 0, 1, 1, 0.05),
			// new Particle(canvas.width/2, canvas.height/2, 300, 150, 5, (80 * (Math.PI/180)), 1 , 1, 0.05),
			// new Particle(canvas.width/2, canvas.height/2, 300, 150, 5, (80 * (Math.PI/180)), -1, -1, 0.05),
			// new Particle(canvas.width/2, canvas.height/2, 300, 150, 5, (240 * (Math.PI/180)), -1 , -1, 0.05),

			// new Particle(canvas.width/2, canvas.height/2, 150, 300, 5, 0, 1, 1, 0.1),
			// new Particle(canvas.width/2, canvas.height/2, 300, 150, 5, 0, 1, 1, 0.1),
			// new Particle(canvas.width/2, canvas.height/2, 300, 150, 5, (80 * (Math.PI/180)), 1 , 1, 0.1),
			// new Particle(canvas.width/2, canvas.height/2, 300, 150, 5, (80 * (Math.PI/180)), -1, -1, 0.1),
			// new Particle(canvas.width/2, canvas.height/2, 300, 150, 5, (240 * (Math.PI/180)), -1 , -1, 0.1),

		];

// new Particle(canvas.width/2, canvas.height/2, 50, 100, 2, '#F2F3F4')

		this.update = (timer) => {
			const delayedTimer = delays.map((delay) => {
				return timer * delay;
			})

			for (let i = 0; i < this.particles.length; i++) {
				let time = delayedTimer[i % 6];

				if (this.particles[i].delay) time -= this.particles[i].delay;
				this.particles[i].update(time);
			}

			if (!this.visualizeMode) {
				if (parseInt(timer) % 10 === 0) {
					this.radius = this.beatRadius;
				} else {
					this.radius = this.originalRadius;
				}
			} else {
				if (this.radius > this.originalRadius) {
					this.radius *= 0.9;
				} else {
					this.radius = this.originalRadius;
				}
			}

			this.draw();
		};

		this.pulse = (beatStrength) => {
			this.visualizeMode = true;
			if (this.radius < this.maxRadius) this.radius *= beatStrength;
			this.draw();
		};

		this.draw = () => {
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			c.fillStyle = this.color;
			c.shadowColor = this.color;
			c.shadowBlur = 50;
			c.fill();
			c.closePath();
		};
	}
}
