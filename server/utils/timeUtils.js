// Returns the time difference in minutes between two Date objects.

function getMinutesDifference(startTime, endTime) {
    return Math.floor((endTime - startTime) / (1000 * 60));
}


// Returns true if the time difference is within `limitMinutes`.

function isWithinMinutes(startTime, limitMinutes) {
    const now = new Date();
    return getMinutesDifference(new Date(startTime), now) <= limitMinutes;
}

// Returns true if enough time has passed to reset the price.

function shouldResetPrice(lastBookedTime, resetAfterMinutes = 10) {
    return !isWithinMinutes(lastBookedTime, resetAfterMinutes);
}

module.exports = {
    getMinutesDifference,
    isWithinMinutes,
    shouldResetPrice,
};