import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { mockProperties } from './data/mockProperties'; // Adjust the path as necessary
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Explicitly type defaultPosition as LatLngTuple
const defaultPosition: [number, number] = [51.505, -0.09]; // Latitude, Longitude

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export const Map = () => {
  return (
    <div id="mapId" style={{ height: '100%', width: '100%' }}>
      <MapContainer center={defaultPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {mockProperties.map((property) => (
          <Marker key={property.id} position={property.coordinates}>
            <Popup>
              {property.title} <br /> {property.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
