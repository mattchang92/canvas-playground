const express = require('express');

const router = express.Router();
// const routes = require('./config/routes');
const routes = {
	api: '/api'
}

Object.keys(routes).forEach((route) => {
	router.use(routes[route], require(`./modules/${route}/router`));
});
console.log('router', router);
module.exports = router;
