import React from 'react';
import { useSearchContext } from './SearchContextProvider';
import { SortOrder } from './types'; // Assuming SortOrder is correctly imported
import { formatNumberCurrency, formatNumber } from './helpers'

export const PropertyList = () => {
  const { properties, sortOrder, setSortOrder } = useSearchContext();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, direction] = event.target.value.split(',');
    setSortOrder({ field, direction } as SortOrder);
  };

  // Construct the select value from the current sortOrder state
  const selectValue = `${sortOrder.field},${sortOrder.direction}`;

  return (
    <div>
      <h2 className="px-4 text-xl font-semibold">Properties</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-4 px-4 pb-4">
        <div>{properties.length} results</div>
        <div className="flex justify-end text-base">
          <label htmlFor="sort" className="p-1">Sort:</label>
          <select id="sort" onChange={handleSortChange} value={selectValue} className="font-semibold text-base text-blue-500 border-none rounded-lg p-1">
            <option className="text-gray-600" value="createdAt,descending">Newest</option>
            <option className="text-gray-600" value="createdAt,ascending">Oldest</option>
            <option className="text-gray-600" value="price,ascending">Price Low to High</option>
            <option className="text-gray-600" value="price,descending">Price High to Low</option>
            <option className="text-gray-600" value="titleAcres,ascending">Least Acres</option>
            <option className="text-gray-600" value="titleAcres,descending">Most Acres</option>
            <option className="text-gray-600" value="cultivatedAcres,ascending">Least Cultivated Acres</option>
            <option className="text-gray-600" value="cultivatedAcres,descending">Most Cultivated Acres</option>
            <option className="text-gray-600" value="soilFinalRating,ascending">Lowest Soil Rating</option>
            <option className="text-gray-600" value="soilFinalRating,descending">Highest Soil Rating</option>
            <option className="text-gray-600" value="avgAVPerQtr,ascending">Lowest Avg AV/Qtr</option>
            <option className="text-gray-600" value="avgAVPerQtr,descending">Highest Avg AV/Qtr</option>
            <option className="text-gray-600" value="improvements,ascending">Least Improvements</option>
            <option className="text-gray-600" value="improvements,descending">Most Improvements</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-4 p-4">
        {properties.map((property) => (
          <div key={property._id} className="border rounded-lg overflow-hidden shadow-lg">
            <img src={property.imageUrls[0]} alt={property.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div>
              <div className="text-sm">For Sale</div>
              <h3 className="text-xlg font-bold">{formatNumberCurrency(property.price)}</h3>
              <div className="flex flex-cols-2 w-full gap-2 items-center">
                icon
              <span className="text-base font-medium text-gray-600">{property.ruralMunicipality || 'Rural Municipality'}</span>
            </div>
            <div className="p-4">
              </div>
              </div>
              <div>Title Acres: <span className="font-medium text-gray-600">{formatNumber(property.titleAcres)}</span></div>
              {property.avgAVPerQtr && (
                <div>
                  Avg. AV/Qtr: <span className="font-medium text-gray-600">{formatNumber(property.avgAVPerQtr)}</span>
                </div>
              )}
              <div>Soil Final Rating: <span className="font-medium text-gray-600">{formatNumber(property.titleAcres)}</span></div>
              <div>$/acre: <span className="font-medium text-gray-600">{formatNumber(property.price / property.titleAcres)}</span></div>
            </div>
            <div className="px-4 text-sm flex items-end">
              {property.brokerage}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};