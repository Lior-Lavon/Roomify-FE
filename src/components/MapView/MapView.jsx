import React, { useEffect, useRef, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { IoMdClose } from "react-icons/io";

import OrangeMarker from "../../assets/orangeMarker.png";
import BlackMarker from "../../assets/blackMarker.png";
import Image1 from "../../assets/room1.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { setActiveAdvert } from "../../features/chat/chatSlice";

const MapView = ({ properties }) => {
  const { activeAdvert } = useSelector((store) => store.chat);

  return (
    <div className="w-full h-full">
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API}>
        <MapComponent properties={properties} visibleCardId={activeAdvert} />
      </APIProvider>
    </div>
  );
};

export default MapView;

const MapComponent = ({ properties, visibleCardId }) => {
  const map = useMap(); // Get the map instance
  const isUserInteracting = useRef(false); // Track manual movement

  let defaultCenter = { lat: 52.377956, lng: 4.89707 };

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
  }, [visibleCardId, properties]);

  return (
    <Map
      defaultZoom={13}
      defaultCenter={defaultCenter}
      mapId="DEMO_MAP_ID"
      mapTypeControl={false}
      disableDefaultUI={true}
      // styles={mapStyle}
      onCameraChanged={handleCameraChanged} // Detect manual user movement
    >
      <PoiMarkers properties={properties} visibleCardId={visibleCardId} />
    </Map>
  );
};

const PoiMarkers = ({ properties, visibleCardId }) => {
  const dispatch = useDispatch();
  return (
    <>
      {properties.map((poi) => (
        <AdvancedMarker
          key={poi.Id}
          position={poi.Location}
          onClick={(event) => {
            event.stop();
            if (event.domEvent) {
              event.domEvent.stopPropagation(); // Prevents event from bubbling
            }
            dispatch(setActiveAdvert(poi.Id));
          }}
        >
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

      {/* Show InfoWindow when a marker is selected */}
      {/* {selectedMarkerId && (
        <InfoWindow
          position={
            properties.find((poi) => poi.Id === selectedMarkerId)?.Location
          }
          onCloseClick={() => setSelectedMarkerId(null)} // Close when user clicks "X"
        >
          <div className="relative rounded-lg shadow-md ">
            <div className="w-full flex items-center justify-end ">
              <button
                className="rounded-full m-1"
                onClick={() => setSelectedMarkerId(null)}
              >
                <div>
                  <IoMdClose className="text-xl" />
                </div>
              </button>
            </div>

            <div className="w-full h-full">
              <div className="flex flex-row items-center justify-center gap-2 ">
                <img
                  src={Image1}
                  alt=""
                  className="w-[5rem] h-[5rem] rounded-2xl"
                />
                <div className="flex flex-col">
                  <h2 className="text-sm font-semibold">
                    {
                      properties.find((poi) => poi.Id === selectedMarkerId)
                        ?.Title
                    }
                  </h2>
                  <p className="text-sm my-[.2rem]">Address :</p>
                  <p>
                    Price: $
                    {
                      properties.find((poi) => poi.Id === selectedMarkerId)
                        ?.Price
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </InfoWindow>
      )} */}
    </>
  );
};
