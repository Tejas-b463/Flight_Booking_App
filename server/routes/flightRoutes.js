const express = require('express');
const router = express.Router();
const { getFlights } = require('../controllers/flightController');
const { suggestAirports } = require('../controllers/bookingController');

router.get('/', getFlights); // GET api/flights?from=delhi&to=mumbai
router.get('/airport-suggest', suggestAirports)

module.exports = router;