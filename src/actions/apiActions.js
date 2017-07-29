import actionTypes from './actionTypes';
import uiActions from './uiActions';
import config from '../../config';

const actions = {
	fetchPlaylists: (dispatch) => {
		return (credentials) => {
			return fetch(getRequest(credentials, config.spotify.baseUrl + config.spotify.playlistsIndexEndpoint, 'GET'))
				.then((response) => {
					if (!response.ok) {
						// getErrors(response).then((error) => dispatch(loginFailed(error)));
					} else {
						response.json().then((result) => {
							dispatch(uiActions.updatePlaylists(result.items))
						});
					}
				});
		}
	},
	fetchUserData: (dispatch) => {
		return (credentials) => {
			return fetch(getRequest(credentials, config.spotify.baseUrl + config.spotify.me, 'GET'))
				.then((response) => {
					response.json().then((result) => {
						// console.log('me', result);
						dispatch(uiActions.setUserId(result.id))
						// dispatch(uiActions.updatePlaylists(result.items))
					});
				});
		}
	},
	selectPlaylist: (dispatch, getState) => {
		return (playlist) => {
			if (playlist !== 'default') {
				return fetch(getRequest(getState().token, `${config.spotify.baseUrl}/v1/users/${getState().userId}/playlists/${playlist}`, 'GET'))
				.then((response) => {
					response.json().then((result) => {
						dispatch(uiActions.selectPlaylist(playlist));
						dispatch(uiActions.updatePlaylistTracks(result.tracks.items));
					});
				});
			} else {
				dispatch(uiActions.selectPlaylist(playlist));
				dispatch(uiActions.updatePlaylistTracks(config.defaultTracks));
			}
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


// const serverUrl = 'http://localhost:9000/'
//
// const keys = {
// 	APIAccessID: 'testid',
// 	APIAccessSecret: 'secret'
// };
//
// const authenticateSpotify = () => {
// 	return fetch(getRequest({hello: 'world'}, (serverUrl + 'api/authenticate-spotify'), 'POST'))
//
// 	// return (fetch('api/authenticate-spotify', {hello: 'world'}));
// }


export default actions;
