const router = require('express').Router();
const controller = require('./controller');

router.post('/authenticate-spotify', controller.authenticateSpotify);

module.exports = router;
