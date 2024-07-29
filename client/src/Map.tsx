import React, { useEffect } from "react";
import L, { latLngBounds, LatLngBounds } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap, Tooltip } from "react-leaflet";
import { useSearchContext } from "./SearchContextProvider";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconHover from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { GoogleProvider, GeoSearchControl } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import {
  formatNumberCurrency,
  formatNumberCurrencyShort,
  formatNumber,
  formatNumberNoDecimal,
  getStatusText,
  timeAgo,
  placeholderImageUrl,
  svgIcon,
} from "./helpers";
import { MarkerIcon } from "./MarkerIcon";

const listingIcon = L.divIcon({
  html: svgIcon("#1d4ed8"),
  className: "svg-icon",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -54],
});

const listingIconHover = L.divIcon({
  html: svgIcon("#1d4ed8"),
  className: "svg-icon animated-icon",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -54],
});

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
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
      region: "ca",
    });

    const searchControl = GeoSearchControl({
      provider,
      style: "bar",
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      searchLabel: "Enter address",
      keepResult: true,
      autoComplete: true,
      autoCompleteDelay: 250,
      showMarker: false,
    });

    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
};

export const Map = () => {
  const { properties, setMapBounds, mapBounds, hoveredPropertyId } =
    useSearchContext();

  const MapEvents = () => {
    const map = useMap();

    useEffect(() => {
      const handleMoveEnd = () => {
        setMapBounds(map.getBounds());
      };

      map.on("moveend", handleMoveEnd);

      return () => {
        map.off("moveend", handleMoveEnd);
      };
    }, [map]);

    return null;
  };

  return (
    <div id="mapId" style={{ height: "100%", width: "100%" }}>
      <MapContainer
        bounds={mapBounds}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <SearchBar />
        <MapEvents />
        {properties.map((property) => (
          <Marker
            key={property._id}
            position={convertCoordinates(property.location.coordinates)}
            icon={property._id === hoveredPropertyId ? listingIconHover : listingIcon}
            
          >
            <Tooltip
            direction="bottom"
            offset={[0, 0]}
            >
              <span>{formatNumberNoDecimal(property.titleAcres)} Acres: {formatNumberCurrencyShort(property.price)}</span>
            </Tooltip>
            <Popup className="m-0">
              <div className="flex flex-col relative">
                <img
                  src={property.imageUrls[0] || placeholderImageUrl}
                  alt={property.title}
                  className="object-cover rounded-t-xl"
                />
                <div className="absolute m-2 px-1 bg-black bg-opacity-70 rounded-md text-white">
                  {timeAgo(property.createdAt)}
                </div>
                <div className="p-3 flex flex-col gap-2 justify-between grow">
                  <div className="flex flex-col gap-2">
                    <div>
                      <div>
                        <div className="text-sm text-gray-600">
                          {getStatusText(
                            property.listingStatus,
                            property.serviceType
                          )}
                        </div>
                        <h3 className="text-xl font-bold">
                          {formatNumberCurrency(property.price)}
                        </h3>
                        <div className="flex flex-cols-2 w-full gap-1 items-center">
                        {MarkerIcon("#1d4ed8", 20)}
                          <span className="text-sm text-gray-600">
                            {property.ruralMunicipality || "Rural Municipality"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <span className="font-medium text-lg text-gray-600">
                          {formatNumber(property.titleAcres)} Acres
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs flex items-end grow font-light text-gray-600">
                    {property.brokerage}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
