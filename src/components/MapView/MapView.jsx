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
  const map = useMap();
  const [zoom, setZoom] = useState(13);
  const mapCenterRef = useRef({ lat: 52.377956, lng: 4.89707 }); // Prevent re-renders

  useEffect(() => {
    if (!map || !visibleCardId) return;

    const advert = properties.find((c) => c.Id === visibleCardId);
    if (advert) {
      // const newCenter = { lat: advert.Location.lat, lng: advert.Location.lng };
      // mapCenterRef.current = newCenter; // Store new center
      // animatePan(map, newCenter, zoom, 14, 500); // Smoothly pan & zoom
    }
  }, [visibleCardId, properties, map]);

  return (
    <Map
      zoom={zoom}
      center={mapCenterRef.current} // Center controlled by useRef
      mapId="DEMO_MAP_ID"
      mapTypeControl={false}
      disableDefaultUI={true}
    >
      <PoiMarkers properties={properties} visibleCardId={visibleCardId} />
    </Map>
  );
};

// Smoothly animate panning & zoom
const animatePan = (map, to, fromZoom, toZoom, duration) => {
  const start = performance.now();
  const from = map.getCenter();

  const animate = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const lat = from.lat() + (to.lat - from.lat()) * progress;
    const lng = from.lng() + (to.lng - from.lng()) * progress;
    const zoom = fromZoom + (toZoom - fromZoom) * progress;

    map.setCenter({ lat, lng });
    map.setZoom(zoom);

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
