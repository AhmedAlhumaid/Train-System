const mongoose = require('mongoose');
const TrainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  departureTime: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(0[0-9]|1[0-2]):[0-5][0-9]\s(AM|PM)$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid departure time!`,
    },
  },
  arrivalTime: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(0[0-9]|1[0-2]):[0-5][0-9]\s(AM|PM)$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid arrival time!`,
    },
  },
  duration: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9]+\s(hrs|minutes|hrs|min)$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid duration!`,
    },
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive value'],
  },
  from: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  to: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  date: {
    type: String,
    required: true,
  },
  driver: {
    type: String,
    required: true,
    trim: true,
  },
  engineer: {
    type: String,
    required: true,
    trim: true,
  },
  currentCapacity: {
    type: Number,
    required: true,
    min: [0, 'Current capacity must be a positive number'],
    max: [1000, 'Current capacity cannot exceed 1000'], 
  },
  users: {
    type: [String], // Array of strings
    default: [], // Default to an empty array
  },
  seats: {   
    type: Map,
    of: Boolean, // Boolean values to indicate availability
    default: function () {
      return new Map(
        Array.from({ length: 10 }, (_, i) => [i + 1, true]) // Seats 1-10 default to available
      );
    },
  },
});

module.exports = mongoose.model('Train', TrainSchema);



