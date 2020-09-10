import React, { useEffect } from "react";
import { logOut, firebase } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import './homepage.css'
import {Button} from "react-bootstrap";


const Homepage = () => {
  const history = useHistory();
  const goCompany=()=>{
    history.push("./company")
  }

 
  return (
    <div className="homeWrapper">
      <div className="contentWrapper">
      <h1 className="text-center">Welcome Hamza</h1>
      <Button className="m-1" onClick={goCompany}>Are you Company</Button>
      <Button className="m-1"> Waiting For Tokens </Button>
      <Button className="m-1 logoutBtn" onClick={logOut}>Logout</Button>
      </div>
    </div>
  );
};
export default Homepage;
