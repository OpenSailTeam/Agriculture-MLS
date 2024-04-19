import React from 'react';
import { useSearchContext } from './SearchContextProvider'; // Import the context hook if using context for state management
import { mockProperties } from './data/mockProperties';

interface Property {
  id: number;
  title: string;
  price: string;
  address: string;
  imageUrl: string;
}

export const PropertyList = () => {
  const { properties } = useSearchContext();  // Use the properties from context

  return (
    <div className="grid grid-cols-2 w-full gap-4 p-4">
      {properties.map((property) => (
        <div key={property.id} className="border rounded-lg overflow-hidden shadow-lg">
          <img src={property.imageUrls[0]} alt={property.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{property.title}</h3>
            <p className="text-sm text-gray-600">{property.address}</p>
            <p className="text-xl font-bold">{property.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

