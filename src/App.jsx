import { FaBeer } from "react-icons/fa";
import { HomeView, ChatView } from "./pages";
import { MapView } from "./components";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import TestMapView from "./components/TestMapView/TestMapView";
import TestView from "./pages/TestView/TestView";
import { useEffect } from "react";

function App() {
  const center = {
    lat: 52.32516,
    lng: 4.97705,
  };

  useEffect(() => {
    console.log("App rendered");
  });

  return (
    <>
      {/* <HomeView /> */}

      {/* <MapView center={center} markers={[]} /> */}
      {/* </APIProvider> */}
      <ChatView />
      {/* <TestView /> */}
      {/* <div>
        <div className="sm:hidden">Base</div>
        <div className="hidden sm:block lg:hidden">Small</div>
        <div className="hidden lg:block">Large</div>
      </div> */}
    </>
  );
}

export default App;
