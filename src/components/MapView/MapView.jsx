import React from "react";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  InfoWindowF,
} from "@react-google-maps/api";

import { useState } from "react";

const MapView = ({ center, markers }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API,
  });

  // const handleActiveMarker = (marker) => {
  //   if (marker === activeMarker) {
  //     return;
  //   }
  //   setActiveMarker(marker);
  // };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: "100vw",
        height: "100vh",
      }}
      //   onLoad={onLoad}
      //   onUnmount={onUnmount}
      center={center}
      zoom={15}
    >
      {markers.map(
        ({ id, street, type, size, rent, image, position }, index) => {
          return (
            <MarkerF
              key={index}
              position={position}
              onClick={() => handleActiveMarker(id)}
              icon={{
                url: "https://static.thenounproject.com/png/1836810-200.png",
                scaledSize: {
                  width: 40,
                  height: 40,
                },
              }}
            >
              {activeMarker === id ? (
                <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                  <div
                    className="flex space-x-2 cursor-pointer"
                    onClick={() => showAdvert(id)}
                  >
                    <img src={image} width="50px" height="50px" />
                    <div className="flex flex-col ">
                      <p>{street.charAt(0).toUpperCase() + street.slice(1)}</p>
                      <p>
                        -
                        {` ${
                          type.charAt(0).toUpperCase() + type.slice(1)
                        } ${size} `}
                        m<sup>2</sup>
                      </p>
                      <p>- {rent} €</p>
                    </div>
                  </div>
                </InfoWindowF>
              ) : null}
            </MarkerF>
          );
        }
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(MapView);
