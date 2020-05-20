const mongoose = require('mongoose');
const AddressSchema = require('./address').Schema;

const DonorSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    phoneno: {
        type: String,
        required: true
    },
    address: AddressSchema
});

module.exports = mongoose.model('donors', DonorSchema);