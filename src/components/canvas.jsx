import React from 'react';

export default class Canvas extends React.Component {
	constructor(props) {
		super(props);

		// const ctx = new AudioContext();
		// ctx.crossOrigin = 'anonymous';
		// const audio = document.getElementById('myAudio');
		// const audioSrc = ctx.createMediaElementSource(audio);
		// const analyser = ctx.createAnalyser;
		// audioSrc.connect(analyser);
		// analyser.connect(ctx.destination);


		// this.state = {
		// 	canvas: document.querySelector('canvas'),
		// 	context: canvas.getContext('2d'),
		// 	audio: audio,
		// 	ctx: ctx,
		// 	analyser: analyser,
		// 	audioSrc: ;
		// }

	}

	render() {
		return (
			<canvas></canvas>
		)
	}
}
