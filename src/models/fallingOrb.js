const config = require('../modules/constants');
const helpers = require('../modules/helpers');

module.exports = (canvas, c) => {
	return function FallingOrb(x, y, dx, radius) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = 30;
		this.radius = radius;
		this.color = '#F2F3F4';
		this.bounces = 0;

		this.update = (visualizer) => {
			this.dy += config.GRAVITY;
			this.x += this.dx;
			this.y += this.dy;

			if (this.contactSurface(visualizer)) {
				this.bounces++;
				if (this.radius > 3 && this.bounces === 1) {
					this.dx *= 0.8;
					this.dy *= this.dy > 0 ? -0.5 : 1;
					this.radius *= 0.6;
				}
			}

			this.draw();
		};

		this.destroy = () => {
			return this.radius < 3;
		};

		this.contactSurface = (visualizer) => {
			if ((canvas.height - this.y) < (this.radius)) {
				return true;
			} else {
				return visualizer.length && visualizer.some((bar) => {
					return ((this.x + this.dx) > bar.x) && ((this.x + this.dx) < (bar.x + bar.width)) && ((this.y + this.dy) > (bar.y - bar.height));
				})
			}
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
