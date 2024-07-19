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
    mapBounds: MapBounds | null;
    setMapBounds: (bounds: MapBounds) => void;
    sortOrder: SortOrder;
    setSortOrder: (order: SortOrder) => void;
  }
  
  export interface Property {
    _id: string;
    title: string;
    description: string;
    price: string;
    createdAt: Date;
    updatedAt: Date;
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
  
  export interface SortOrder {
    field: keyof Property;
    direction: 'ascending' | 'descending';
  }

  export interface Location {
    type: string;
    coordinates: [number, number];
  }