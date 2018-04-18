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
            .then(trip => {
                if(!trip) {
                    errorHandler({
                        status: 404,
                        error: `Trip id ${id} does not exist`
                    }, req, res);
                }
                else res.json(trip);
            })
            .catch(err => errorHandler(err, req, res));
    })

    .put('/:id', (req, res) => {
        const { id } = req.params;

        Trip.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })
            .then(trip => res.json(trip))
            .catch(err => errorHandler(err, req, res));
    })

    .get('/', (req, res) => {
        Trip.find(req.query)
            .lean()
            .then(trip => res.json(trip))
            .catch(err => errorHandler(err, req, res));
    })

    .delete('/:id', (req, res) => {
        const { id } = req.params;

        Trip.findByIdAndRemove(id)
            .lean()
            .then(removed => res.json(removed))
            .catch(err => errorHandler(err, req, res));
    });