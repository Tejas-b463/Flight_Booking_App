const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');

exports.generateTicketPDF = (userDetails, flightDetails, bookingId) => {
    const doc = new PDFDocument();
    const ticketPath = path.join(__dirname, '..', 'tickets', `${bookingId}.pdf`);

    // Ensure the 'tickets' folder exists
    const dirPath = path.dirname(ticketPath);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    doc.pipe(fs.createWriteStream(ticketPath));

    doc.fontSize(25).text(`Ticket for ${flightDetails.airline} Flight`);
    doc.fontSize(18).text(`Flight Number: ${flightDetails.flightNumber}`);
    doc.text(`From: ${flightDetails.from} To: ${flightDetails.to}`);

    // Check if departureTime, arrivalTime, and duration are available
    if (flightDetails.departureTime) {
        doc.text(`Departure Time: ${flightDetails.departureTime}`);
    } else {
        doc.text(`Departure Time: Not Available`);
    }

    if (flightDetails.duration) {
        doc.text(`Duration: ${flightDetails.duration}`);
    } else {
        doc.text(`Duration: Not Available`);
    }

    if (flightDetails.arrivalTime) {
        doc.text(`Arrival Time: ${flightDetails.arrivalTime}`);
    } else {
        doc.text(`Arrival Time: Not Available`);
    }

    doc.text(`Price Paid: Rs ${flightDetails.price}`);

    doc.end();

    console.log(`Ticket generated at ${ticketPath}`); // Debugging log

    return ticketPath; // Return the path where the file is saved
};