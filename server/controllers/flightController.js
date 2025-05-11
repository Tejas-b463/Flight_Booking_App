const Flight = require('../models/Flight');
const { getUpdatedPrice } = require('../services/pricingService');

exports.getFlights = async(req, res) => {
    try {
        const { from, to } = req.query;

        if (!from || !to) {
            return res.status(400).json({ error: 'From and To are required' });
        }

        const flights = await Flight.find({
            from: { $regex: new RegExp(from, 'i') },
            to: { $regex: new RegExp(to, 'i') }
        });

        const updatedFlights = flights.map(flight => ({
            ...flight._doc,
            currentPrice: getUpdatedPrice(flight)
        }));

        res.json(updatedFlights);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};