import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

// Define the shape of the context state including the properties array
interface SearchContextState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
  mapViewport: Record<string, any>;
  setMapViewport: (viewport: Record<string, any>) => void;
  properties: Property[]; // Define the type based on your expected property structure
}

const initialState: SearchContextState = {
  searchQuery: '',
  setSearchQuery: () => {},
  filters: {},
  setFilters: () => {},
  mapViewport: {},
  setMapViewport: () => {},
  properties: [],
};

interface Location {
  type: string;
  coordinates: [number, number];  // Array with two elements: longitude and latitude
}

interface Property {
  id: string;
  title: string;
  price: string;
  address: string;
  imageUrls: string;
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: sync with URL query params
  useEffect(() => {
    setLoading(true);
    fetchData().then(data => {
      setProperties(data);
      setLoading(false);
    }).catch(err => {
      setError(err.message);
      setLoading(false);
    });
  }, [searchQuery, filters, mapViewport]);

  const fetchData = async () => {
    try {
      // Check if lat and lng are defined, provide default values if not
      const lat = mapViewport.lat ?? '51.505';  // Default latitude
      const lng = mapViewport.lng ?? '-0.09';  // Default longitude
      const searchTerm = searchQuery || '';  // Use empty string if searchQuery is undefined
      const distance = '5';  // Static distance as string
  
      // Construct the query parameters as strings
      const queryParams = new URLSearchParams({
        lat: lat.toString(),  // Convert latitude to string, safe due to default or existing value
        lng: lng.toString(),  // Convert longitude to string, safe due to default or existing value
        distance,             // Already a string
        searchTerm,           // Already a string or empty
        filters: JSON.stringify(filters || {})  // Ensure filters is an object and stringify it
      }).toString();
  
      const url = `http://localhost:5000/api/listing/get?${queryParams}`;
      const response = await axios.get(url);
      return response.data; // Assuming the API returns the list of properties
    } catch (error) {
      console.error('Failed to fetch properties:', error);
      return [];  // Return empty array on error
    }
  };
  
  
  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, filters, setFilters, mapViewport, setMapViewport, properties }}>
      {children}
    </SearchContext.Provider>
  );
};
