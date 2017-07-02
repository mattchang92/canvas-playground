const when = require('when');


const authenticateSpotify = (data) => {
	console.log('data', data.body);
	return data.body;
}

module.exports = {
	authenticateSpotify
}
