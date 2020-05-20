const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    addressLineOne: {
      type: String,
      require: true
    },
    addressLineTwo: {
      type: String,
      require: true
    },
    landmark: {
      type: String,
      require: false
    },
    city: {
      type: String,
      require: true
    },
    state: {
      type: String,
      require: true
    },
    pincode: {
      type: String,
      require: true
    }
  },
  {
    _id: false
  }
);

exports.Schema = AddressSchema;

exports.Model = mongoose.model("address", AddressSchema);
