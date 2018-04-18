const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        tpye: String,
        required: true
    },
    other: {
        type: String,
        default: 'Hello!'
    },
    another: {
        thing1: String,
        thing2: String
    },
    stuff: {
        type: String,
        enum: ['option 1', 'option 2']
    },
    things: {
        type: Number,
        min: 0
    },
    list: [String]
});

module.exports = mongoose.model('Model', schema);