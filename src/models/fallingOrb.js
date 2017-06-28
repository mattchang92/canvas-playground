const config = require('../constants');
const helpers = require('../helpers');

module.exports = (canvas, c) => {
	return function FallingOrb(x, y, dx, radius) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = 30;
		this.radius = radius;
		this.color = '#F2F3F4';
		this.bounces = 0;

		this.update = () => {

			this.dy += config.GRAVITY;
			this.x += this.dx;
			this.y += this.dy;

			if (this.isOnFloor()) {
				this.bounces++;
				if (this.radius > 3) {
					this.dx *= 0.8;
					this.dy *= -0.5;
					this.radius *= 0.6;
				}
			}

			this.draw();
		};

		this.destroy = () => {
			return this.radius < 3;
		};

		this.isOnFloor = () => {
			return (canvas.height - this.y) < (this.radius + this.dy);
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
