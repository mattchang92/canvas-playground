module.exports = (canvas, c) => {
	return function Bar(x, y, width, color) {
		this.x = x;
		this.y = y;
		this.height = 0;
		this.width = width;
		this.color = color;

		this.update = (height, timer) => {
			if (timer % 5 === 0) {
				this.height = (height * 3);
			}
			this.draw();
		};

		this.draw = () => {
			const red = Math.floor(255 * this.height / canvas.height);
			const green = 255 - red;
			const blue = 0;

			c.beginPath();
			c.rect(this.x, this.y, this.width, -this.height);


			c.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';

			// c.fillStyle = this.color;
			// c.shadowColor = this.color;
			// c.shadowBlur = 50;
			c.fill();
			c.closePath();
		};
	}
}
