const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  car_id:  Number,
  name: String,
  email:  String,
  phoneNumber: String,
  date: Date,
  time: String,  
});

module.exports = mongoose.model("booking", bookingSchema);
