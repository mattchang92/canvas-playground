const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const cors = require('cors');

const app = express();
//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(router);

app.listen(9000, () => {
	console.log('listening on port 9000');
});
