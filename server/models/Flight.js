const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    airline: String,
    flightNumber: String,
    from: String,
    to: String,
    basePrice: Number,
    currentPrice: Number,
    departureTime: String,
    arrivalTime: String,
    duration: String,
    lastBookedTimes: [Date],
});

module.exports = mongoose.model('Flight', flightSchema);