import React from "react";
import { Button } from "@material-ui/core";
import "./login.css";
import {login,logOut} from "../../config/firebase";
const Login = () => {
  let loginBtn = () => {
    login();
  };
  let logoutBtn = () => {
    logOut()
  };
  return (
    <div className="loginWrapper">
      <div className="login">
        <p className="heading">Queue App</p>
        <button className="fb connect"onClick={loginBtn}>Facebook Login</button>
        <button className="fb connect"onClick={logoutBtn}>Logout</button>
      </div>
    </div>
  );
};
export default Login;
