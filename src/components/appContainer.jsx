import React from 'react';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import Controls from './controls.jsx';
import VisualizerContainer from './visualizerContainer.jsx';

import uiState from '../reducers/uiState';

const store = createStore(uiState, applyMiddleware(ReduxThunk));


export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.options.animate();
		document.getElementById('loading').remove();
	}

	render() {
		return (
			<Provider store={store}>
				<div className="root">
					<Controls
						{...this.props}
					/>
				<VisualizerContainer {...this.props}/>
				</div>
			</Provider>
		)
	}
}
