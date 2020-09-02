import React, { useEffect, useState } from "react";
import Login from "./view/Login";
import Homepage from "./view/Homepage";
import { firebase } from "./config/firebase";
import RouterNav from "./config/router";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    userStatus();
  }, []);
  let userStatus = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      setLoader(false)
      if(user){
        setIsLoggedIn(true)
      }
      else{
        setIsLoggedIn(false)
      }
    });
  };
  return (
    <RouterNav isLoggedIn={isLoggedIn}loader={loader} >
      <div className="App">
        <Login />
        <Homepage />
      </div>
    </RouterNav>
  );
}

export default App;
