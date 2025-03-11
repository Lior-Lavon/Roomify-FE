import { FaBeer } from "react-icons/fa";
import { HomeView, ChatView } from "./pages";
import { CoverView, MapView } from "./components";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import TestMapView from "./components/TestMapView/TestMapView";
import TestView from "./pages/TestView/TestView";
import { useEffect, useState } from "react";
import { getSecurityTokenFromLocalStorage } from "./utils/localStorage";
import bcrypt from "bcryptjs";

function App() {
  const [isCover, setIsCover] = useState(false);

  const checkSecurity = () => {
    const st = getSecurityTokenFromLocalStorage();
    if (st == null) {
      setIsCover(true);
    } else {
      const accessCode = import.meta.env.VITE_SECURITY_CODE;
      const hashedPassword = bcrypt.hashSync(
        accessCode,
        "$2a$10$CwTycUXWue0Thq9StjUM0u"
      );
      if (st != hashedPassword) {
        setIsCover(true);
      }
    }
  };
  useEffect(() => {
    checkSecurity();
  }, []);

  const removeSecurityHandler = (status) => {
    setIsCover(status);
  };

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
      {isCover && <CoverView removeSecurityHandler={removeSecurityHandler} />}
    </>
  );
}

export default App;
