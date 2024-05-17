import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

// Define additional interface for map bounds
interface MapBounds {
  _northEast: { lat: number, lng: number };
  _southWest: { lat: number, lng: number };
}

interface SearchContextState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
  mapViewport: Record<string, any>;
  setMapViewport: (viewport: Record<string, any>) => void;
  properties: Property[];
  mapBounds: MapBounds | null;
  setMapBounds: (bounds: MapBounds) => void;
}

const initialState: SearchContextState = {
  searchQuery: '',
  setSearchQuery: () => {},
  filters: {},
  setFilters: () => {},
  mapViewport: {},
  setMapViewport: () => {},
  properties: [],
  mapBounds: null,
  setMapBounds: () => {}
};

interface Location {
  type: string;
  coordinates: [number, number];  // Array with two elements: longitude and latitude
}

interface Property {
  _id: string;
  title: string;
  price: string;
  address: string;
  imageUrls: Array<string>;
  location: Location;
}

// Create context
const SearchContext = createContext<SearchContextState>(initialState);

// Custom hook to use the SearchContext
export const useSearchContext = () => useContext(SearchContext);

// Provider component
interface SearchContextProviderProps {
  children: ReactNode;
}

export const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialState.searchQuery);
  const [filters, setFilters] = useState<Record<string, any>>(initialState.filters);
  const [mapViewport, setMapViewport] = useState<Record<string, any>>(initialState.mapViewport);
  const [properties, setProperties] = useState<Property[]>(initialState.properties);
  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchData().then(data => {
      setProperties(data);
      setLoading(false);
    }).catch(err => {
      setError(err.message);
      setLoading(false);
    });
  }, [searchQuery, filters, mapViewport, mapBounds]);

  const fetchData = async () => {
    try {
  
      const queryParams = new URLSearchParams();
      if (mapBounds) {
        queryParams.append("neLat", mapBounds._northEast.lat.toString());
        queryParams.append("neLng", mapBounds._northEast.lng.toString());
        queryParams.append("swLat", mapBounds._southWest.lat.toString());
        queryParams.append("swLng", mapBounds._southWest.lng.toString());
      }
      // Additional existing parameters
      queryParams.append("searchTerm", searchQuery);
      queryParams.append("filters", JSON.stringify(filters || {}));
      console.log(queryParams.toString());
  
      const url = `http://localhost:5000/api/listing/get?${queryParams}`;
      const response = await axios.get<Property[]>(url);
      const properties = response.data.map(property => ({
        ...property,
        imageUrls: property.imageUrls && property.imageUrls.length > 0 ? property.imageUrls : ['path/to/default/image.jpg']
      }));
      return properties;
    } catch (error) {
      console.error('Failed to fetch properties:', error);
      return [];  // Return empty array on error
    }
  };
  
  
  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, filters, setFilters, mapViewport, setMapViewport, properties, mapBounds, setMapBounds }}>
      {children}
    </SearchContext.Provider>
  );
};