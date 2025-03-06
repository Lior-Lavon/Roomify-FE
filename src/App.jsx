import { FaBeer } from "react-icons/fa";
import { HomeView, ChatView } from "./pages";
import { MapView } from "./components";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import TestMapView from "./components/TestMapView/TestMapView";

function App() {
  const center = {
    lat: 52.32516,
    lng: 4.97705,
  };

  return (
    <>
      {/* <HomeView /> */}

      {/* <APIProvider apiKey={"AIzaSyBJaFMdHaiZvVdMsrOVMWbXD8-Up25y_Dg"}> */}
      {/* <MapView center={center} markers={[]} /> */}
      <TestMapView />
      {/* </APIProvider> */}
      {/* <ChatView /> */}
      {/* <div>
      
        <div className="sm:hidden">Base</div>
        <div className="hidden sm:block lg:hidden">Small</div>
        <div className="hidden lg:block">Large</div>
      </div> */}
    </>
  );
}

export default App;
