import helpers from '../helpers';

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
			const ratio = this.height / canvas.height;

			//gold
			// const color = helpers.getColorGold(ratio);

			//green/red
			const color = helpers.getColorRG(ratio);

			c.beginPath();
			c.rect(this.x, this.y, this.width, -this.height);


			c.fillStyle = color;
			c.shadowColor = color;
			c.shadowBlur = 50;
			// c.fillStyle = this.color;
			// c.shadowColor = this.color;
			// c.shadowBlur = 50;
			c.fill();
			c.closePath();
		};
	}
}
