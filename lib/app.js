const express = require('express');
const app = express();
const trips = require('./routes/trips');

app.use(express.json());

app.use('/trips', trips);

module.exports = app;