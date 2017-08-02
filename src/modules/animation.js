// Animation Loop
const animate = () => {
	return (data, c, canvas, analyser, frequencyData) => {
		data.timer++;
		data.animation = requestAnimationFrame(animate);
		c.clearRect(0, 0, canvas.width, canvas.height);

		if (data.circles.length) {
			data.circles.forEach((circle) => {
				circle.update();
			});

			if (data.circles.length > 1) {
				for (let i = 0; i < data.circles.length - 1; i++) {
					for (let j = i + 1; j < data.circles.length; j++) {
						data.circles[i].detectCollision(data.circles[j]);
					}
				}
			}

			data.circles.forEach((circle) => {
				circle.collisionUpdated = false;
			})
		}

		if (data.atom) data.atom.update(data.timer * 0.7);

		if (data.makeBubbles) {
			const color = Math.floor(3 * Math.random());

			data.bubbles.push(new Bubble(50, color));
			data.bubbles.forEach((bubble) => {
				bubble.update();
				if (bubble.destroy()) {
					data.bubbles.shift();
				}
			})
		}

		if ((data.timer % 40 === 0) && data.rainOrbs) {
			// if ((data.timer % 100 === 0 || data.timer % 75 === 0) && data.rainOrbs) {
			const x = Math.random() * canvas.width;
			const y = -200;
			const dx = 6 * Math.random() - 3;
			const radius = 10 * Math.random() + 10;

			data.orbs.push(new FallingOrb(x, y, dx, radius))
		}

		if (data.orbs.length) {
			data.orbs = data.orbs.filter((orb) => {
				return !orb.destroy();
			});

			data.orbs.forEach((orb) => {
				orb.update(data.visualizer);
				if (orb.bounces) {
					orb.bounces--;
					const sparksNumber = 4 * Math.random() + 10;
					for (let i = 0; i < sparksNumber; i++) {
						const dx = 8 * Math.random() - 4;
						const dy = Math.random() * orb.dy;
						data.sparks.push(new Spark(orb.x, orb.y, dx, dy))
					}
				}
			})
		}

		if (data.sparks.length) {
			data.sparks = data.sparks.filter((spark) => {
				return !spark.contactSurface(data.visualizer);
			});

			data.sparks.forEach((spark) => {
				spark.update(data.visualizer);
			})
		}

		analyser.getByteFrequencyData(frequencyData);


		let accumulator = 0;
		let risingBins = 0;
		for (let i = 0; i < frequencyData.length; i++) {
			if ((i+1) % 32 === 0) {
				var previousVisualizerData = data.visualizerData.slice();
				data.visualizerData[Math.floor(((i+1) / 32)) -1] = Math.floor(accumulator / 32);
				accumulator = 0;
				if (previousVisualizerData.length === data.visualizerData.length) {
					for (let j = 0; j < data.visualizerData.length; j++) {
						if (data.visualizerData[j] > previousVisualizerData[j]) risingBins++;
					}
				}

			} else {
				accumulator += frequencyData[i];
			}
		}

		if (data.visualizerData.length) {
			data.visualizerData[0] = data.visualizerData[0] * 0.7;
			data.visualizerData[1] = data.visualizerData[1] * 0.85;
		}

		if (data.atom) {
			let beatStrength = 1;
			if (risingBins >= 16) {
				beatStrength = 1.2
			} else if (risingBins > 12) {
				beatStrength = 1.15;
			} else if (risingBins > 8) {
				beatStrength = 1.1;
			}
			data.atom.pulse(beatStrength);
		}

		if (data.visualizer.length) {
			for (let i = 0; i < data.visualizer.length; i++) {
				data.visualizer[i].update(data.visualizerData[i], data.timer)
			}
		}
	}

}

export default animate;
