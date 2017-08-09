const config = require('../modules/constants');
const helpers = require('../modules/helpers');


module.exports = (canvas, c) => {
	return function Particle(x, y, xOrbit, yOrbit, radius, offsetAngle, offsetX, offsetY, delay) {
		this.x;
		this.y;
		this.dx;
		this.dy;
		this.xOrbit = xOrbit;
		this.yOrbit = yOrbit;
		this.xCenter = x;
		this.yCenter = y;
		this.radius = delay ? (1 - delay) * radius : radius;
		this.delay = delay
		this.color = '#1AA4D1';
		this.orbitDistance;

		this.update = (timer) => {
			const newX = (offsetX * xOrbit) * (Math.sin(0.05 * timer * Math.PI + offsetAngle)) + this.xCenter;
			const newY = (offsetY * yOrbit) * (Math.cos(0.05 * timer * Math.PI)) + this.yCenter;

			this.dx = newX - this.x;
			this.dy = newY - this.y;
			this.x = newX;
			this.y = newY;
			this.orbitDistance = helpers.distance((this.x - this.xCenter), (this.y - this.yCenter));

			this.draw(timer);
		};

		this.draw = (timer) => {
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			c.fillStyle = this.color;
			c.shadowColor = this.color;
			c.shadowBlur = 40 - (Math.abs(this.dx) + Math.abs(this.dy));
			c.fill();
			c.closePath();
		};
	}
}
