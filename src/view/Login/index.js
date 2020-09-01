import React from "react";
import { Button } from "@material-ui/core";
import "./login.css";
const Login = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="loginWrapper">
      <div class="login">
        <p className="heading">Queue App</p>
        <button class="fb connect">Facebook Login</button>
      </div>
    </div>
  );
};
export default Login;
