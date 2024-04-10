import React, { useState } from 'react';
import { useSearchContext } from './SearchContextProvider';
import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';

export const SearchFilters = () => {
  const { setSearchQuery, setFilters } = useSearchContext();
  const [priceRange, setPriceRange] = useState([20, 50]);

  // Handler for search input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handler for slider value change
  const handleSliderChange = (
    values: number[],   // Current value or values of the slider
    handle: number,     // Index of the slider handle that caused the event
    unformatted: number[], // Unformatted values of the slider
    tap: boolean,       // Indicates if the change was triggered by tapping the slider
    positions: number[] // Positions of the handles in percentage of the total range
  ) => {
    const newValue = values.map(v => Math.round(v));
    setPriceRange(newValue);
    setFilters({ priceRange: newValue });
  };

  return (
    <div className="flex flex-row gap-4 p-4">
      {/* Search Input */}
      <input 
        type="text"
        placeholder="Search"
        onChange={handleSearchChange}
        className="border border-gray-300 p-2 rounded"
      />

      {/* Price Range Slider */}
      <div className="w-full">
        <label htmlFor="price-range-slider" className="block text-sm font-medium text-gray-700">
          Price Range
        </label>
        <Nouislider
          id="price-range-slider"
          range={{ min: 0, max: 100 }}
          start={priceRange}
          connect
          tooltips
          onChange={handleSliderChange}
          className="slider"
        />
      </div>
    </div>
  );
};
