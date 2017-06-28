const config = require('../constants');
const helpers = require('../helpers');


module.exports = (canvas, c) => {
	return function Particle(x, y, xOrbit, yOrbit, radius, color, offsetAngle, offsetX, offsetY) {
		this.x = undefined;
		this.y = undefined;
		this.xOrbit = xOrbit;
		this.yOrbit = yOrbit;
		this.xCenter = x;
		this.yCenter = y;
		this.radius = radius;
		this.color = color;
		this.orbitDistance;

		// const rand = Math.random();

		this.update = (timer) => {
			this.x = (offsetX * xOrbit) * (Math.sin(0.05 * timer * Math.PI + offsetAngle)) + this.xCenter;
			this.y = (offsetY * yOrbit) * (Math.cos(0.05 * timer * Math.PI)) + this.yCenter;
			this.orbitDistance = helpers.distance((this.x - this.xCenter), (this.y - this.yCenter));

			this.draw(timer);
		};

		this.draw = (timer) => {
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			c.fillStyle = this.color;
			c.shadowColor = '#F2F3F4';
			c.shadowBlur = 50;
			c.fill();
			c.closePath();

			// let startAngle;
			// if ((this.x - this.xCenter) > 0) {
			// 	startAngle = Math.asin((this.y - this.yCenter)/(this.orbitDistance));
			// } else {
			// 	startAngle = Math.acos((this.y - this.yCenter)/(this.orbitDistance)) + (0.5 * Math.PI);
			// }
			// console.log('orbit distance', this.orbitDistance);
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
