const fs = require('fs');
const path = require('path');

// Load the JSON file once
const airports = JSON.parse(fs.readFileSync(path.join(__dirname, '../airports.json'), 'utf-8'));

// Function to search airports
exports.searchAirports = async(query) => {
    const lowerQuery = query.toLowerCase();
    return airports.filter(airport =>
        airport.name.toLowerCase().includes(lowerQuery) ||
        airport.city.toLowerCase().includes(lowerQuery) ||
        airport.code.toLowerCase().includes(lowerQuery)
    );
};