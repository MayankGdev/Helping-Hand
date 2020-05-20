const mongoose = require("mongoose");
const AddressSchema = require("./address").Schema;
const PickupGuySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: AddressSchema,
    require: true
  }, createdOn: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Number,
    require: true,
    default:0
  }
});
module.exports = mongoose.model("pickupguy", PickupGuySchema);
