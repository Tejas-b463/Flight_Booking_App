const path = require('path');
const fs = require('fs');
const Flight = require('../models/Flight');
const User = require('../models/User');
const Booking = require('../models/Booking');
const { getUpdatedPrice } = require('../services/pricingService');
const { generateTicketPDF } = require('../services/pdefService');
const { searchAirports } = require('../services/airportSearch');
const { shouldResetPrice } = require('../utils/timeUtils');


// Book Flight and generate PDF
exports.bookFlight = async(req, res) => {
    try {
        const { userId, flightId } = req.body;

        const user = await User.findById(userId);
        const flight = await Flight.findById(flightId);

        if (!user || !flight) return res.status(404).json({ error: 'User or Flight not found' });

        const currentPrice = getUpdatedPrice(flight);
        if (user.wallet < currentPrice) {
            return res.status(400).json({ error: 'Insufficient wallet balance' });
        }

        // Deduct from wallet
        user.wallet -= currentPrice;
        await user.save();

        // Update booking timestamp and price
        flight.lastBookedTimes.push(Date.now());
        flight.currentPrice = currentPrice;
        await flight.save();

        // price should be rest
        if (shouldResetPrice(flight.lastBookedAt)) {
            flight.price = flight.originalPrice;
            await flight.save();
        }

        // Create booking
        const booking = new Booking({ userId, flightId, pricePaid: currentPrice });
        await booking.save();

        // Generate Ticket PDF
        const pdfPath = generateTicketPDF({ name: user.name, email: user.email }, {
                airline: flight.airline,
                flightNumber: flight.flightNumber,
                from: flight.from,
                to: flight.to,
                // departureTime: flight.departureTime,
                price: currentPrice,
            },
            booking._id.toString()
        );

        res.json({
            message: 'Booking successful',
            booking,
            ticketUrl: `/tickets/${booking._id.toString()}.pdf`, // URL for the PDF ticket
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all bookings for a user
exports.getBookings = async(req, res) => {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId }).populate('flightId');
    res.json(bookings);
};

// Get the PDF ticket by booking ID
exports.getTicket = (req, res) => {
    const { bookingId } = req.params;
    const filePath = path.join(__dirname, '..', 'tickets', `${bookingId}.pdf`);

    if (fs.existsSync(filePath)) {
        res.setHeader('Content-Type', 'application/pdf');
        res.download(filePath, `${bookingId}_ticket.pdf`);
    } else {
        res.status(404).json({ error: 'Ticket not found' });
    }

};

// Calls Auto Suggest API
exports.suggestAirports = async(req, res) => {
    const { query } = req.query;

    if (!query) return res.status(400).json({ error: 'Query is required' });

    const results = await searchAirports(query);
    res.json(results);
};