import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import React, { useRef } from "react";
import { IoMdClose } from "react-icons/io";

import OrangeMarker from "../../assets/orangeMarker.png";
import BlackMarker from "../../assets/blackMarker.png";

const PropertyOnMap = ({ poi, closeMapOverlay }) => {
  return (
    <div className="w-full h-full absolute top-0 rounded-xl p-[4px] ">
      <div className="w-full h-full rounded-xl flex flex-col ">
        <div className="w-full flex justify-end p-2 ">
          <IoMdClose
            className="text-2xl text-black cursor-pointer bg-white rounded-full"
            onClick={closeMapOverlay}
          />
        </div>

        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API}>
          <MapComponent poi={poi} />
        </APIProvider>
      </div>
    </div>
  );
};

export default PropertyOnMap;

const MapComponent = ({ poi }) => {
  // const map = useMap(); // Get the map instance
  const isUserInteracting = useRef(false); // Track manual movement
  const defaultCenter = { lat: 52.377956, lng: 4.89707 };

  // Handle user moving the map manually
  const handleCameraChanged = () => {
    isUserInteracting.current = true; // Prevent overriding manual moves
  };

  return (
    <Map
      zoom={15}
      center={poi?.Location} // Ensure lat/lng are numbers
      mapId="DEMO_MAP_ID"
      mapTypeControl={false}
      disableDefaultUI={false}
      gestureHandling="greedy"
      onCameraChanged={handleCameraChanged}
    >
      <PoiMarkers poi={poi} />
    </Map>
  );
};

const PoiMarkers = ({ poi }) => {
  return (
    <>
      <AdvancedMarker position={poi?.Location}>
        <div className="relative flex flex-col justify-center">
          <img src={OrangeMarker} width={50} />
          <p className="absolute top-0 pt-[.15rem] w-full text-center text-white">
            ${poi?.Price}
          </p>
        </div>
      </AdvancedMarker>
    </>
  );
};
