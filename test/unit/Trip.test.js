const { assert } = require('chai');
const Trip = require('../../lib/models/Trip');

describe('Trip model', () => {
    it('vaild good model', () => {
        const data = {
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

        const trip = new Trip(data);

        assert.deepEqual(trip.toJSON(), { _id: trip._id, ...data });

        assert.isUndefined(trip.validateSync());
    });

    it('has default style of camping', () => {
        const trip = new Trip({ 
            location: {
                park: 'Ecola State Park', 
                trail: 'Tillamook Head Trail', 
                trailhead: 'Tillamook Head Trailhead' 
            }, 
            campers: 2
        });
        assert.ok(trip.style);
        assert.equal(trip.style, 'camping');
    });

});