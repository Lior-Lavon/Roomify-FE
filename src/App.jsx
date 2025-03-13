import { FaBeer } from "react-icons/fa";
import { HomeView, ChatView, NotFound, ProtectiveRoute, SignIn } from "./pages";
import { CoverView, MapView } from "./components";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import TestMapView from "./components/TestMapView/TestMapView";
import TestView from "./pages/TestView/TestView";
import { useEffect, useState } from "react";
import { getSecurityTokenFromLocalStorage } from "./utils/localStorage";
import bcrypt from "bcryptjs";
import { store } from "./store.js";
import {
  BrowserRouter,
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";

import history from "./utils/history";
import { Provider } from "react-redux";

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
    <HistoryRouter history={history}>
      <Provider store={store}>
        <Routes>
          <Route
            path="/"
            element={<ProtectiveRoute>{/* <Dashboard /> */}</ProtectiveRoute>}
          ></Route>

          {/* <Route path="/landing" element={<HomeView />} /> */}
          <Route path="/landing" element={<TestView />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/chat" element={<ChatView />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </HistoryRouter>
  );

  // return (

  // <>
  //   <HomeView />

  //   {/* <ChatView /> */}
  //   {/* <TestView /> */}
  //   {/* <div>
  //     <div className="sm:hidden">Base</div>
  //     <div className="hidden sm:block lg:hidden">Small</div>
  //     <div className="hidden lg:block">Large</div>
  //   </div> */}
  //   {isCover && <CoverView removeSecurityHandler={removeSecurityHandler} />}
  // </>
  // );
}

export default App;
