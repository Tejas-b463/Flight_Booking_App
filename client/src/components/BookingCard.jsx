import React from 'react';
import { Plane, Calendar, MapPin, IndianRupee } from 'lucide-react';

const BookingCard = ({ booking }) => {
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString || Date.now()).toLocaleDateString('en-US', options);
  };

  const baseUrl = import.meta.env.VITE_API_BASE_URL;


  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
            <Plane className="h-4 w-4 text-[#FF6D38]" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{booking.flightId.airline}</h3>
            <p className="text-sm text-gray-500">{"Flight"} {booking.flightId.flightNumber}</p>
          </div>
        </div>
        <div className="bg-blue-100 text-blue-600 text-sm py-1 px-3 rounded-full font-medium">
         {"Confirmed"}
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-center mb-4">
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-1">{"From"}</div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-gray-500 mr-1" />
              <span className="font-medium">{booking.flightId.from}</span>
            </div>
          </div>

          <div className="hidden md:block flex-1 px-4">
            <div className="flex items-center justify-center">
              <div className="h-1 w-1 rounded-full bg-gray-400"></div>
              <div className="h-0.5 flex-1 bg-gray-300"></div>
              <div className="h-2 w-2 rounded-full bg-gray-500"></div>
              <div className="h-0.5 flex-1 bg-gray-300"></div>
              <div className="h-1 w-1 rounded-full bg-gray-400"></div>
            </div>
          </div>

          <div className="flex-1 mt-2 md:mt-0">
            <div className="text-sm text-gray-500 mb-1">{"To"}</div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-gray-500 mr-1" />
              <span className="font-medium">{booking.flightId.to}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
            <div>
              <div className="text-sm text-gray-500">{"Departure Time"}</div>
              <div className="font-medium">{formatDate(booking.flightId.departure)}</div>
            </div>
          </div>
          <div className="flex items-center">
            <IndianRupee className="h-4 w-4 text-gray-500 mr-2" />
            <div>
              <div className="text-sm text-gray-500">{"Price Paid"}</div>
              <div className="font-medium">{booking.pricePaid.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 border-t border-gray-200 flex flex-wrap gap-3">
        <a
          href={`${baseUrl}/tickets/${booking._id}.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#FF6D38] text-white text-sm py-2 px-4 rounded transition-colors inline-flex items-center"
        >
          {"View Ticket"}
        </a>
        <button className="bg-white text-gray-700 text-sm py-2 px-4 rounded border border-gray-300 hover:bg-gray-50 transition-colors inline-flex items-center">
          {"Download Invoice"}
        </button>
        <button className="bg-white text-gray-700 text-sm py-2 px-4 rounded border border-gray-300 hover:bg-gray-50 transition-colors inline-flex items-center md:ml-auto">
          {"Cancel Booking"}
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
