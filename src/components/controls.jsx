import React from 'react';

export default class Controls extends React.Component {
	constructor(props) {
		super(props);
		// console.log('controls props', this.props.options.audio.play);
		console.log('component this', this);
		this.audio = this.props.options.audio;
	}

	render() {
		return (
			<div>
				<button id="do-add-ball">Add Ball</button>
				<button id="do-add-atom">Add Atom</button>
				<button id="do-make-bubbles">Make bubbles</button>
				<button id="do-make-orb">Start raining orbs</button>
				<button id="do-start-visualizer">Visualizer</button>
				<button id="do-clear-canvas">Clear Canvas</button>
				<button id="do-stop-animation">Stop Animation</button>
				<button id="do-restart-animation">Start Animation</button>
				<button id="do-connect-spotify">Connect With Spotify</button>
				<button id="do-replay" onClick={this.audio.play.bind(this.audio)}>Replay</button>
				<button id="do-stop">Stop</button>
			</div>
		)
	}
}
