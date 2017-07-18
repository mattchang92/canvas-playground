import actions from '../actions/actionTypes';

const initialState = {
	visualizerActive: false,
};

export default function formStore(state = initialState, action) {
	switch(action.type) {
		case actions.TOGGLE_VISUALIZER: {
			return Object.assign({}, state, { visualizerActive: !state.visualizerActive });
		}
		default:
			return state;
	}
}
