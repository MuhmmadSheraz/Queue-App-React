import React, { useEffect } from "react";
import { logOut, firebase } from "../../config/firebase";
import { useHistory } from "react-router-dom";

const Homepage = () => {
  const history = useHistory();
  const goCompany=()=>{
    history.push("./company")
  }

 
  return (
    <>
      <h1> Welcome Homepage !.</h1>
      <button onClick={goCompany}>Are you Company</button>
      <button> Waiting Ofr Tokens ?</button>
      <button onClick={logOut}>Logout</button>
    </>
  );
};
export default Homepage;
