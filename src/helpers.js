const distance = (x, y) => (Math.sqrt((x * x) + (y * y)));

const getColorRG = (ratio) => {
	const fn = (x) => {
		return (-2 * Math.pow(x, 3)) + (3 * Math.pow(x, 2));
	}
	// const fn = (x) => {
	// 	return 1/ (1 + Math.pow(Math.E, (-8 * x + 4)));
	// }

	const red = Math.floor(255 * fn(ratio));
	const green = 230 - Math.floor(210 * fn(ratio));
	const blue = 68 - Math.floor(40 * fn(ratio));

	return `rgb(${red}, ${green}, ${blue})`
}


const getColorGold = (ratio) => {
	const red = Math.floor(255 * ratio);
	const green = 20 + Math.floor(210 * ratio);
	const blue = 27 + Math.floor(40 * ratio);

	return `rgb(${red}, ${green}, ${blue})`
}

module.exports = {
	distance,
	getColorRG,
	getColorGold,
}
