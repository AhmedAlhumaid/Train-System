const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    trainId: { type: mongoose.Schema.Types.ObjectId, required: true },
    numOfPassengers: { type: Number, required: true },
    joinedAt: { type: Date, default: Date.now } // Automatically stores the date and time of joining
});

const Waitlist = mongoose.model("Waitlist", waitlistSchema);

module.exports = Waitlist;