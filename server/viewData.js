const mongoose = require('mongoose');
const User = require('./models/User');
const Flight = require('./models/Flight');
const Booking = require('./models/Booking');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'http://localhost:5000';

const viewData = async() => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');


        const users = await User.find();
        const flights = await Flight.find();
        const bookings = await Booking.find().populate('flightId'); // Assuming 'flightId' is a reference field

        console.log('\n📘 Users:\n', users);
        console.log('\n✈️ Flights:\n', flights);
        console.log('\n🧾 Bookings:\n', bookings);

        mongoose.disconnect();
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

viewData();