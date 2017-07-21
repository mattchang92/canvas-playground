import React from 'react';
import { connect } from 'react-redux';
import when from 'when';

import apiActions from '../actions/apiActions';
import uiActions from '../actions/uiActions';

import Playlist from './playlist.jsx';
import Track from './track.jsx';
import { ArrowLeft, PlayButton, StopButton, SkipTrack, PreviousTrack } from '../../assets/icons.jsx';


class VisualizerContainer extends React.Component {
	constructor(props) {
		super(props)

		this.callbacks = this.props.options.callbacks;
		this.audio = this.props.options.audio;
	}

	displayPlaylists() {
		return this.props.playlists && this.props.playlists.length ?
			this.props.playlists.map((playlist, index) => {
				return <Playlist key={playlist.id} playlist={playlist}/>
			}) : <h1>No playlists found</h1>
	}

	displayTracks() {
		return this.props.tracks && this.props.tracks.length ?
			this.props.tracks.map((item, index) => {
				return <Track index={index} key={item.track.id} track={item.track} audio={this.audio}/>
			}) : <h1>No tracks found</h1>
	}

	componentDidMount() {
		if (this.props.options.token) {
			this.props.fetchPlaylists(this.props.options.token);
			this.props.fetchUserData(this.props.options.token);
			this.props.setToken(this.props.options.token);
		}
	}

	goBack() {
		if (this.props.selectedPlaylist) {
			this.props.selectPlaylist()
		} else {
			this.props.toggleVisualizer();
		}

	}

	toggleMusic() {
		this.audio.paused ? this.audio.play() : this.audio.pause();
	}

	changeTrack(type) {
		const audioElement = document.getElementById('myAudio');
		const tracks = this.props.tracks;
		const index = this.props.trackIndex;

		if (tracks[index + type]) {
			audioElement.setAttribute('src', tracks[index + type].track.preview_url);
			audioElement.play();
			this.props.selectTrack(index + type, tracks[index + type].track.album.images[0].url);
		}
	}

	render() {

		return (
			<div className={this.props.visualizerActive ? "active visualizer-container" : "visualizer-container"}>
				<div className="top-bar">
					Visualizer
					<ArrowLeft onClick={() => this.goBack()}/>
					<button onClick={() => this.callbacks.toggleColor()}>Toggle Color</button>
				</div>
				<div className="tracks-area">
					<div className={this.props.selectedPlaylist ? "playlists-container inactive" : "playlists-container"} id="playlists-container">
						{this.displayPlaylists()}
					</div>
					<div className={this.props.selectedPlaylist ? "songs-container active" : "songs-container"}>
						{this.displayTracks()}
					</div>
				</div>
				<div className="spotify-controls">
					<button onClick={() => this.changeTrack(-1)}>Previous Track</button>
					<button onClick={() => this.toggleMusic()}>Play/Pause</button>
					<button onClick={() => this.changeTrack(1)}>Next Track</button>
					{
						this.props.albumArt ?
							<img className="album-artwork" src={this.props.albumArt}></img> : null
					}

				</div>
			</div>
		)
	}

}
// <div className="control-buttons">
// 	<PreviousTrack />
// 	<PlayButton />
// 	<SkipTrack />
// </div>
// <PreviousTrack />
// <StopButton />
// <SkipTrack />

const mapStateToProps = (state) => {
	return {
		tracks: state.tracks,
		selectedPlaylist: state.selectedPlaylist,
		visualizerActive: state.visualizerActive,
		playlists: state.playlists,
		trackIndex: state.trackIndex,
		albumArt: state.albumArt,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchPlaylists: apiActions.fetchPlaylists(dispatch),
		fetchUserData: apiActions.fetchUserData(dispatch),
		selectPlaylist: () => dispatch(uiActions.selectPlaylist(null)),
		selectTrack: uiActions.selectTrack(dispatch),
		setToken: uiActions.setToken(dispatch),
		toggleVisualizer: () => dispatch(uiActions.toggleVisualizer()),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(VisualizerContainer);
