const router = require('express').Router();
const controller = require('./controller');

// router.post('/authenticate-spotify'	, controller.authenticateSpotify);
router.get('/spotifyCallback', controller.spotifyCallback);

module.exports = router;
