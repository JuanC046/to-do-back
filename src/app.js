// Aplicación principal
const express = require('express');
const config = require('./config');

const app = express();

// Use the cors middleware
// Cors se emplea para permitir el acceso a recursos 
// del servidor desde un dominio distinto al que lo sirve.

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const toDoZen = require('./modules/toDoZen/router');
app.use('/api/toDoZen', toDoZen);

app.set('port', config.app.port);

module.exports = app;