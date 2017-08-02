import React from 'react';
import { connect } from 'react-redux';

import uiActions from '../actions/uiActions';

class Track extends React.Component {
	constructor(props) {
		super();
	}


	handleClick() {
		const audioElement = document.getElementById('myAudio');
		audioElement.setAttribute('src', this.props.track.preview_url)
		this.props.audio.play();

		this.props.selectTrack(this.props.index, this.props.track.album.images[0].url, this.props.track.id);
		this.props.startPlaying();

		console.log('this.props.track', this.props.track);
	}


	render() {
		return(
			<div
				className={this.props.currentTrack === this.props.track.id ? "playlist is-playing" : "playlist"}
				onClick={() => this.handleClick()}
			>
				{this.props.track.name} - {this.props.track.artists[0].name}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		currentTrack: state.currentTrack,
		isPlaying: state.isPlaying,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		startPlaying: () => dispatch(uiActions.startPlaying()),
		selectTrack: uiActions.selectTrack(dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Track);
