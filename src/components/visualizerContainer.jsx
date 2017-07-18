import React from 'react';
import { connect } from 'react-redux';
import when from 'when';

import apiActions from '../actions/apiActions';
import uiActions from '../actions/uiActions';

import Playlist from './playlist.jsx';
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

	displayContent() {
		return this.props.playlists && this.props.playlists.length ?
			this.props.playlists.map((playlist, index) => {
				return <Playlist key={playlist.id} playlist={playlist}/>
			}) : <h1>No playlists found</h1>
	}

	componentDidMount() {
		if (this.props.options.token) {
			this.props.fetchPlaylists(this.props.options.token);
			this.props.setToken(this.props.options.token);
		}
	}

	render() {

		return (
			<div className={this.props.visualizerActive ? "active visualizer-container" : "visualizer-container"}>
				Visualizer
				<button onClick={() => this.props.fetchPlaylists(this.props.options.token)}>Fetch playlists</button>
				<div className="tracks-area">
					<div className="playlists-container">
						{this.displayContent()}
					</div>
					<div className="songs-container">
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		visualizerActive: state.visualizerActive,
		playlists: state.playlists,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchPlaylists: apiActions.fetchPlaylists(dispatch),
		setToken: uiActions.setToken(dispatch),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(VisualizerContainer);
