import React from 'react';
import { connect } from 'react-redux';

// @connect(
// 	(state, ownProps) => {
// 		console.log('state', state);
// 		console.log('ownProps', ownProps);
// 		return {
// 			visualizerActive: state.visualizerActive,
// 		};
// 	}
// )


class VisualizerContainer extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		console.log('this.props', this.props);
		return (
			<div className={this.props.visualizerActive ? "active visualizer-container" : "visualizer-container"}>
				Visualizer
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	console.log('redux state', state);
	return {
		visualizerActive: state.visualizerActive,
	}
};

export default connect(mapStateToProps)(VisualizerContainer);
