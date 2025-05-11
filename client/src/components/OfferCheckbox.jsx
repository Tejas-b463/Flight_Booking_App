import React from 'react';

const OfferCheckbox = ({ isChecked, toggleCheckbox }) => (
  <div className="bg-blue-50 rounded-lg p-4 flex items-start">
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="w-4 h-4 border-2 border-gray-300 rounded-sm focus:ring-blue-500 cursor-pointer"
        checked={isChecked}
        onChange={toggleCheckbox}
      />
      <div className="ml-3">
        <div className="flex items-center">
          <p className="font-medium">{"Unlock 10% extra savings"}</p>
          <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-sm">NEW</span>
        </div>
        <p className="text-gray-600 text-sm">{"FlightTrip for Work"}</p>
      </div>
    </label>
  </div>
);

export default OfferCheckbox;
