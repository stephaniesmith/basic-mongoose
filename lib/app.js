const express = require('express');
const app = express();
const routes = require('./routes/routes');

app.use(express.json());

app.use('/routes', routes);

module.exports = app;