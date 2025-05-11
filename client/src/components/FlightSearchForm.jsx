import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeftRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SearchInput from './SearchInput';
import OfferCheckbox from './OfferCheckbox';

const FlightSearchForm = () => {
  const [fromInput, setFromInput] = useState('');
  const [toInput, setToInput] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('');

  const baseUrl = import.meta.env.VITE_API_BASE_URL;


  const navigate = useNavigate();

  const fetchSuggestions = async (query, setSuggestions) => {
    try {
      const res = await axios.get(`${baseUrl}/api/airports/search?query=${query}`);
      setSuggestions(res.data);
    } catch (err) {
      console.error(err);
      setError('Error fetching airport data. Please try again later.');
    }
  };

  const handleSearch = () => {
    if (!fromInput || !toInput) {
      alert('Please select both departure and destination airports.');
      return;
    }

    navigate('/search', {
      state: {
        from: fromInput,
        to: toInput,
        isChecked,
      },
    });
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">{"Search flights"}</h1>
      <p className="text-base text-gray-700 mt-1 mb-6">
        {"Enjoy hassle-free flight ticket bookings at the lowest airfare"}
      </p>
      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="relative mb-6">
          <div className="flex flex-col md:flex-row border border-gray-300 rounded-lg">
            <SearchInput
              label="Where from?"
              value={fromInput}
              onChange={(e) => {
                setFromInput(e.target.value);
                if (e.target.value.trim()) fetchSuggestions(e.target.value, setFromSuggestions);
              }}
              onFocus={() => fetchSuggestions('a', setFromSuggestions)}
              suggestions={fromSuggestions}
              onSelect={(airport) => {
                setFromInput(airport.city);
                setFromSuggestions([]);
              }}
              placeholder="Enter city or airport"
            />

            <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-12 h-12 rounded-full bg-white border border-blue-500 flex items-center justify-center">
                <ArrowLeftRight color="blue" />
              </div>
            </div>

            <SearchInput
              label="Where to?"
              value={toInput}
              onChange={(e) => {
                setToInput(e.target.value);
                if (e.target.value.trim()) fetchSuggestions(e.target.value, setToSuggestions);
              }}
              onFocus={() => fetchSuggestions('a', setToSuggestions)}
              suggestions={toSuggestions}
              onSelect={(airport) => {
                setToInput(airport.city);
                setToSuggestions([]);
              }}
              placeholder="Enter city or airport"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1">
            <OfferCheckbox isChecked={isChecked} toggleCheckbox={() => setIsChecked(!isChecked)} />
          </div>

          <button
            onClick={handleSearch}
            className="w-full md:w-auto px-8 py-4 bg-orange-500 text-white rounded-lg font-medium text-lg hover:bg-orange-600 transition-colors"
          >
            {"Search flights"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchForm;
