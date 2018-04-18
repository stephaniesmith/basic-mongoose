const router = require('express').Router();
const Trip = require('../models/Trip');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Trip.create(req.body)
            .then(trip => res.json(trip))
            .catch(err => errorHandler(err, req, res));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;

        Trip.findById(id)
            .lean()
            .then(trip => res.json(trip))
            .catch(err => errorHandler(err, req, res));
    });