import actionTypes from './actionTypes';

const actions = {
	toggleVisualizer: () => {
		return { type: actionTypes.TOGGLE_VISUALIZER }
	},
	updatePlaylists: (playlists) => {
		return { type: actionTypes.UPDATE_PLAYLISTS, payload: playlists }
	},
	selectPlaylist: (playlist) => {
		return { type: actionTypes.SELECT_PLAYLIST, payload: playlist }
	},
	setUserId: (id) => {
		return { type: actionTypes.SET_USER_ID, payload: id }
	},
	updatePlaylistTracks: (tracks) => {
		return { type: actionTypes.UPDATE_TRACKS, payload: tracks }
	},
	setToken: (dispatch) => {
		return (token) => {
			dispatch({ type: actionTypes.SET_TOKEN, payload: token});
		}
	},
	selectTrack: (dispatch) => {
		return (trackIndex, albumArt) => {
			dispatch({ type: actionTypes.SELECT_TRACK, payload: trackIndex });
			dispatch({ type: actionTypes.SET_ALBUM_ART, payload: albumArt });
		}
	},
};

export default actions;
