const express = require('express');
const router = express.Router();
const { bookFlight, getBookings, getTicket, suggestAirports } = require('../controllers/bookingController.js');

router.post('/', bookFlight); // POST /api/bookings
router.get('/search', suggestAirports); // GET api/airports/search?query=del
router.get('/:userId', getBookings); // GET /api/bookings/:userId
router.get('/ticket/:bookingId', getTicket) //GET /api/bookings/ticket/:bookingId



module.exports = router;