import actions from '../actions/actionTypes';

const initialState = {
	visualizerActive: false,
	playlists: [],
	tracks: [],
	selectedPlaylist: undefined,
	trackIndex: 0,
	token: undefined,
	userId: undefined,
	albumArt: undefined,
	isPlaying: false,
	currentTrack: undefined,
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
			return Object.assign({}, state, { token: action.payload });
		}
		case actions.SET_USER_ID: {
			return Object.assign({}, state, { userId: action.payload });
		}
		case actions.UPDATE_TRACKS: {
			const tracksWithSample = action.payload.filter((item) => {
				return item.track.preview_url;
			});

			return Object.assign({}, state, { tracks: tracksWithSample });
		}
		case actions.SELECT_TRACK: {
			return Object.assign({}, state, { trackIndex: action.payload.trackIndex, currentTrack: action.payload.trackId });
		}
		case actions.SET_ALBUM_ART: {
			return Object.assign({}, state, { albumArt: action.payload });
		}
		case actions.START_PLAYING: {
			return Object.assign({}, state, { isPlaying: true});
		}
		case actions.STOP_PLAYING: {
			return Object.assign({}, state, { isPlaying: false });
		}
		default:
			return state;
	}
}
