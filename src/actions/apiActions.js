import actionTypes from './actionTypes';
import uiActions from './uiActions';
import config from '../../config';

const actions = {
	fetchPlaylists: (dispatch) => {
		return (credentials) => {
			return fetch(getRequest(credentials, config.spotify.baseUrl + config.spotify.playlistsIndexEndpoint, 'GET'))
				.then((response) => {
					console.log('response', response);
					if (!response.ok) {
						// getErrors(response).then((error) => dispatch(loginFailed(error)));
					} else {
						response.json().then((result) => {
							console.log('result', result);
							dispatch(uiActions.updatePlaylists(result.items))
						});
					}
				});
		}
	},
	selectPlaylist: (dispatch) => {
		return (playlist) => {
			console.log('playlist', playlist);
		}
	}
}

const getRequest = (credentials, url, type) => {
	const req = {
		method: type ? type : 'POST',
		headers: getHeaders(credentials),
		credentials: 'same-origin',
	};

	if (type !== 'GET') req.body = JSON.stringify(Object.assign({}, credentials));

	return new Request(
		url,
		req
	);
};

const getHeaders = (token) => {
	let headers = new Headers();

	headers.append('Accept', 'application/json'),
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', `Bearer ${token}`)

	return headers;
};


export default actions;
