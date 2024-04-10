import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the shape of the context state
interface SearchContextState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
  mapViewport: Record<string, any>;
  setMapViewport: (viewport: Record<string, any>) => void;
}

// Initial state
const initialState: SearchContextState = {
  searchQuery: '',
  setSearchQuery: () => {},
  filters: {},
  setFilters: () => {},
  mapViewport: {},
  setMapViewport: () => {},
};

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

  // Optionally, sync with URL query params
  useEffect(() => {
    // Parse URL params and update local state if needed
    // This is where you'd synchronize your context state with the URL.
  }, []);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, filters, setFilters, mapViewport, setMapViewport }}>
      {children}
    </SearchContext.Provider>
  );
};
