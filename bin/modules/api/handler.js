const when = require('when');
const rest = require('restling');
const helpers = require('../helpers');
const config = require('../../../config');

const authenticateSpotify = (data) => {
	// console.log('data', data.body);
	// return data.body;
	const url = config.spotify.authUrl + '/?client_id=' + config.spotify.clientID +
		'&response_type=code&redirect_uri=' + config.spotify.redirectUri +
		'&show_dialog=true';
		return url;
	// return helpers.apiGet(url);
}

const requestTokens = (credentials) => {
	console.log('credentials', credentials.code);
	console.log('config', config.spotify.tokensUrl);
	console.log('config', config.spotify.redirectUri);
	console.log('config', config.spotify.clientID);
	console.log('config', config.spotify.clientSecret);

	const header = new Buffer(config.spotify.clientId + ':' + config.spotify.clientSecret).toString('base64');
	console.log('header', header);

	const tokens = helpers.apiPost(config.spotify.tokensUrl,
		{
			data: {
				grant_type: 'authorization_code',
				code: credentials.code,
				redirect_uri: config.spotify.redirectUri,
				client_id: config.spotify.clientID,
				client_secret: config.spotify.clientSecret,
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
		}
	)

	return when(tokens, (tokens) => {
		console.log('tokens', tokens);
		return tokens;
	})
}

module.exports = {
	authenticateSpotify,
	requestTokens,
}
