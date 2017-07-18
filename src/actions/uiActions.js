import actionTypes from './actionTypes';

const actions = {
	toggleVisualizer: () => {
		console.log('being toggled');
		return { type: actionTypes.TOGGLE_VISUALIZER }
	},
};

export default actions;
