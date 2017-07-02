// const when = require('when');
const serverUrl = 'http://localhost:9000/'

const keys = {
	APIAccessID: 'testid',
	APIAccessSecret: 'secret'
};

const authenticateSpotify = () => {
	return fetch(getRequest({hello: 'world'}, (serverUrl + 'api/authenticate-spotify'), 'POST'))

	// return (fetch('api/authenticate-spotify', {hello: 'world'}));
}

const getRequest = (data, url, type) => {
	const req = {
		method: type ? type : 'POST',
		headers: getHeaders(),
		credentials: 'same-origin',
	};

	if (data) req.body = JSON.stringify(Object.assign({}, data));

	return new Request(
		url,
		req
	);
};

const getHeaders = () => {
	let headers = new Headers();

	headers.append('Accept', 'application/json'),
		headers.append('Content-Type', 'application/json');

	return headers;
};

module.exports = {
	authenticateSpotify,
};
