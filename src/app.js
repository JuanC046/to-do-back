// Aplicación principal
const express = require('express');
const config = require('./config');

const app = express();
const toDoZen = require('./modules/toDoZen/router');

app.use('/api/toDoZen', toDoZen);

app.set('port', config.app.port);

module.exports = app;