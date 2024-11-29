const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    trainId: mongoose.Schema.Types.ObjectId,
    travelDate: Date,
    quota: String,
    price: Number,
    passengers: Number,
  });
  
  module.exports = mongoose.model('Booking', BookingSchema);
  