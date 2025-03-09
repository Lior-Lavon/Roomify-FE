import React from "react";
import {
  APIProvider,
  Map,
  Pin,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";

import markerImage from "../../assets/marker.png";

const MapView = ({ properties }) => {
  return (
    <div className="w-full h-full bg-red-400">
      <APIProvider
        apiKey={import.meta.env.VITE_GOOGLE_API}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <Map
          defaultZoom={13}
          defaultCenter={{ lat: 52.377956, lng: 4.89707 }}
          mapId="DEMO_MAP_ID"
          mapTypeControl={false}
          disableDefaultUI={true}
          onCameraChanged={
            (ev) => {}
            // console.log(
            //   "camera changed:",
            //   ev.detail.center,
            //   "zoom:",
            //   ev.detail.zoom
            // )
          }
        >
          <PoiMarkers properties={properties} />
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapView;

const PoiMarkers = ({ properties }) => {
  return (
    <>
      {properties.map((poi) => (
        // <AdvancedMarker key={poi.key} position={poi.location}>
        //   <Pin
        //     background={"#FBBC04"}
        //     glyphColor={"#000"}
        //     borderColor={"#000"}
        //   />
        // </AdvancedMarker>

        <AdvancedMarker key={poi.Id} position={poi.Location}>
          <div className="relative flex flex-col justify-center">
            <img src={markerImage} width={50} />
            <p className="absolute top-0 pt-[.15rem] w-full text-center text-white">
              ${poi.Price}
            </p>
          </div>
        </AdvancedMarker>
      ))}
    </>
  );
};
