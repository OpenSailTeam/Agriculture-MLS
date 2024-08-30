import { LatLngBounds, LatLngBoundsExpression } from 'leaflet';
import React, { ReactNode } from 'react';

  export interface MapBounds {
    _northEast: { lat: number, lng: number };
    _southWest: { lat: number, lng: number };
  }
  
  export interface SearchContextState {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filters: Record<string, any>;
    setFilters: (filters: Record<string, any>) => void;
    mapViewport: Record<string, any>;
    setMapViewport: (viewport: Record<string, any>) => void;
    properties: Property[];
    mapBounds: LatLngBounds | undefined;
    setMapBounds: (bounds: LatLngBounds) => void;
    sortOrder: SortOrder;
    setSortOrder: (order: SortOrder) => void;
    hoveredPropertyId: string;
    setHoveredPropertyId: (id: string) => void;
    clickedPropertyId: string;
    setClickedPropertyId: (id: string) => void;
  }

  export interface Filters {
    priceRange: [number, number];
    acresRange: [number, number];
    soilRange: [number, number];
    serviceType: string[];
    listingStatus: string[];
    updates: string[];
    enterprises: string[];
  }  

  export   const defaultFilters = {
    priceRange: [0, Number.MAX_SAFE_INTEGER],
    acresRange: [0, Number.MAX_SAFE_INTEGER],
    soilRange: [0, 100],
    serviceType: [],
    listingStatus: [],
    updates: [],
    enterprises: []
  };
  
  export interface Property {
    _id: string;
    title: string;
    description: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    address: string;
    imageUrls: Array<string>;
    location: Location;
    enterprises: Array<string>;
    closestTown: string;
    ruralMunicipality: string;
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
  
  export interface SortOrder {
    field: keyof Property;
    direction: 'ascending' | 'descending';
  }

  export interface Location {
    type: string;
    coordinates: [number, number];
  }

  export interface SearchContextProviderProps {
    children: ReactNode;
  }