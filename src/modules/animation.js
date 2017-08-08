// Animation Loop
const animation = (options) => {
	const { data, c, canvas, analyser, frequencyData, ctors } = options;
	const Bubble = ctors.bubble;
	const FallingOrb = ctors.fallingOrb;
	const Spark = ctors.spark;
	const orbsBrowserConfig = {
		chrome: {
			orbSpawnDelay: 40,
			sparksSpawnRate: 8,
		},
		other: {
			orbSpawnDelay: 80,
			sparksSpawnRate: 4,
		},
	};

	const animate = () => {
		data.timer++;
		data.animation = requestAnimationFrame(animate);
		c.clearRect(0, 0, canvas.width, canvas.height);

		// Balls were used to learn basics of canvas but were since removed
		// if (data.circles.length) {
		// 	data.circles.forEach((circle) => {
		// 		circle.update();
		// 	});
		//
		// 	if (data.circles.length > 1) {
		// 		for (let i = 0; i < data.circles.length - 1; i++) {
		// 			for (let j = i + 1; j < data.circles.length; j++) {
		// 				data.circles[i].detectCollision(data.circles[j]);
		// 			}
		// 		}
		// 	}
		//
		// 	data.circles.forEach((circle) => {
		// 		circle.collisionUpdated = false;
		// 	})
		// }

		// Calls the update function of the atom
		if (data.atom) data.atom.update(data.timer * 0.7);

		// Each iteration creates a new bubble with random dx/dy and color
		if (data.makeBubbles) {
			const color = Math.floor(3 * Math.random());

			data.bubbles.push(new Bubble(50, color));
			for (let i = 0; i < data.bubbles.length; i++) {
				data.bubbles[i].update();
				if (data.bubbles[i].destroy()) {
					data.bubbles.shift();
				}
			}
		}

		const orbConfig = navigator.userAgent.includes('Chrome') ? orbsBrowserConfig.chrome : orbsBrowserConfig.other;

		// Create raining orbs at a set interbval
		if ((data.timer % orbConfig.orbSpawnDelay === 0) && data.rainOrbs) {
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

			// Generate 'sparks' on contact with floor or visualizer bar
			for (let i = 0; i < data.orbs.length; i++) {
				data.orbs[i].update(data.visualizer);
				if (data.orbs[i].bounces) {
					data.orbs[i].bounces--;
					const sparksNumber = orbConfig.sparksSpawnRate * Math.random() + orbConfig.sparksSpawnRate;
					for (let j = 0; j < sparksNumber; j++) {
						const dx = 8 * Math.random() - 4;
						const dy = Math.random() * data.orbs[i].dy;
						data.sparks.push(new Spark(data.orbs[i].x, data.orbs[i].y, dx, dy))
					}
				}
			}
		}

		// Remove all sparks that are underneath the floor/bars
		if (data.sparks.length) {
			data.sparks = data.sparks.filter((spark) => {
				return !spark.contactSurface(data.visualizer);
			});

			for (let i = 0; i < data.sparks.length; i++) {
				data.sparks[i].update(data.visualizer);
			}
		}

		// Fetch updated frequency data of current playing song
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
			data.visualizerData[2] = data.visualizerData[2] * 0.9;
			data.visualizerData[3] = data.visualizerData[3] * 0.95;
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

	return animate(data, c, canvas, analyser, frequencyData);
}

export default animation;
