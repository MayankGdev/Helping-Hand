const mongoose = require('mongoose');

const DonationItemSchema = require('./donation-item').Schema;

const DonationSchema = new mongoose.Schema({
    donationPic: {
        type: String,
        required: true
    }, donorId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'donors'
    }, 
    donation:[ DonationItemSchema ], 
    createdOn: {
        type: Date,
        required: true,
        default: Date.now
    }, accepted: {
        type: Boolean,
        required: true,
        default: false
    }, 
    pickUpDateAndTime: {
        type: Date,
        required: true
    }, 
    pickedBy: {
        type: mongoose.Types.ObjectId,
        required: false,
    }, ngo: {
        type: mongoose.Types.ObjectId,
        required: false
    }
});

module.exports = mongoose.model('donations', DonationSchema);