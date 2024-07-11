import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'

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
  description: string;
  price: string;
  address: string;
  imageUrls: Array<string>;
  location: Location;
  enterprises: Array<string>;
  closestTown: string;
  updates: Array<string>;
  listingStatus: string;
  mlsNumber: string;
  videoLink: string;
  brokerage: string;
  serviceType: string;
  titleAcres: number;
  cultivatedAcres: number;
  soilFinalRating: number;
  avgAVPerQtr: number;
  improvements: number;
}

// Create context
const SearchContext = createContext<SearchContextState>({} as SearchContextState);
export const useSearchContext = () => useContext(SearchContext);

interface SearchContextProviderProps {
  children: ReactNode;
}

export const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse URL parameters right at the start
  const urlParams = new URLSearchParams(location.search);
  const initialSearchQuery = urlParams.get('searchQuery') || '';
  const initialLocationSearchQuery = urlParams.get('searchQuery') || '';
  const initialFilters = JSON.parse(urlParams.get('filters') || '{}');
  const initialMapViewport = JSON.parse(urlParams.get('mapViewport') || '{}');
  let initialMapBounds: MapBounds | null = null;
  const boundsParam = urlParams.get('mapBounds');
  if (boundsParam) {
    const [neLat, neLng, swLat, swLng] = boundsParam.split(',').map(parseFloat);
    initialMapBounds = { _northEast: { lat: neLat, lng: neLng }, _southWest: { lat: swLat, lng: swLng } };
  }

  // State initialization with direct URL parameter integration
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [locationSearchQuery, setLocationSearchQuery] = useState<string>(initialLocationSearchQuery);
  const [filters, setFilters] = useState<Record<string, any>>(initialFilters);
  const [mapViewport, setMapViewport] = useState<Record<string, any>>(initialMapViewport);
  const [mapBounds, setMapBounds] = useState<MapBounds | null>(initialMapBounds);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update URL parameters whenever state changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('searchQuery', searchQuery);
    params.set('filters', JSON.stringify(filters));
    params.set('mapViewport', JSON.stringify(mapViewport));
    if (mapBounds) {
      params.set('mapBounds', `${mapBounds._northEast.lat},${mapBounds._northEast.lng},${mapBounds._southWest.lat},${mapBounds._southWest.lng}`);
    }
    navigate(`?${params.toString()}`, { replace: true });
  }, [searchQuery, filters, mapViewport, mapBounds, navigate]);

  // Fetch data whenever relevant states change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams();
        if (mapBounds) {
          queryParams.append("neLat", mapBounds._northEast.lat.toString());
          queryParams.append("neLng", mapBounds._northEast.lng.toString());
          queryParams.append("swLat", mapBounds._southWest.lat.toString());
          queryParams.append("swLng", mapBounds._southWest.lng.toString());
        }
        queryParams.append("searchTerm", searchQuery);
        queryParams.append("filters", JSON.stringify(filters));
        const url = `http://localhost:5000/api/listing/get?${queryParams.toString()}`;
        const response = await axios.get<Property[]>(url);
        setProperties(response.data);
      } catch (error: unknown) {
        if (typeof error === 'string') {
          setError(error);
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, filters, mapViewport, mapBounds]);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, filters, setFilters, mapViewport, setMapViewport, properties, mapBounds, setMapBounds }}>
      {children}
    </SearchContext.Provider>
  );
};