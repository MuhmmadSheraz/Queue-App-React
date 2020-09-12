import React, { useEffect, useState } from "react";
import Login from "./view/Login";
import Company from "./view/Company";
import Homepage from "./view/Homepage";
import "bootstrap/dist/css/bootstrap.min.css";

import { PersistGate } from "redux-persist/integration/react";
import { firebase } from "./config/firebase";
import RouterNav from "./config/router";
import { store, persistor } from "./Store/index";
import { Provider } from "react-redux";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    userStatus();
  }, []);
  let userStatus = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      setLoader(false);
      if (user) {
        setLoader(false);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterNav isLoggedIn={isLoggedIn} loader={loader}>
          <div className="App">
            <Login />
            <Homepage />
            <Company />
          </div>
        </RouterNav>
      </PersistGate>
    </Provider>
  );
}
export default App;
