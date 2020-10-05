import React, { useEffect, useState } from "react";
import Login from "./view/Login";
import Company from "./view/Company";
import Homepage from "./view/Homepage";
import GetAllCompanies from "./view/GetAllCompanies";
import "bootstrap/dist/css/bootstrap.min.css";

import { PersistGate } from "redux-persist/integration/react";
import { firebase } from "./config/firebase";
import RouterNav from "./config/router";
import { store, persistor } from "./Store/index";
import { Provider } from "react-redux";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loader, setLoader] = useState(true);
  const [hello, setHello] = useState("");
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
  // const getMap = (paramMap) => {
  //   console.log("from App", paramMap);
  // };
const a1="hello"
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterNav isLoggedIn={isLoggedIn} loader={loader}>
          
          <div className="App">

            {/* <MyMapComponent  /> */}
            <Login />
            <Homepage />
            <Company />
            <GetAllCompanies />
          </div>
        </RouterNav>
      </PersistGate>
    </Provider>
  );
}
export default App;
