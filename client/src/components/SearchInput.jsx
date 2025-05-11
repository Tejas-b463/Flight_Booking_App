import React from 'react';

const SearchInput = ({
  label,
  value,
  onChange,
  onFocus,
  suggestions,
  onSelect,
  placeholder,
}) => {
  return (
    <div className="p-4 relative flex-1">
      <div className="pl-10">
        <label className="text-gray-500 text-sm">{label}</label>
        <input
          type="text"
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          className="w-full outline-none text-lg text-gray-800 placeholder-gray-400"
          placeholder={placeholder}
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded-lg shadow-md max-h-60 overflow-y-auto z-10">
            {suggestions.map((airport) => (
              <li
                key={airport.city}
                onClick={() => onSelect(airport)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {airport.city} - {airport.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
