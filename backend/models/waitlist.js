const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    trainId: mongoose.Schema.Types.ObjectId,
    NumOfPassengers:Number
  });