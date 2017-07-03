import React from 'react';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import Controls from './controls.jsx';
import MusicPlayer from './musicPlayer.jsx';
import Canvas from './canvas.jsx';
import Audio from './audio.jsx';

import uiState from '../reducers/uiState';

const store = createStore(uiState, applyMiddleware(ReduxPromise));

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Provider store={store}>
				<div>
					<Controls />
					<Canvas />
					<Audio />
				</div>
			</Provider>
		)
	}
}
