import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useSearchContext } from './SearchContextProvider'; 
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


// Explicitly type defaultPosition as LatLngTuple
const defaultPosition: [number, number] = [51.46244137, -102.7642267]; // Latitude, Longitude

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function convertCoordinates(coordinates: [number, number]) {
  var convertedCoordinates: [number, number] = [coordinates[1], coordinates[0]]
  return convertedCoordinates;
}

export const Map = () => {
  const { properties, setMapBounds } = useSearchContext();

  const MapEvents = () => {
    const map = useMapEvents({
      moveend: () => {
        const bounds = map.getBounds();
        const northEast = bounds.getNorthEast();
        const southWest = bounds.getSouthWest();
        setMapBounds({
          _northEast: { lat: northEast.lat, lng: northEast.lng },
          _southWest: { lat: southWest.lat, lng: southWest.lng }
        });
      }
    });
    return null;
  };

  return (
    <div id="mapId" style={{ height: '100%', width: '100%' }}>
      <MapContainer center={defaultPosition} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
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