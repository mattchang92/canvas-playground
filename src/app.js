const when = require('when');
const config = require('../config');

import helpers from './helpers';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/appContainer.jsx';
import ModelsConstructors from './models/index';

	// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

let mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};


addEventListener("resize", function() {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	// init();
});

addEventListener("mousemove", function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

const ctors = ModelsConstructors(canvas, c, mouse);

const ctx = new AudioContext();
ctx.crossOrigin = 'anonymous';


const audio = document.getElementById('myAudio');
audio.crossOrigin = 'anonymous';
const audioSrc = ctx.createMediaElementSource(audio);
audioSrc.crossOrigin = 'anonymous';
const analyser = ctx.createAnalyser();

audioSrc.connect(analyser);
analyser.connect(ctx.destination);

const frequencyData = new Uint8Array(analyser.frequencyBinCount);

canvas.width = innerWidth;
canvas.height = innerHeight;

const Circle = ctors.circle;
const Atom = ctors.atom;
const Bubble = ctors.bubble;
const FallingOrb = ctors.fallingOrb;
const Spark = ctors.spark;
const Bar = ctors.bar;


const addBall = () => {
	data.circles.push(new Circle(100,100,80, 'blue'));
}

const createAtom = () => {
	if (!data.atom) {
		// adata.tom = new Atom(canvas.width/2, canvas.height/2, 15, '#FA942E')
		data.atom = new Atom(canvas.width/2, canvas.height/2, 15, '#1AA4D1')
		// data.atom = new Atom(canvas.width/2, canvas.height/2, 15, '#F2F3F4')
	} else {
		data.atom = null;
	}
}


const startRainingOrbs = () => {
	data.rainOrbs = !data.rainOrbs;
}

const startBubbles = () => {
	data.makeBubbles = !data.makeBubbles;
}


const startVisualizer = () => {
	if (!data.visualizer.length) {
		for (let i = 0; i < 16; i++) {
			data.visualizer.push(new Bar(i * (canvas.width/16), canvas.height, canvas.width/16, 'red'));
		}
	} else {
		data.visualizer = [];
	}
}

const clearCanvas = () => {
	data.circles = [];
	data.visualizer = [];
	data.atom = null;
	data.makeBubbles = false;
	data.rainOrbs = false;
}

const stopAnimation = () => {
	if (data.animation) {
		cancelAnimationFrame(data.animation);
		data.animation = undefined;
	}
}

const restartAnimation = () => {
	if (!data.animation) animate();
}

const authenticateSpotify = () => {
	// window.location.href = config.spotify.authUrl + '/?client_id=' + config.spotify.clientID +
	// 	'&response_type=code&redirect_uri=' + config.spotify.redirectUri +
	// 	'&show_dialog=true';
	// const authToken = fetch(apiActions.getRequest(
	// null,
	window.location.href = config.spotify.authUrl + '/?client_id=' + config.spotify.clientID +
		'&response_type=token&redirect_uri=' + config.spotify.redirectUriClient +
		'&show_dialog=true',
		'GET'

}

const urlParamsArray = window.location.href.includes('#') ?
	window.location.href.split('#')[1].split('&') : undefined;

const urlParamsObj = {};

if (urlParamsArray) {
	urlParamsArray.forEach((param) => {
		param = param.split('=');
		urlParamsObj[param[0]] = param[1];
	})
}
console.log('urlParamsObj', urlParamsObj);
	//
	// // Animation Loop
const data = {
	animation: undefined,
	circles: [],
	atom: undefined,
	timer: 0,
	makeBubbles: false,
	rainOrbs: false,
	bubbles: [],
	sparks: [],
	orbs: [],
	visualizer: [],
	visualizerData: [],
}

function animate() {
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

	if ((data.timer % 100 === 0 || data.timer % 75 === 0) && data.rainOrbs) {
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
			return !spark.isOnFloor();
		});

		data.sparks.forEach((spark) => {
			spark.update();
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

	if (data.atom) {
		let beatStrength = 1;
		if (risingBins >= 16) {
			beatStrength = 1.3
		} else if (risingBins > 12) {
			beatStrength = 1.2;
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




const callbacks = {
	startVisualizer,
	authenticateSpotify,
	startBubbles,
	stopAnimation,
	restartAnimation,
	clearCanvas,
	startRainingOrbs,
	createAtom,
	addBall,
}


const options = {
	audio,
	data,
	callbacks,
	animate,
	token: urlParamsObj ? urlParamsObj.access_token : null,
}

startVisualizer();

ReactDOM.render(<App options={options}/>, document.getElementById('app'));
