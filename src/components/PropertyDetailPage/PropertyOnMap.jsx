import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import React, { useRef } from "react";
import { IoMdClose } from "react-icons/io";

import OrangeMarker from "../../assets/orangeMarker.png";
import BlackMarker from "../../assets/blackMarker.png";
import MapView from "../MapView/MapView";

const PropertyOnMap = ({ poi, closeMapOverlay }) => {
  return (
    <div className="w-full h-full absolute top-0 p-[5px] pb-2">
      <div className="w-full h-full flex flex-col ">
        <div className="w-full flex justify-between p-1 ">
          <p>Property location</p>
          <IoMdClose
            className="text-2xl text-black cursor-pointer bg-white rounded-full"
            onClick={closeMapOverlay}
          />
        </div>

        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API}>
          <MapView properties={[poi]} visibleCardId={poi.Id} />
        </APIProvider>
      </div>
    </div>
  );
};

export default PropertyOnMap;
