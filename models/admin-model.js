const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  phoneNo: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  joinedOn: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Number,
    require: true,
    default: 0
  }
});

module.exports = mongoose.model("admin", AdminSchema);
