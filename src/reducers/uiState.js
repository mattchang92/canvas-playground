import actions from '../actions/actionTypes';

const initialState = {
	visualizerActive: true,
	playlists: [],
	selectedPlaylist: undefined,
	token: undefined,
};

export default function formStore(state = initialState, action) {
	switch(action.type) {
		case actions.TOGGLE_VISUALIZER: {
			return Object.assign({}, state, { visualizerActive: !state.visualizerActive });
		}
		case actions.UPDATE_PLAYLISTS: {
			return Object.assign({}, state, { playlists: action.payload });
		}
		case actions.SELECT_PLAYLIST: {
			return Object.assign({}, state, { selectedPlaylist: action.payload });
		}
		case actions.SET_TOKEN: {
			console.log('setting token');
			return Object.assign({}, state, { token: action.payload });
		}
		default:
			return state;
	}
}
