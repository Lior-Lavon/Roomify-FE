import React, { useEffect, useRef, useState } from "react";
import {
  APIProvider,
  Map,
  Pin,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";

import OrangeMarker from "../../assets/orangeMarker.png";
import BlackMarker from "../../assets/blackMarker.png";

const MapView = ({ properties, visibleCardId }) => {
  const [mapCenter, setMapCenter] = useState({
    lat: 52.377956, // Initial latitude (for example, New York)
    lng: 4.89707, // Initial longitude (for example, New York)
  });

  useEffect(() => {
    // find the property based on its id
    const advert = properties.find((c) => c.Id === visibleCardId);
    if (advert != undefined) {
      setMapCenter({ lat: advert?.Location.lat, lng: advert?.Location.lng });
    }
  }, [visibleCardId]);

  return (
    <div className="w-full h-full bg-red-400">
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API}>
        <MapComponent properties={properties} visibleCardId={visibleCardId} />
      </APIProvider>
    </div>
  );
};

export default MapView;

const MapComponent = ({ properties, visibleCardId }) => {
  const map = useMap(); // Get access to the Google Maps API instance
  const [mapCenter, setMapCenter] = useState({
    lat: 52.377956, // Default latitude
    lng: 4.89707, // Default longitude
  });
  const [zoom, setZoom] = useState(13);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    const advert = properties.find((c) => c.Id === visibleCardId);
    if (advert && map) {
      const newCenter = { lat: advert.Location.lat, lng: advert.Location.lng };
      let newZoom = 13;
      // if (!firstLoad) newZoom = 15;

      // Smoothly pan to the new location
      animatePan(map, mapCenter, newCenter, zoom, newZoom, 500); // 500ms smooth pan

      // Optional: Update state for potential external tracking
      setMapCenter(newCenter);
      setZoom(newZoom);
      setFirstLoad(false);
    }
  }, [visibleCardId, properties, map]);

  return (
    <Map
      zoom={zoom}
      center={mapCenter} // Initial center (animation will be handled by panTo)
      mapId="DEMO_MAP_ID"
      mapTypeControl={false}
      disableDefaultUI={true}
    >
      <PoiMarkers properties={properties} visibleCardId={visibleCardId} />
    </Map>
  );
};

// Function to smoothly animate panning
const animatePan = (map, from, to, fromZoom, toZoom, duration) => {
  const start = performance.now();

  const animate = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const lat = from.lat + (to.lat - from.lat) * progress;
    const lng = from.lng + (to.lng - from.lng) * progress;
    const zoom = fromZoom + (toZoom - fromZoom) * progress;

    map.setCenter({ lat, lng });
    // map.setZoom(zoom);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

const PoiMarkers = ({ properties, visibleCardId }) => {
  return (
    <>
      {properties.map((poi) => (
        <AdvancedMarker key={poi.Id} position={poi.Location}>
          <div className="relative flex flex-col justify-center">
            <img
              src={poi.Id != visibleCardId ? OrangeMarker : BlackMarker}
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
