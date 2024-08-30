import React from "react";
import { useCallback, useMemo, useRef } from 'react';
import { FilterPopover } from "./FilterPopover";
import { useSearchContext } from "./SearchContextProvider";
import { defaultFilters } from './types';
import { formatNumberCurrency, formatNumber } from './helpers'

const isDefault = (value: any, defaultValue: any) => {
  if (Array.isArray(value)) {
    return value.length === defaultValue.length && value.every((v, i) => v === defaultValue[i]);
  }
  return value === defaultValue;
};

export const SearchFilters = () => {
  const { searchQuery, setSearchQuery, filters, setFilters } = useSearchContext();
  const { priceRange = [0, Number.MAX_SAFE_INTEGER], acresRange = [0, Number.MAX_SAFE_INTEGER], soilRange = [0, 100], serviceType = [], listingStatus = [], updates = [], enterprises = [] } = filters;
  
  const stateSetters = {
    serviceType: (newServiceType: string[]) => setFilters({ ...filters, serviceType: newServiceType }),
    listingStatus: (newListingStatus: string[]) => setFilters({ ...filters, listingStatus: newListingStatus }),
    updates: (newUpdates: string[]) => setFilters({ ...filters, updates: newUpdates }),
    enterprises: (newEnterprises: string[]) => setFilters({ ...filters, enterprises: newEnterprises }),
    priceRange: (newPriceRange: [number, number]) => setFilters({ ...filters, priceRange: newPriceRange }),
    acresRange: (newAcresRange: [number, number]) => setFilters({ ...filters, acresRange: newAcresRange }),
    soilRange: (newSoilRange: [number, number]) => setFilters({ ...filters, soilRange: newSoilRange }),
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

  const handleSoilChange = (min: number, max: number) => {
    stateSetters.soilRange([min, max]);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <div className="flex flex-row gap-4 p-2">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
          </div>
        <input
          type="search"
          placeholder="Property name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-solid border-gray-300 block px-4 py-2 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50 search-cancel:fill-blue-400 search-cancel:h-4 search-cancel:w-4 search-cancel:appearance-none search-cancel:bg-[url(assets/clear.svg)] search-cancel:cursor-pointer"
        />
      </div>

      <FilterPopover label="Listing Status" hasChanges={!isDefault(filters.serviceType, defaultFilters.serviceType) || !isDefault(filters.listingStatus, defaultFilters.listingStatus)}>
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

      <FilterPopover label="Price" hasChanges={!isDefault(filters.priceRange, defaultFilters.priceRange)}>
        <div className="p-4 font-medium text-sm bg-gray-100 text-gray-600">
          <h3>Price Range</h3>
        </div>
        <div className="p-4">
          <div className="flex gap-2">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-900 pb-1">
                Minimum
              </label>
              <select
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(Number(e.target.value), priceRange[1])}
                className="border border-solid bg-gray-100 border-gray-300 rounded p-2 w-full text-base"
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
                    {formatNumberCurrency(price)}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-900 pb-1">
                Maximum
              </label>
              <select
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(priceRange[0], Number(e.target.value))}
                className="border border-solid bg-gray-100 border-gray-300 rounded p-2 w-full text-base"
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
                    {price === Number.MAX_SAFE_INTEGER ? '∞' : formatNumberCurrency(price)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </FilterPopover>

      <FilterPopover label="Title Acres" hasChanges={!isDefault(filters.acresRange, defaultFilters.acresRange)}>
        <div className="p-4 font-medium text-sm bg-gray-100 text-gray-600">
          <h3>Acres Range</h3>
        </div>
        <div className="p-4">
          <div className="flex gap-2">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-900 pb-1">
                Minimum
              </label>
              <select
                value={acresRange[0]}
                onChange={(e) => handleAcresChange(Number(e.target.value), acresRange[1])}
                className="border border-solid bg-gray-100 border-gray-300 rounded p-2 w-full text-base"
              >
                {[
                  0, 160, 320, 640, 1280, 2560, 5120, 10240,
                ].map((acres) => (
                  <option key={acres} value={acres}>
                    {formatNumber(acres)}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-900 pb-1">
                Maximum
              </label>
              <select
                value={acresRange[1]}
                onChange={(e) => handleAcresChange(acresRange[0], Number(e.target.value))}
                className="border border-solid bg-gray-100 border-gray-300 rounded p-2 w-full text-base"
              >
                {[
                  160, 320, 640, 1280, 2560, 5120, 10240, Number.MAX_SAFE_INTEGER,
                ].map((acres) => (
                  <option key={acres} value={acres}>
                    {acres === Number.MAX_SAFE_INTEGER ? '∞' : formatNumber(acres)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </FilterPopover>

      <FilterPopover label="Soil Final Rating" hasChanges={!isDefault(filters.soilRange, defaultFilters.soilRange)}>
        <div className="p-4 font-medium text-sm bg-gray-100 text-gray-600">
          <h3>Soil Final Rating Range</h3>
        </div>
        <div className="p-4">
          <div className="flex gap-2">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-900 pb-1">
                Minimum
              </label>
              <select
                value={soilRange[0]}
                onChange={(e) => handleSoilChange(Number(e.target.value), soilRange[1])}
                className="border border-solid bg-gray-100 border-gray-300 rounded p-2 w-full text-base"
              >
                {[
                  0, 10, 20, 30, 40, 50, 60, 70, 80, 90,
                ].map((soilFinalRating) => (
                  <option key={soilFinalRating} value={soilFinalRating}>
                    {formatNumber(soilFinalRating)}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-900 pb-1">
                Maximum
              </label>
              <select
                value={soilRange[1]}
                onChange={(e) => handleSoilChange(soilRange[0], Number(e.target.value))}
                className="border border-solid bg-gray-100 border-gray-300 rounded p-2 w-full text-base"
              >
                {[
                  10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
                ].map((soilFinalRating) => (
                  <option key={soilFinalRating} value={soilFinalRating}>
                    {formatNumber(soilFinalRating)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </FilterPopover>

      <FilterPopover label="Updates" hasChanges={!isDefault(filters.updates, defaultFilters.updates)}>
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

      <FilterPopover label="Enterprise" hasChanges={!isDefault(filters.enterprises, defaultFilters.enterprises)}>
        <div className="p-4 font-medium text-sm bg-gray-100 text-gray-600">
          <h3>Type</h3>
        </div>
        <div className="p-4">
          {["Acreage", "Agribusiness", "Beef/Ranch", "Commercial", "Dairy", "Development Potential", "Feed lot", "Grain", "Greenhouse", "Hay (arable)", "Hog", "Orchard", "Pasture", "Poultry", "Recreational", "Residential", "Specialty livestock", "Other"].map((type) => (
            <label className="flex items-center mb-2 gap-3 w-full" key={type}>
              <input
                type="checkbox"
                className="inline-block appearance-none rounded border-2 border-solid border-gray-300 bg-gray-100 h-5 w-5 checked:bg-blue-500 flex-shrink-0"
                checked={enterprises.includes(type)}
                onChange={() => handleCheckboxChange(type, "enterprises")}
              />
              <span className="flex-grow min-w-0">{type}</span>
            </label>
          ))}
        </div>
      </FilterPopover>

      <button 
      onClick={resetFilters}
      className="text-white end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-semibold rounded-lg text-sm px-4 py-2">
        Reset filters
      </button>
    </div>
  );
};
