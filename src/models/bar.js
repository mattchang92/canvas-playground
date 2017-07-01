module.exports = (canvas, c) => {
	return function Bar(x, y, width, color) {
		this.x = x;
		this.y = y;
		this.height = 500;
		this.width = width;
		this.color = color;

		this.update = (height, timer) => {
			if (timer % 5 === 0) {
				this.height = (height * 3);
			}
			this.draw();
		};

		this.draw = () => {
			c.beginPath();
			c.rect(this.x, this.y, this.width, -this.height);
			c.fillStyle = this.color;
			// c.shadowColor = this.color;
			// c.shadowBlur = 50;
			c.fill();
			c.closePath();
		};
	}
}
