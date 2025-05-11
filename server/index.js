const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');;

const connectDB = require('./lib/db.js')

const flightRoutes = require('./routes/flightRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const walletRoutes = require('./routes/walletRoutes');
const suggestAirports = require('./routes/bookingRoutes.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/tickets', express.static(path.join(__dirname, 'tickets')));


app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/airports', suggestAirports);

app.listen(PORT, () => {
    console.log('Server running on PORT:' + PORT)
    connectDB();
});