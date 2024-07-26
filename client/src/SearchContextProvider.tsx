import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContextState, Property, SortOrder, defaultFilters } from './types';
import { LatLngBounds, latLngBounds, LatLngBoundsExpression } from 'leaflet';

const initialState: SearchContextState = {
  searchQuery: '',
  setSearchQuery: () => {},
  filters: {},
  setFilters: () => {},
  mapViewport: {},
  setMapViewport: () => {},
  properties: [],
  mapBounds: undefined,
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

  let initialFilters = defaultFilters;
  const filterParams = urlParams.get('filters');
  if (filterParams) {
      initialFilters = JSON.parse(filterParams);
  }
  
  const initialMapViewport = JSON.parse(urlParams.get('mapViewport') || '{}');
  let initialMapBounds: LatLngBounds | undefined = latLngBounds(
    { lat: 45.75219336063106, lng: -112.96142578125001 },
    { lat: 57.25528054528889, lng: -95.88867187500001 }
  );
  const boundsParam = urlParams.get('mapBounds');
if (boundsParam) {
    const [neLat, neLng, swLat, swLng] = boundsParam.split(',').map(parseFloat);
    initialMapBounds = latLngBounds(
        { lat: swLat, lng: swLng },
        { lat: neLat, lng: neLng }
    );
}

  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [filters, setFilters] = useState<Record<string, any>>(initialFilters);
  const [mapViewport, setMapViewport] = useState<Record<string, any>>(initialMapViewport);
  const [mapBounds, setMapBounds] = useState<LatLngBounds | undefined>(initialMapBounds);
  const [properties, setProperties] = useState<Property[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialState.sortOrder);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('searchQuery', searchQuery);
    params.set('filters', JSON.stringify(filters));
    params.set('mapViewport', JSON.stringify(mapViewport));
    params.set('sort', sortOrder.field);
    params.set('order', sortOrder.direction);
    if (mapBounds) {
      params.set('mapBounds', `${mapBounds.getNorthEast().lat},${mapBounds.getNorthEast().lng},${mapBounds.getSouthWest().lat},${mapBounds.getSouthWest().lng}`);
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
          queryParams.append("neLat", mapBounds.getNorthEast().lat.toString());
          queryParams.append("neLng", mapBounds.getNorthEast().lng.toString());
          queryParams.append("swLat", mapBounds.getSouthWest().lat.toString());
          queryParams.append("swLng", mapBounds.getSouthWest().lng.toString());
        }
        queryParams.append("searchTerm", searchQuery);
        queryParams.append("filters", JSON.stringify(filters));
        queryParams.append("sort", sortOrder.field);
        queryParams.append("order", sortOrder.direction);
        const url = `http://localhost:5000/api/listing/get?${queryParams.toString()}`;
        const response = await axios.get<Property[]>(url);
        setProperties(response.data);
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