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

	// const header = new Buffer(config.spotify.clientId + ':' + config.spotify.clientSecret).toString('base64');

	return helpers.apiPost(config.spotify.tokensUrl,
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

}

module.exports = {
	authenticateSpotify,
	requestTokens,
}
