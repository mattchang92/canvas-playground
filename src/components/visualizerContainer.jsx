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

		this.state = {
			timeTracker: undefined,
		}
	}

	componentWillUnmount() {
		clearInterval(this.state.timeTracker);
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
		const progressBar = document.getElementById('progress-bar');

		if (this.props.options.token) {
			this.props.fetchPlaylists(this.props.options.token);
			this.props.fetchUserData(this.props.options.token);
			this.props.setToken(this.props.options.token);
		}

		this.audio.addEventListener('ended', () => {
			this.props.stopPlaying();
		})


		if (!this.state.timeTracker) {
			this.setState({
				timeTracker: setInterval(() => {
					const progress =  100 * (this.audio.currentTime / 30);
					progressBar.style.width = `${progress}%`;
				}, 100)
			})
		}
	}

	goBack() {
		if (this.props.selectedPlaylist) {
			this.props.selectPlaylist()
		} else {
			this.props.toggleVisualizer();
		}

	}

	startMusic() {
		this.audio.play();
		this.props.startPlaying();
	}

	stopMusic() {
		this.audio.pause();
		this.props.stopPlaying();
	}



	changeTrack(type) {
		const audioElement = document.getElementById('myAudio');
		const tracks = this.props.tracks;
		const index = this.props.trackIndex;
		const nextTrack = tracks[index + type];

		if (nextTrack) {
			audioElement.setAttribute('src', nextTrack.track.preview_url);
			audioElement.play();
			this.props.selectTrack(index + type, nextTrack.track.album.images[0].url, nextTrack.track.id);
		}
	}

	render() {

		return (
			<div className={this.props.visualizerActive ? "active visualizer-container" : "visualizer-container"}>
				<div className="top-bar">
					<button onClick={() => this.goBack()}>
						<ArrowLeft/>
					</button>
					<div>
						<a onClick={() => this.callbacks.toggleColor()}>Toggle Color</a>
					</div>
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
					<img className="album-artwork" src={this.props.albumArt ? this.props.albumArt : '/assets/spotify.png'}></img>
					<div className="progress-background">
						<div id="progress-bar"/>
					</div>
					<div className="buttons-container">
						<button className="music-controls" onClick={() => this.changeTrack(-1)}><PreviousTrack /></button>
						{
							this.props.isPlaying ?
								<button className="music-controls" onClick={() => this.stopMusic()}><StopButton /></button> :
								<button className="music-controls" onClick={() => this.startMusic()}><PlayButton /></button>
						}
						<button className="music-controls" onClick={() => this.changeTrack(1)}><SkipTrack /></button>
					</div>
				</div>
			</div>
		)
	}

}

const mapStateToProps = (state) => {
	return {
		tracks: state.tracks,
		selectedPlaylist: state.selectedPlaylist,
		visualizerActive: state.visualizerActive,
		playlists: state.playlists,
		trackIndex: state.trackIndex,
		albumArt: state.albumArt,
		isPlaying: state.isPlaying,
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
		startPlaying: () => dispatch(uiActions.startPlaying()),
		stopPlaying: () => dispatch(uiActions.stopPlaying()),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(VisualizerContainer);
