import React from 'react';
import { Plane } from 'lucide-react';


const EmptyState = () => (
  <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
    <div className="bg-gray-100 h-16 w-16 mx-auto rounded-full flex items-center justify-center mb-4">
      <Plane className="h-8 w-8 text-gray-500" />
    </div>
    <h3 className="text-lg font-medium text-gray-800">{"No bookings found"}</h3>
    <p className="mt-2 text-gray-500 max-w-md mx-auto">
      {"You haven't made any bookings yet. Book your first flight now!"}
    </p>
    <button className="mt-6 bg-[#FF6D38] text-white py-2 px-6 rounded-lg hover:bg-[#FF5A1F] transition-colors">
      {"Book a Flight"}
    </button>
  </div>
);

export default EmptyState;
