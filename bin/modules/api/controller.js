const handler = require('./handler');

module.exports = {
	// authenticateSpotify: (req, res, next) => {
	// 	res.send('great success!~');
	// },
	authenticateSpotify: (req, res, next) => {
		res.status(200).send(handler.authenticateSpotify(req));
		// handler.authenticateSpotify(req)
			// .then((response) => {
			// 	console.log('response--------', response);
			// 	res.status(200).send(response);
			// 	// res.status(200).send(response.data);
			// 	next();
			// })
			// .catch((err) => {
			// 	console.log('error', err);
			// 	res.status(403).send(err);
			// 	next(err);
			// });
	},
	spotifyCallback: (req, res, next) => {
		const tokens = handler.requestTokens(req.query);
		// console.log('req----------', req.query);
		// console.log('res', res.query);
		res.status(200).send(tokens);
	}
};
