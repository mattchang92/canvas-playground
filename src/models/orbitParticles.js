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
		// this.color = '#FA942E';
		this.delay = delay
		this.color = '#1AA4D1';
		this.orbitDistance;

		// const rand = Math.random();

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

			// let startAngle;
			// if ((this.x - this.xCenter) > 0) {
			// 	startAngle = Math.asin((this.y - this.yCenter)/(this.orbitDistance));
			// } else {
			// 	startAngle = Math.acos((this.y - this.yCenter)/(this.orbitDistance)) + (0.5 * Math.PI);
			// }
			// // const startAngle = -0.05 * timer * Math.PI;
			// // const startAngle = -(Math.sin(0.05 * timer * Math.PI));
			// // const endAngle = (Math.cos(0.05 * timer * Math.PI));
			//
			// c.beginPath();
			// // c.arc(this.xCenter, this.yCenter, 200, startAngle, endAngle, true);
			// // c.arc(this.xCenter, this.yCenter, this.orbitDistance, startAngle, (startAngle + 0.3 * Math.PI), false);
			// c.bezierCurveTo(this.xCenter, this.yCenter, this.orbitDistance, startAngle, (startAngle + 0.3 * Math.PI), false);
			// c.lineWidth = 0.3;
			//
			// // line color
			// c.strokeStyle = 'white';
			// c.stroke();
		};
	}
}
