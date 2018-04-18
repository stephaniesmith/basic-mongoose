const { assert } = require('chai');
const Trip = require('../../lib/models/Trip');

describe('Trip model', () => {

    const getValidationErrors = validation => {
        assert.isDefined(validation, 'expected validation errors but got none');
        return validation.errors;
    };

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

    it('required fields', () => {
        const trip = new Trip({});
        const errors = getValidationErrors(trip.validateSync());
        assert.equal(Object.keys(errors).length, 4);
        assert.equal(errors['location.park'].kind, 'required');
        assert.equal(errors['location.trail'].kind, 'required');
        assert.equal(errors['location.trailhead'].kind, 'required');
        assert.equal(errors.campers.kind, 'required');
    });

    it('season must be enum, campers must be min 1', () => {
        const trip = new Trip({ 
            location: {
                park: 'Ecola State Park', 
                trail: 'Tillamook Head Trail', 
                trailhead: 'Tillamook Head Trailhead' 
            }, 
            season: 'hello',
            campers: 0
        });
        const errors = getValidationErrors(trip.validateSync());
        assert.equal(errors['season'].kind, 'enum');
        assert.equal(errors['campers'].kind, 'min');
    });
});