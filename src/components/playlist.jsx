import React from 'react';
import { connect } from 'react-redux';

import apiActions from '../actions/apiActions';
import uiActions from '../actions/uiActions';

class Playlist extends React.Component {
	super(props) {

	}

	handleClick() {
		this.props.selectPlaylist(this.props.playlist.id);
	}

	render() {
		return (
			<div
				key={this.props.playlist.id}
				className="playlist"
				onClick={() => this.handleClick()}
			>
				{this.props.playlist.name}
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
		selectPlaylist: dispatch(apiActions.selectPlaylist),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
