import actionTypes from './actionTypes';

const actions = {
	toggleVisualizer: () => {
		console.log('being toggled');
		return { type: actionTypes.TOGGLE_VISUALIZER }
	},
	updatePlaylists: (playlists) => {
		return { type: actionTypes.UPDATE_PLAYLISTS, payload: playlists }
	},
	selectPlaylist: (playlist) => {
		return { type: actionTypes.SELECT_PLAYLIST, payload: playlist }
	},
	setToken: (dispatch) => {
		return (token) => {
			dispatch({ type: actionTypes.SET_TOKEN, payload: token});
		}
	},
};

export default actions;
