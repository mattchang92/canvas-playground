const config = require('../modules/constants');
const helpers = require('../modules/helpers');

module.exports = (canvas, c, mouse) => {

	const colors = ['#F2F3F4', '#148BE6', '#7AC243'];

	return function Bubble(radius, randColor) {
		this.x = mouse.x;
		this.y = mouse.y;
		this.radius = radius;
		this.color = colors[randColor];
		this.dx = 6 * Math.random() - 3;
		this.dy = 6 * Math.random() - 3;

		this.update = () => {
			this.x += this.dx;
			this.y += this.dy;
			this.radius -= 1;
			this.draw();
		};

		this.destroy = () => {
			return this.radius < 3;
		}

		this.draw = () => {

			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			c.fillStyle = this.color;
			c.shadowColor = this.color;
			c.lineWidth = 1;
			c.shadowBlur = 5;
			c.strokeStyle = this.color;
			c.stroke();
			c.closePath();
		};
	}
}
