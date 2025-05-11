const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./lib/db');
const Flight = require('./models/Flight');
const User = require('./models/User');

const airlines = ['IndiGo', 'SpiceJet', 'Air India', 'GoAir', 'Vistara', 'Akasa Air'];
const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Goa', 'Kolkata'];

const generateFlightNumber = (airline) => {
    const prefix = airline.split(' ')[0].slice(0, 2).toUpperCase();
    return `${prefix}${Math.floor(100 + Math.random() * 900)}`;
};

const getRandomTimePair = () => {
    const departure = new Date();
    departure.setHours(Math.floor(Math.random() * 24));
    departure.setMinutes(Math.floor(Math.random() * 60));

    const durationMinutes = 60 + Math.floor(Math.random() * 180); // 1 to 4 hours
    const arrival = new Date(departure.getTime() + durationMinutes * 60000);

    const format = (date) => date.toTimeString().split(' ')[0].slice(0, 5);

    return {
        departureTime: format(departure),
        arrivalTime: format(arrival),
        duration: `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`,
        durationMinutes,
    };
};

const getRandomPrice = (durationMinutes) => {
    const base = 2000;
    const multiplier = 1 + (durationMinutes / 240); // proportional pricing
    return Math.floor(base * multiplier);
};

const getRandomCityPair = () => {
    let from, to;
    do {
        from = cities[Math.floor(Math.random() * cities.length)];
        to = cities[Math.floor(Math.random() * cities.length)];
    } while (from === to);
    return { from, to };
};

const seed = async() => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');

        await Flight.deleteMany({});
        await User.deleteMany({});

        const user = new User({
            name: 'Tejas Banait',
            email: 'tejas@example.com',
            wallet: 80000,
        });
        await user.save();
        console.log('User created:', user._id.toString());

        const total = 100;
        for (let i = 0; i < total; i++) {
            const { from, to } = getRandomCityPair();
            const airline = airlines[Math.floor(Math.random() * airlines.length)];
            const flightNumber = generateFlightNumber(airline);
            const { departureTime, arrivalTime, duration, durationMinutes } = getRandomTimePair();

            const currentPrice = getRandomPrice(durationMinutes);
            const basePrice = Math.floor(currentPrice * 1.1); // basePrice = currentPrice + 10%

            const flight = new Flight({
                airline,
                flightNumber,
                from,
                to,
                basePrice,
                currentPrice,
                departureTime,
                arrivalTime,
                duration,
                lastBookedTimes: [],
            });

            await flight.save();
        }

        console.log(`${total} flights seeded successfully`);
    } catch (err) {
        console.error('Seeding error:', err);
    } finally {
        await mongoose.disconnect();
    }
};

seed();