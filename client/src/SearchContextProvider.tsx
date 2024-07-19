import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapBounds, SearchContextState, Property, SortOrder } from './types';

const initialState: SearchContextState = {
  searchQuery: '',
  setSearchQuery: () => {},
  filters: {},
  setFilters: () => {},
  mapViewport: {},
  setMapViewport: () => {},
  properties: [],
  mapBounds: null,
  setMapBounds: () => {},
  sortOrder: { field: 'createdAt', direction: 'descending' },
  setSortOrder: () => {}
};

const SearchContext = createContext<SearchContextState>({} as SearchContextState);
export const useSearchContext = () => useContext(SearchContext);

interface SearchContextProviderProps {
  children: ReactNode;
}

export const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(location.search);
  const initialSearchQuery = urlParams.get('searchQuery') || '';
  const initialFilters = JSON.parse(urlParams.get('filters') || '{}');
  const initialMapViewport = JSON.parse(urlParams.get('mapViewport') || '{}');
  let initialMapBounds: MapBounds | null = null;
  const boundsParam = urlParams.get('mapBounds');
  if (boundsParam) {
    const [neLat, neLng, swLat, swLng] = boundsParam.split(',').map(parseFloat);
    initialMapBounds = { _northEast: { lat: neLat, lng: neLng }, _southWest: { lat: swLat, lng: swLng } };
  }

  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [filters, setFilters] = useState<Record<string, any>>(initialFilters);
  const [mapViewport, setMapViewport] = useState<Record<string, any>>(initialMapViewport);
  const [mapBounds, setMapBounds] = useState<MapBounds | null>(initialMapBounds);
  const [properties, setProperties] = useState<Property[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialState.sortOrder);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        const sortedProperties = response.data.sort((a, b) => {
          const valueA = a[sortOrder.field];
          const valueB = b[sortOrder.field];
          if (sortOrder.direction === 'ascending') {
            return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
          } else {
            return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
          }
        });
        setProperties(sortedProperties);
      } catch (error: any) {
        setError(error?.response?.data?.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, filters, mapViewport, mapBounds, sortOrder]);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, filters, setFilters, mapViewport, setMapViewport, properties, mapBounds, setMapBounds, sortOrder, setSortOrder }}>
      {children}
    </SearchContext.Provider>
  );
};
