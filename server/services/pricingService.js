exports.getUpdatedPrice = (flight) => {
    const now = Date.now();
    const recent = flight.lastBookedTimes.filter(ts => now - ts < 5 * 60 * 1000);

    if (recent.length >= 3) {
        return Math.round(flight.currentPrice * 1.1);
    }

    const reset = flight.lastBookedTimes.every(ts => now - ts > 10 * 60 * 1000);
    return reset ? flight.basePrice : flight.currentPrice;
};