import React, { useEffect } from "react";
import { logOut, firebase } from "../../config/firebase";
import { useHistory } from "react-router-dom";

const Homepage = () => {
  // const history = useHistory();

  // useEffect(() => {
  //   userStatus();
  // }, []);
  // let userStatus = () => {
  //   firebase.auth().onAuthStateChanged(function (user) {
  //     !user ? history.push("./") : console.log("user Avaibale from Home **");
  //   });
  // };
  return (
    <>
      <h1> Welcome Homepage !.</h1>
      <button>Are you Company</button>
      <button> Waiting Ofr Tokens ?</button>
      <button onClick={logOut}>Logout</button>
    </>
  );
};
export default Homepage;
