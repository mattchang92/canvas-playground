const handler = require('./handler');

module.exports = {
	authenticateSpotify: (req, res, next) => {
		res.send('great success!~');
	},
	// authenticateSpotify: (req, res, next) => {
	// 	console.log('authenticating');
	// 	handler.authenticateSpotify(req)
	// 		.then((response) => {
	// 			console.log('response', response);
	// 			res.status(200).send(response);
	// 			next();
	// 		})
	// 		.catch((err) => {
	// 			console.log('error', error);
	// 			res.status(403).send(err);
	// 			next(err);
	// 		});
	// },
};
