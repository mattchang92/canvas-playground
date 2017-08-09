const config = require('../modules/constants');
const helpers = require('../modules/helpers');

module.exports = (canvas, c, mouse) => {
	return function Circle(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.dx = 5;
		this.dy = 0;
		this.mass = 5;
		this.fy = this.mass * config.GRAVITY;
		this.fx = 0;
		this.radius = radius;
		this.color = color;
		this.clicked = false;
		this.collisionUpdated = false;

		addEventListener('mousedown', (event) => {
			if (helpers.distance((event.clientX - this.x), (event.clientY - this.y)) < (this.radius)) {
				this.clicked = true;
			}
		});

		addEventListener('mouseup', (event) => {
			this.clicked = false;
		});

		this.updateX = () => {
			//Slowdown due to friction
			if (this.dx > 0) this.dx -= (0.25 * config.FRICTION);
			if (this.dx > config.MAX_CIRCLE_X_SPEED) this.dx = config.MAX_CIRCLE_X_SPEED;

			// Bounce off walls
			if (this.x - this.radius < 0) {
				if (this.dx < 0) this.dx *= -0.8;
			} else if (this.x > (canvas.width - this.radius)) {
				if (this.dx > 0) this.dx *= -0.8;
			}

			if (Math.abs(this.dx) < 0.1) this.dx = 0;
		};

		this.update = () => {
			if (!this.clicked) {
				if (!this.isOnFloor()) this.dy += config.GRAVITY;
				this.x += this.dx;
				this.y += this.dy;
			} else if (this.clicked) {
				// const mouseX = mouse.x;
				this.dx = mouse.x - this.x;
				this.dy = mouse.y - this.y;
				this.x = mouse.x;
				this.y = mouse.y;
			}

			if (this.dy > 0) this.dy -= config.FRICTION;


			if (this.y < -400) {
				if (this.dy < 0) this.dy *= -0.8;
			} else if (this.isOnFloor()) {
				if (this.dy > 0) this.dy *= -0.8;
			}

			this.updateX();
			if (Math.abs(this.dy) < 0.1) this.dy = 0;

			this.draw();
		};

		this.followMouse = (obj) => {
			if (this.isTouching(obj)) {
				this.color = 'red';
				obj.color = 'red';
			} else {
				this.color = 'blue';
				obj.color = 'blue';
			}
			this.x = mouse.x;
			this.y = mouse.y - this.radius;
			this.draw();
		};

		this.detectCollision = (secondBall) => {
			if (this.isTouching(secondBall) && !this.collisionUpdated && !secondBall.collisionUpdated) {
				this.dx = (this.dx * (this.mass - secondBall.mass) + (2 * secondBall.mass * secondBall.dx)) / (this.mass + secondBall.mass);
				this.dy = (this.dy * (this.mass - secondBall.mass) + (2 * secondBall.mass * secondBall.dy)) / (this.mass + secondBall.mass);
				secondBall.dx = (secondBall.dx * (secondBall.mass - this.mass) + (2 * this.mass * this.dx)) / (this.mass + secondBall.mass);
				secondBall.dy = (secondBall.dy * (secondBall.mass - this.mass) + (2 * this.mass * this.dy)) / (this.mass + secondBall.mass);
				this.x += this.dx;
				this.y -= this.dy;
				secondBall.x += secondBall.dx;
				secondBall.y += secondBall.dy;
			}
			this.collisionUpdated = true;
			secondBall.collisionUpdated = true;
			this.draw();
		};

		this.isTouching = (obj) => {
			let vObj = {};
			let vThis = {};
			vObj.x = obj.x + 2* obj.dx;
			vObj.y = obj.y + 2* obj.dy;
			vThis.x = this.x + 2* this.dx;
			vThis.y = this.y + 2* this.dy;

			return helpers.distance((vObj.x - vThis.x), (vObj.y - vThis.y)) < (this.radius + obj.radius)
		};

		this.isOnFloor = () => {
			return (canvas.height - this.y) < (this.radius);
		};

		this.draw = () => {
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			c.fillStyle = this.color;
			c.shadowBlur = 0;
			c.fill();
			c.closePath();
		};
	}
}
