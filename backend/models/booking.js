const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    trainId: mongoose.Schema.Types.ObjectId,
    from:String,
    to:String,
    travelDate: String,
    comparableDate:Date,
    email:String,
    price:Number,
    seats:[String],
    status:String,
  });
  
  module.exports = mongoose.model('Booking', BookingSchema);
  