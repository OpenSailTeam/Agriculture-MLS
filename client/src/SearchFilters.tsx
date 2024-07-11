import React from "react";
import { useCallback, useMemo } from 'react';
import { FilterPopover } from "./FilterPopover";
import { useSearchContext } from "./SearchContextProvider";

export const SearchFilters = () => {
  const { searchQuery, setSearchQuery, filters, setFilters } = useSearchContext();
  const { priceRange = [0, Number.MAX_SAFE_INTEGER], acresRange = [0, Number.MAX_SAFE_INTEGER], serviceType = [], listingStatus = [], updates = [] } = filters;
  

  const stateSetters = {
    serviceType: (newServiceType: string[]) => setFilters({ ...filters, serviceType: newServiceType }),
    listingStatus: (newListingStatus: string[]) => setFilters({ ...filters, listingStatus: newListingStatus }),
    updates: (newUpdates: string[]) => setFilters({ ...filters, updates: newUpdates }),
    priceRange: (newPriceRange: [number, number]) => setFilters({ ...filters, priceRange: newPriceRange }),
    acresRange: (newAcresRange: [number, number]) => setFilters({ ...filters, acresRange: newAcresRange }),
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCheckboxChange = (
    value: string,
    category: keyof typeof stateSetters
  ) => {
    const currentValues = filters[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((item: string) => item !== value)
      : [...currentValues, value];
    stateSetters[category](newValues);
  };

  const handlePriceChange = (min: number, max: number) => {
    stateSetters.priceRange([min, max]);
  };

  const handleAcresChange = (min: number, max: number) => {
    stateSetters.acresRange([min, max]);
  };

  const applyFilters = () => {
    setFilters({
      priceRange,
      acresRange,
      serviceType,
      listingStatus,
      updates,
    });
  };

  return (
    <div className="flex flex-row gap-4 p-2">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        className="border border-solid border-gray-300 p-2 rounded"
      />

      <FilterPopover label="Listing Status" onApply={applyFilters}>
        <div className="p-4 font-medium text-sm bg-gray-100 text-gray-600">
          <h3>Type</h3>
        </div>
        <div className="p-4">
          {["Listing", "Tender", "Auction", "Lease", "Wanted"].map((type) => (
            <label className="flex items-center mb-2 gap-3 w-full" key={type}>
              <input
                type="checkbox"
                className="inline-block appearance-none rounded border-2 border-solid border-gray-300 bg-gray-100 h-5 w-5 checked:bg-blue-500 flex-shrink-0"
                checked={serviceType.includes(type)}
                onChange={() => handleCheckboxChange(type, "serviceType")}
              />
              <span className="flex-grow min-w-0">{type}</span>
            </label>
          ))}
        </div>
        <div className="p-4 font-medium text-sm bg-gray-100 text-gray-600">
          <h3>Status</h3>
        </div>
        <div className="p-4">
          {["Active", "Pending", "Sold/Leased"].map((type) => (
            <label className="flex items-center mb-2 gap-3 w-full" key={type}>
              <input
                type="checkbox"
                className="inline-block appearance-none rounded border-2 border-solid border-gray-300 bg-gray-100 h-5 w-5 checked:bg-blue-500 flex-shrink-0"
                checked={listingStatus.includes(type)}
                onChange={() => handleCheckboxChange(type, "listingStatus")}
              />
              <span className="flex-grow min-w-0">{type}</span>
            </label>
          ))}
        </div>
      </FilterPopover>

      <FilterPopover label="Price" onApply={applyFilters}>
        <div className="p-4 font-medium text-sm bg-gray-100 text-gray-600">
          <h3>Price Range</h3>
        </div>
        <div className="p-4">
          <div className="flex gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-900 pb-1">
                Minimum
              </label>
              <select
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(Number(e.target.value), priceRange[1])}
                className="border border-solid bg-gray-100 border-gray-300 rounded p-2"
              >
                {[
                  0, 50000, 100000, 150000, 200000, 250000, 300000, 350000,
                  400000, 450000, 500000, 550000, 600000, 650000, 700000,
                  750000, 800000, 850000, 900000, 950000, 1000000, 1250000,
                  1500000, 1750000, 2000000, 2250000, 2500000, 2750000, 3000000,
                  3250000, 3500000, 3750000, 4000000, 4250000, 4500000, 4750000,
                  5000000, 6000000, 7000000, 8000000, 9000000, 10000000,
                  15000000, 20000000, 30000000, 40000000, 50000000, 1000000000,
                ].map((price) => (
                  <option key={price} value={price}>
                    {price}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 pb-1">
                Maximum
              </label>
              <select
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(priceRange[0], Number(e.target.value))}
                className="border border-solid bg-gray-100 border-gray-300 rounded p-2"
              >
                {[
                  50000,
                  100000,
                  150000,
                  200000,
                  250000,
                  300000,
                  350000,
                  400000,
                  450000,
                  500000,
                  550000,
                  600000,
                  650000,
                  700000,
                  750000,
                  800000,
                  850000,
                  900000,
                  950000,
                  1000000,
                  1250000,
                  1500000,
                  1750000,
                  2000000,
                  2250000,
                  2500000,
                  2750000,
                  3000000,
                  3250000,
                  3500000,
                  3750000,
                  4000000,
                  4250000,
                  4500000,
                  4750000,
                  5000000,
                  6000000,
                  7000000,
                  8000000,
                  9000000,
                  10000000,
                  15000000,
                  20000000,
                  30000000,
                  40000000,
                  50000000,
                  1000000000,
                  Number.MAX_SAFE_INTEGER,
                ].map((price) => (
                  <option key={price} value={price}>
                    {price}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </FilterPopover>

      <FilterPopover label="Title Acres" onApply={applyFilters}>
        <div className="p-4 font-medium text-sm bg-gray-100 text-gray-600">
          <h3>Acres Range</h3>
        </div>
        <div className="p-4">
          <div className="flex gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-900 pb-1">
                Minimum
              </label>
              <select
                value={acresRange[0]}
                onChange={(e) => handleAcresChange(Number(e.target.value), acresRange[1])}
                className="border border-solid bg-gray-100 border-gray-300 rounded p-2"
              >
                {[
                  0, 160, 320, 640, 1280, 2560, 5120, 10240,
                ].map((acres) => (
                  <option key={acres} value={acres}>
                    {acres}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 pb-1">
                Maximum
              </label>
              <select
                value={acresRange[1]}
                onChange={(e) => handleAcresChange(acresRange[0], Number(e.target.value))}
                className="border border-solid bg-gray-100 border-gray-300 rounded p-2"
              >
                {[
                  160, 320, 640, 1280, 2560, 5120, 10240, Number.MAX_SAFE_INTEGER,
                ].map((acres) => (
                  <option key={acres} value={acres}>
                    {acres}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </FilterPopover>

      <FilterPopover label="Updates" onApply={applyFilters}>
        <div className="p-4 font-medium text-sm bg-gray-100 text-gray-600">
          <h3>Type</h3>
        </div>
        <div className="p-4">
          {["New Listing", "Price Reduced", "Modified Listing", "Back on the Market"].map((type) => (
            <label className="flex items-center mb-2 gap-3 w-full" key={type}>
              <input
                type="checkbox"
                className="inline-block appearance-none rounded border-2 border-solid border-gray-300 bg-gray-100 h-5 w-5 checked:bg-blue-500 flex-shrink-0"
                checked={updates.includes(type)}
                onChange={() => handleCheckboxChange(type, "updates")}
              />
              <span className="flex-grow min-w-0">{type}</span>
            </label>
          ))}
        </div>
      </FilterPopover>
    </div>
  );
};
