import actions from '../actions/actionTypes';

export default function formStore(state = {}, action) {
	switch(action.type) {
		case actions.TEST:
			return Object.assign({}, state, { test: true });
		default:
			return state;
	}
}
