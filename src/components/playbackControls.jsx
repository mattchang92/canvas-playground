import React from 'react';
import { PlayButton, StopButton, SkipTrack, PreviousTrack } from '../../assets/icons.jsx';


export default class PlaybackControls extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="spotify-controls">
				<img  className="album-artwork" src={this.props.albumArt ? this.props.albumArt : '/assets/spotify.png'}></img>
				<div className="progress-background">
					<input type="range" className="invisible-slider" onChange={(e) => this.props.scrubMusic(e)}></input>
					<div id="progress-bar"/>
					<div id="selector"></div>
				</div>
				<div className="buttons-container">
					<button className="music-controls svg-button" onClick={() => this.props.changeTrack(-1)}><PreviousTrack /></button>
					{
						this.props.isPlaying ?
							<button className="music-controls svg-button" onClick={() => this.props.stopMusic()}><StopButton /></button> :
							<button className="music-controls svg-button" onClick={() => this.props.startMusic()}><PlayButton /></button>
					}
					<button className="music-controls svg-button" onClick={() => this.props.changeTrack(1)}><SkipTrack /></button>
				</div>
			</div>
		)
	}
}
