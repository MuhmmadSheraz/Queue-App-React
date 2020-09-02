import React, { useState } from "react";
import "./login.css";
import { login, logOut } from "../../config/firebase";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  let loginBtn = async () => {
    try {
      await login();
      history.push("/home");
    } catch (error) {
      console.log("catch ***", error.message);
    }
  };
  let logoutBtn = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="loginWrapper">
      <div className="login">
        <p className="heading">Queue App</p>
        <button className="fb connect" onClick={loginBtn}>
          Facebook Login
        </button>
        <button className="fb connect" onClick={logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
};
export default Login;
