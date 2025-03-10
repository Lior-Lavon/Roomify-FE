import React, { useEffect, useRef, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";

import OrangeMarker from "../../assets/orangeMarker.png";
import BlackMarker from "../../assets/blackMarker.png";

const MapView = ({ properties, visibleCardId }) => {
  return (
    <div className="w-full h-full">
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API}>
        <MapComponent properties={properties} visibleCardId={visibleCardId} />
      </APIProvider>
    </div>
  );
};

export default MapView;

const MapComponent = ({ properties, visibleCardId }) => {
  const map = useMap(); // Get the map instance
  const isUserInteracting = useRef(false); // Track manual movement
  const defaultCenter = { lat: 52.377956, lng: 4.89707 };

  // Handle user moving the map manually
  const handleCameraChanged = () => {
    isUserInteracting.current = true; // Prevent overriding manual moves
  };

  // Update center when `visibleCardId` changes
  useEffect(() => {
    if (!map) return; // Ensure map is loaded

    const advert = properties.find((c) => c.Id === visibleCardId);
    if (advert && isUserInteracting.current) {
      const newCenter = { lat: advert.Location.lat, lng: advert.Location.lng };

      // Reset user interaction flag so next move can happen
      isUserInteracting.current = false;

      // Use requestAnimationFrame for smooth animation
      requestAnimationFrame(() => {
        map.panTo(newCenter); // Smoothly pan to new location
      });
    }
  }, [visibleCardId, properties, map]);

  return (
    <Map
      defaultZoom={13}
      defaultCenter={defaultCenter}
      mapId="DEMO_MAP_ID"
      mapTypeControl={false}
      disableDefaultUI={true}
      onCameraChanged={handleCameraChanged} // Detect manual user movement
    >
      <PoiMarkers properties={properties} visibleCardId={visibleCardId} />
    </Map>
  );
};

const PoiMarkers = ({ properties, visibleCardId }) => {
  return (
    <>
      {properties.map((poi) => (
        <AdvancedMarker key={poi.Id} position={poi.Location}>
          <div className="relative flex flex-col justify-center">
            <img
              src={poi.Id !== visibleCardId ? OrangeMarker : BlackMarker}
              width={50}
            />
            <p className="absolute top-0 pt-[.15rem] w-full text-center text-white">
              ${poi.Price}
            </p>
          </div>
        </AdvancedMarker>
      ))}
    </>
  );
};
