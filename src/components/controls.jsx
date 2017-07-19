import React from 'react';
import { connect } from 'react-redux';
import uiActions from '../actions/uiActions';

// @connect(
// 	undefined,
// 	(dispatch) => ({
// 		toggleVisualizer: () => {
// 			dispatch(uiActions.toggleVisualizer());
// 		},
// 	})
// )


class Controls extends React.Component {
	constructor(props) {
		super(props);
		// console.log('controls props', this.props.options.audio.play);
		console.log('component this', this);
		this.audio = this.props.options.audio;
		this.callbacks = this.props.options.callbacks;
	}

	toggleVisualizer() {
		this.props.dispatch(uiActions.toggleVisualizer());
	}

	render() {
		return (
			<div>
				<button id="do-add-atom" onClick={this.callbacks.createAtom.bind(this.callbacks)}>Add Atom</button>
				<button id="do-make-bubbles" onClick={this.callbacks.startBubbles.bind(this.callbacks)}>Make bubbles</button>
				<button id="do-make-orb" onClick={this.callbacks.startRainingOrbs.bind(this.callbacks)}>Start raining orbs</button>
				<button id="do-start-visualizer" onClick={this.callbacks.startVisualizer.bind(this.callbacks)}>Visualizer</button>
				<button id="do-clear-canvas" onClick={this.callbacks.clearCanvas.bind(this.callbacks)}>Clear Canvas</button>
				<button id="do-connect-spotify" onClick={this.callbacks.authenticateSpotify.bind(this.callbacks)}>Connect With Spotify</button>
				<button id="do-toggle-visualizer" onClick={() => this.toggleVisualizer()}>Visualizer Menu</button>
			</div>
		)
	}
}

// <button id="do-add-ball" onClick={this.callbacks.addBall.bind(this.callbacks)}>Add Ball</button>
// <button id="do-stop-animation" onClick={this.callbacks.stopAnimation.bind(this.callbacks)}>Stop Animation</button>
// <button id="do-restart-animation" onClick={this.callbacks.restartAnimation.bind(this.callbacks)}>Start Animation</button>
// <button id="do-replay" onClick={this.audio.play.bind(this.audio)}>Replay</button>
// <button id="do-stop" onClick={this.audio.pause.bind(this.audio)}>Stop</button>

export default connect()(Controls);
