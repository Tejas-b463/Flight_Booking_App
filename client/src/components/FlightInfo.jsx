import React from "react";
import { ArrowRight, Square, PlaneTakeoff } from "lucide-react";

const FlightInfo = ({ flight }) => {
  if (!flight) return null;

  const {
    airline,
    from,
    to,
    flightNumber,
    departureTime,
    arrivalTime,
    duration = 0,
  } = flight;

  return (
    <div className="flex-1">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 font-medium">
          <PlaneTakeoff />
        </div>
        <span className="ml-3 text-xl font-medium text-gray-800">
          {"Review Flight Details"}
        </span>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="text-lg font-medium text-gray-800">{from}</div>
          <ArrowRight size={20} />
          <div className="text-lg font-medium text-gray-800">{to}</div>
          <div className="ml-4 text-gray-500 text-sm">{"Sun, 11 May 2025"}</div>
          <div className="ml-3 bg-gray-800 text-white text-xs px-2 py-0.5 rounded text-center uppercase tracking-wide">
            {"Regular"}
          </div>
        </div>
      </div>

      <div className="relative pb-8 border-b border-gray-200">
        <div className="flex mb-8">
          <div className="w-24 mr-6">
            <div className="bg-blue-900 text-white w-12 h-12 rounded flex items-center justify-center">
              <Square size={24} />
            </div>
            <div className="text-sm text-gray-500 mt-2">{airline}</div>
            <div className="text-sm text-gray-500">{flightNumber}</div>
          </div>

          <div className="flex-1">
            <div className="relative mb-10">
              <div className="absolute left-[-22px] top-2 w-4 h-4 rounded-full bg-white border-4 border-gray-300"></div>
              <div className="flex items-center">
                <div className="text-2xl font-bold text-gray-800 mr-3">{departureTime}</div>
                <div className="font-medium text-gray-800">{from}</div>
              </div>
              <div className="text-gray-500 text-sm">{duration}</div>
            </div>

            <div className="relative">
              <div className="absolute left-[-22px] top-2 w-4 h-4 rounded-full bg-white border-4 border-gray-300"></div>
              <div className="flex items-center">
                <div className="text-2xl font-bold text-gray-800 mr-3">{arrivalTime}</div>
                <div className="font-medium text-gray-800">{to}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightInfo;
