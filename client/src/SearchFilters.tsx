import React, { useState } from "react";
import { FilterPopover } from "./FilterPopover";
import { useSearchContext } from "./SearchContextProvider";

export const SearchFilters = () => {
  const { setSearchQuery, setFilters } = useSearchContext();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [serviceType, setServiceType] = useState([
    "Listing",
    "Tender",
    "Auction",
    "Lease",
    "Wanted",
  ]);
  const [listingStatus, setListingStatus] = useState([
    "Active",
    "Pending",
    "Sold/Leased",
  ]);
  const [updates, setUpdates] = useState([
    "New Listing",
    "Price Reduced",
    "Modified Listing",
    "Back on the Market",
  ]);

  const stateSetters = {
    serviceType: setServiceType,
    listingStatus: setListingStatus,
    updates: setUpdates,
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCheckboxChange = (
    value: string,
    category: keyof typeof stateSetters
  ) => {
    const setState = stateSetters[category];
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const applyFilters = () => {
    setFilters({
      priceRange: [minPrice, maxPrice],
      serviceType,
      listingStatus,
      updates,
    });
  };

  return (
    <div className="flex flex-row gap-4 p-4">
      <input
        type="text"
        placeholder="Search"
        onChange={handleSearchChange}
        className="border border-solid border-gray-300 p-2 rounded"
      />

      <FilterPopover label="Listing Status" onApply={applyFilters}>
        <div className="p-4 font-medium text-sm bg-gray-100 text-gray-600">
          <h3>Type</h3>
        </div>
        <div className="p-4">
          {["Listing", "Tender", "Auction", "Lease", "Wanted"].map((type) => (
            <label className="flex mb-2" key={type}>
              <input
                type="checkbox"
                className="inline-block m-0 mr-3 appearance-none rounded border-2 border-solid border-gray-300 bg-gray-100 h-5 w-5 checked:bg-blue-500"
                checked={serviceType.includes(type)}
                onChange={() => handleCheckboxChange(type, "serviceType")}
              />
              <span className="inline-block">{type}</span>
            </label>
          ))}
        </div>
        <div className="p-4 font-medium text-sm bg-gray-100 text-gray-600">
          <h3>Status</h3>
        </div>
        <div className="p-4">
          {["Active", "Pending", "Sold/Leased"].map((status) => (
            <label className="flex mb-2" key={status}>
              <input
                type="checkbox"
                className="inline-block m-0 mr-3 appearance-none rounded border-2 border-solid border-gray-300 bg-gray-100 h-5 w-5 checked:bg-blue-500"
                checked={listingStatus.includes(status)}
                onChange={() => handleCheckboxChange(status, "listingStatus")}
              />
              <span className="inline-block">{status}</span>
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
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
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
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
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

      <FilterPopover label="Updates" onApply={applyFilters}>
        <div className="p-4 font-medium text-sm bg-gray-100 text-gray-600">
          <h3>Type</h3>
        </div>
        <div className="p-4">
          {["New Listing", "Price Reduced", "Modified Listing", "Back on the Market"].map((type) => (
            <label className="flex mb-2" key={type}>
              <input
                type="checkbox"
                className="inline-block m-0 mr-3 appearance-none rounded border-2 border-solid border-gray-300 bg-gray-100 h-5 w-5 checked:bg-blue-500"
                checked={updates.includes(type)}
                onChange={() => handleCheckboxChange(type, "updates")}
              />
              <span className="inline-block">{type}</span>
            </label>
          ))}
        </div>
      </FilterPopover>
    </div>
  );
};
