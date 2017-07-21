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

		this.props.selectTrack(this.props.index, this.props.track.album.images[0].url);
		// item.track.preview_url
		// result.tracks.items
		// item.track.preview_url
		// item.track.name
		// item.track.artists (array) .name
		// item.track.album.images(array) .url
	}

	render() {
		return(
			<div
				className="playlist"
				onClick={() => this.handleClick()}
			>
				{this.props.track.name} - {this.props.track.artists[0].name}
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		selectTrack: uiActions.selectTrack(dispatch),
	}
}

export default connect(undefined, mapDispatchToProps)(Track);
