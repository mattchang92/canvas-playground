import React from 'react';

export default class Audio extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<audio id="myAudio" crossOrigin="anonymous" src="https://p.scdn.co/mp3-preview/c25c0272ba9aced0ce6e65b9977fc732d86c83d3?cid=6cf7c350f0674554802c5011d40bc85b"></audio>
		)
	}
}
