import React, { useEffect } from 'react';
import L, { latLngBounds, LatLngBounds } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { SearchContextProvider, useSearchContext } from './SearchContextProvider'; 
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { GoogleProvider, GeoSearchControl } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

// Explicitly type defaultPosition as LatLngTuple

const initialMapBounds = latLngBounds(
  { lat: 45.75219336063106, lng: -112.96142578125001 },
  { lat: 57.25528054528889, lng: -95.88867187500001 }
);

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function convertCoordinates(coordinates: [number, number]) {
  var convertedCoordinates: [number, number] = [coordinates[1], coordinates[0]];
  return convertedCoordinates;
}

const SearchBar = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new GoogleProvider({ 
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
      region: 'ca'
    });
    
    const searchControl = GeoSearchControl({
      provider,
      style: 'bar',
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      searchLabel: 'Enter address',
      keepResult: true,
      autoComplete: true, // optional: true|false  - default true
      autoCompleteDelay: 250, // optional: number      - default 250
      showMarker: false,
    });
  
    map.addControl(searchControl);
  
    // Correctly returning a cleanup function
    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);  // Ensure dependencies are correctly listed here

  return null;
};

export const Map = () => {
  const { properties, setMapBounds, mapBounds } = useSearchContext();

  const MapEvents = () => {
    const map = useMap();

    useEffect(() => {
      // Define the function to handle the event
      const handleMoveEnd = () => {
        setMapBounds(map.getBounds());
      };

      // Add the event listener
      map.on('moveend', handleMoveEnd);
    
      // Return a cleanup function to remove the event listener
      return () => {
        map.off('moveend', handleMoveEnd);
      };
    }, [map]);  // Dependency array includes map to ensure the effect reruns if map changes
    

    return null;
  };

  return (
    <div id="mapId" style={{ height: '100%', width: '100%' }}>
      <MapContainer bounds={mapBounds} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <SearchBar />
        <MapEvents />
        {properties.map((property) => (
          <Marker key={property._id} position={convertCoordinates(property.location.coordinates)}>
            <Popup>
              {property.title} <br /> {property.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
