const { assert } = require('chai');
const request = require('./request');
const Trip = require('../../lib/models/Trip');
const { dropCollection } = require('./db');

describe('Trip API', () => {
    
    before(() => dropCollection('trips'));

    let tillamook = {
        location: {
            park: 'Ecola State Park',
            trail: 'Tillamook Head Trail',
            trailhead: 'Tillamook Head Trailhead'
        },
        style: 'backpacking',
        details: {
            length: 6,
            elevation: 1350,
            days: 2,
            nights: 1
        },
        season: 'spring',
        campers: 2,
        gear: ['tent', 'backpack', 'sleep system', 'clothes', 'food', 'cook system']
    };

    let opal = {
        location: {
            park: 'Opal Creek Wilderness',
            trail: 'Opal Creek Trail',
            trailhead: 'Opal Creek TrailHead'
        },
        details: {
            length: 10.5,
            elevation: 1240,
            days: 2,
            nights: 1
        },
        season: 'summer',
        campers: 3,
        gear: ['tents', 'backpacks', 'sleep systems', 'clothes', 'food', 'cook systems']
    };

    it('saves a trip', () => {
        return request.post('/trips')
            .send(tillamook)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(body._id);
                assert.equal(__v, 0);
                assert.deepEqual(body, { _id, __v, ...tillamook });
                tillamook = body;
            });
    });

    it('gets a trip by id', () => {
        return Trip.create(opal)
            .then(saved => {
                opal = saved;
                return request.get(`/trips/${opal._id}`);
            })
            .then(({ body }) => {
                assert.equal(body.style, 'camping');
                // assert.deepEqual(body, { style: 'camping', ... opal });
            });
    });
});