import React from 'react';
import { connect } from 'react-redux';
import uiActions from '../actions/uiActions';


class Controls extends React.Component {
	constructor(props) {
		super(props);
		this.audio = this.props.options.audio;
		this.callbacks = this.props.options.callbacks;

		this.state = {
			atomActive: false,
			bubblesActive: false,
			orbsActive: false,
			visualizerActive: true,
		}
	}

	componentDidMount() {
		this.callbacks.startVisualizer();
	}

	toggleVisualizerMenu() {
		this.props.dispatch(uiActions.toggleVisualizer());
	}

	toggleAtom() {
		this.callbacks.createAtom();
		this.setState({ atomActive: !this.state.atomActive })
	}

	toggleBubbles() {
		this.callbacks.startBubbles();
		this.setState({ bubblesActive: !this.state.bubblesActive })
	}

	toggleOrbs() {
		this.callbacks.startRainingOrbs();
		this.setState({ orbsActive: !this.state.orbsActive })
	}

	toggleVisualizer() {
		this.callbacks.startVisualizer();
		this.setState({ visualizerActive: !this.state.visualizerActive })
	}

	clearCanvas() {
		this.callbacks.clearCanvas();
		this.setState({
			atomActive: false,
			bubblesActive: false,
			orbsActive: false,
			visualizerActive: false,
		});
	}

	render() {
		return (
			<div>
				<a
					className={this.state.atomActive ? "main-controls active" : "main-controls"}
					onClick={this.toggleAtom.bind(this)}
				>
					Add Atom
				</a>
				<a
					className={this.state.bubblesActive ? "main-controls active" : "main-controls"}
					onClick={this.toggleBubbles.bind(this)}
				>
					Make bubbles
				</a>
				<a
					className={this.state.orbsActive ? "main-controls active" : "main-controls"} 
					onClick={this.toggleOrbs.bind(this)}
				>
					Start raining orbs
				</a>
				<a
					className={this.state.visualizerActive ? "main-controls active" : "main-controls"}
					onClick={this.toggleVisualizer.bind(this)}
				>
					Visualizer (requires music)
				</a>
				<a
					className="main-controls"
					onClick={this.clearCanvas.bind(this)}
				>
					Clear Canvas
				</a>
				<a
					className="main-controls"
					onClick={this.callbacks.authenticateSpotify.bind(this.callbacks)}
				>
					Connect With Spotify
				</a>
				<a
					className={this.props.visualizerActive ? 'hidden main-controls' : 'main-controls'}
					onClick={() => this.toggleVisualizerMenu()}
				>
					Music Menu
				</a>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		visualizerActive: state.visualizerActive,
	}
}

export default connect(mapStateToProps)(Controls);
