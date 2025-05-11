import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {Hexagon} from "lucide-react"
import axios from 'axios';
import LoadingState from "./LoadingState"


const FlightBookingApp = () => {
  const location = useLocation();
  const { from, to, isChecked } = location.state || {};

  const [flights, setFlights] = useState([]);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate()

  useEffect(() => {
    if (from && to) {

      const fetchFlights = async () => {
        try {
          const response = await axios.get(
            `${baseUrl}/api/flights?from=${from.toLowerCase()}&to=${to.toLowerCase()}`
          );
          setFlights(response.data);
        } catch (error) {
          console.error('Error fetching flights:', error);
        }
      };
      fetchFlights();
    }
  }, [from, to]);

  const handleBook = (flight) => {
    navigate('/review', { state: { flight } }); 
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen mt-4">
      <div className="w-full md:w-3/4 p-4">
        <div className="grid grid-cols-5 gap-4 bg-gray-100 p-3 text-sm font-medium text-gray-500 rounded-t-md items-center">
          <div>{"Airline"}</div>
          <div>{"Departure"}</div>
          <div>{"Duration"}</div>
          <div>{"Arrival"}</div>
          <div>{"Price"}</div>
        </div>

        <div className="divide-y divide-gray-200">
          {flights.length > 0 ? (
            flights.map((flight, index) => (
              <div key={index} className="py-3 px-2 grid grid-cols-5 gap-4 hover:bg-gray-50">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <div className="bg-blue-900 text-white rounded p-2 flex items-center justify-center">
                      <Hexagon/>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{flight.airline}</div>
                      <div className="text-xs text-gray-500">{flight.flightNumber}</div>
                    </div>
                  </div>
                  <button className="text-blue-500 text-sm text-left mt-2 font-semibold">{"Flight Details"}</button>
                </div>

                <div className="font-bold text-xl text-gray-800 flex items-center">
                  {flight.departureTime}
                </div>

                <div className="flex flex-col items-center justify-center md:mr-36">
                  <div className="text-sm font-medium text-gray-700">{flight.duration}</div>
                  <div className="w-20 h-0.5 bg-gray-300 relative my-1">
                    <div className="absolute w-1.5 h-1.5 bg-gray-400 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                  <div className="text-xs text-gray-500">{"1 stop"}</div>
                </div>

                <div className="font-bold text-xl text-gray-800 flex items-center">
                 {flight.arrivalTime}
                </div>

                <div className="flex flex-col items-center">
                  <div className="font-bold text-xl text-gray-800">{"₹"}{flight.currentPrice.toLocaleString()}</div>
                  <div className="text-xs text-green-600">{"Get ₹215 off with CTDOM"}</div>
                  <button
                         onClick={() => handleBook(flight)}
                         className="mt-2 bg-orange-500 hover:bg-orange-600 text-white py-2 px-8 rounded-md font-medium"
                       >
                        {"Book"}
                   </button>
                </div>
              </div>
            ))
          ) : (
            <div className='p-4 md:p-6'>
           <LoadingState/>
           </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightBookingApp;
