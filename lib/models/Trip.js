const mongoose = require('mongoose');
const { Schema } = mongoose;

const requiredString = {
    type: String,
    required: true
};

const schema = new Schema({
    location: {
        park: requiredString,
        trail: requiredString,
        trailhead: requiredString
    },
    style: {
        type: String,
        default: 'camping'
    },
    details: {
        length: Number,
        elevation: Number,
        days: Number,
        nights: Number
    },
    season: {
        type: String,
        enum: ['spring', 'summer', 'fall', 'winter']
    },
    campers: {
        type: Number,
        required: true,
        min: 1
    },
    gear: [String]
});

module.exports = mongoose.model('Trip', schema);