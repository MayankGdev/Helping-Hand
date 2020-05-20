const mongoose = require("mongoose");

const DonationItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
},
{
  _id: false
});

const DonationItemModel = mongoose.model('donationItems', DonationItemSchema);

exports.Schema = DonationItemSchema;

exports.Model = DonationItemModel;