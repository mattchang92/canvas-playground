const config = require('../config');

import helpers from './modules/helpers';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/appContainer.jsx';
import ModelConstructors from './models/index';

import callbackFunctions from './modules/callbackFunctions';
import animation from './modules/animation';

// Set up canvas
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Set up mouse tracking
const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};

addEventListener("mousemove", function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});


addEventListener("resize", function() {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	if (data.visualizer.length) {
		data.visualizer = [];
		for (let i = 0; i < 16; i++) {
			data.visualizer.push(new Bar(i * (canvas.width/16), canvas.height, canvas.width/16, 'red'));
		}
	}
});


const ctors = ModelConstructors(canvas, c, mouse);
const ctx = new AudioContext();

const audio = document.getElementById('myAudio');
audio.crossOrigin = 'anonymous';
const audioSrc = ctx.createMediaElementSource(audio);
const analyser = ctx.createAnalyser();

audioSrc.connect(analyser);
analyser.connect(ctx.destination);

const frequencyData = new Uint8Array(analyser.frequencyBinCount);

canvas.width = innerWidth;
canvas.height = innerHeight;

const urlParamsArray = window.location.href.includes('#') ?
	window.location.href.split('#')[1].split('&') : undefined;

const urlParamsObj = {};

if (urlParamsArray) {
	urlParamsArray.forEach((param) => {
		param = param.split('=');
		urlParamsObj[param[0]] = param[1];
	})
}

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

// Import callback functions to pass down as props
const callbacks = callbackFunctions(data, canvas, ctors)

// Refactored large canvas animation function as a closure
const animate = () => animation({data, c, canvas, analyser, frequencyData, ctors});

// Create props to pass down to entry component
const options = {
	audio,
	data,
	animate,
	callbacks,
	token: urlParamsObj ? urlParamsObj.access_token : null,
}

ReactDOM.render(<App options={options}/>, document.getElementById('app'));
