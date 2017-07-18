import React from 'react';

export default class Track extends React.Component {
	constructor(props) {
		super();
	}


	handleClick() {

		console.log('this.props.track', this.props);
		const audioElement = document.getElementById('myAudio');

		console.log('audioelement', audioElement);
		audioElement.setAttribute('src', this.props.track.preview_url)
		this.props.audio.play();
		// item.track.preview_url

	}

	render() {
		return(
			<div
				className="playlist"
				onClick={() => this.handleClick()}
			>
				{this.props.track.name}
			</div>
		)
	}
}
