import React, { useState, useRef } from "react";
import './styles.css';
import { useSearchContext } from "./SearchContextProvider";
import { SortOrder } from "./types"; 
import {
  formatNumberCurrency,
  formatNumber,
  getStatusText,
  timeAgo,
  placeholderImageUrl
} from "./helpers";
import { MarkerIcon } from "./MarkerIcon";

export const PropertyList = () => {
  const { properties, sortOrder, setSortOrder, setHoveredPropertyId, setClickedPropertyId } = useSearchContext();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, direction] = event.target.value.split(",");
    setSortOrder({ field, direction } as SortOrder);
  };

  const handleMouseEnter = (propertyId: string) => {
    setHoveredPropertyId(propertyId);
  };

  const handleMouseLeave = () => {
    setHoveredPropertyId('');
  };

  const handleClickProperty = (propertyId: string) => {
    setClickedPropertyId(propertyId);
  };

  // Construct the select value from the current sortOrder state
  const selectValue = `${sortOrder.field},${sortOrder.direction}`;

  return (
    <div>
      <h2 className="px-4 text-xl font-semibold">Properties</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-4 px-4 pb-4">
        <div>{properties.length} results</div>
        <div className="flex justify-end text-base">
          <label htmlFor="sort" className="p-1">
            Sort:
          </label>
          <select
            id="sort"
            onChange={handleSortChange}
            value={selectValue}
            className="font-semibold text-base text-blue-500 border-none rounded-lg p-1"
          >
            <option className="text-gray-600" value="createdAt,descending">
              Newest
            </option>
            <option className="text-gray-600" value="createdAt,ascending">
              Oldest
            </option>
            <option className="text-gray-600" value="price,ascending">
              Price Low to High
            </option>
            <option className="text-gray-600" value="price,descending">
              Price High to Low
            </option>
            <option className="text-gray-600" value="titleAcres,ascending">
              Least Acres
            </option>
            <option className="text-gray-600" value="titleAcres,descending">
              Most Acres
            </option>
            <option className="text-gray-600" value="cultivatedAcres,ascending">
              Least Cultivated Acres
            </option>
            <option
              className="text-gray-600"
              value="cultivatedAcres,descending"
            >
              Most Cultivated Acres
            </option>
            <option className="text-gray-600" value="soilFinalRating,ascending">
              Lowest Soil Rating
            </option>
            <option
              className="text-gray-600"
              value="soilFinalRating,descending"
            >
              Highest Soil Rating
            </option>
            <option className="text-gray-600" value="avgAVPerQtr,ascending">
              Lowest Avg AV/Qtr
            </option>
            <option className="text-gray-600" value="avgAVPerQtr,descending">
              Highest Avg AV/Qtr
            </option>
            <option className="text-gray-600" value="improvements,ascending">
              Least Improvements
            </option>
            <option className="text-gray-600" value="improvements,descending">
              Most Improvements
            </option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-4 p-4">
        {properties.map((property) => (
          <div tabIndex={0} aria-label="View property details"
          key={property._id}
          className={`border rounded-lg overflow-hidden shadow-lg flex flex-col relative hover:bg-gray-50 hover:cursor-pointer`}
          onMouseEnter={() => handleMouseEnter(property._id)}
          onMouseLeave={handleMouseLeave}
          >
            <img
              src={property.imageUrls[0] || placeholderImageUrl}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute m-2 px-1 bg-black bg-opacity-70 rounded-md text-white">
              {timeAgo(property.createdAt)}
            </div>
            <div className="p-4 flex flex-col gap-4 justify-between grow">
              <div className="flex flex-col gap-2">
                <div>
                  <div>
                    <div className="text-sm">
                      {getStatusText(
                        property.listingStatus,
                        property.serviceType
                      )}
                    </div>
                    <h3 className="text-xl font-bold">
                      {formatNumberCurrency(property.price)}
                    </h3>
                    <div className="flex flex-cols-2 w-full gap-1 items-center">
                      {MarkerIcon("#1d4ed8", 20)}
                      <span className="text-base text-gray-600">
                        {property.ruralMunicipality || "Rural Municipality"}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <span className="font-medium text-lg text-gray-600">
                      {formatNumber(property.titleAcres)} Acres
                    </span>
                  </div>
                  {property.avgAVPerQtr && (
                    <div>
                      <span className="font-light">Avg. AV/Qtr: </span>
                      <span className="font-medium text-gray-600">
                        {formatNumberCurrency(property.avgAVPerQtr)}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="font-light">Soil Final Rating: </span>
                    <span className="font-medium text-gray-600">
                      {formatNumber(property.titleAcres)}
                    </span>
                  </div>
                  <div>
                    <span className="font-light">$/acre: </span>
                    <span className="font-medium text-gray-600">
                      {formatNumberCurrency(
                        property.price / property.titleAcres
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-sm flex items-end grow font-light text-gray-600">
                {property.brokerage}
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};
