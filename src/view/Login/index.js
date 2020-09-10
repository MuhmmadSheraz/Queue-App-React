import React, { useState } from "react";
import "./login.css";
import { login } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addUser, removeUser } from "../../Store/actions/authAction";
import {Button} from "react-bootstrap";

const Login = (props) => {
  const history = useHistory();
  console.log("Login Props*****", props);

  let loginBtn = async () => {
    try {
      const hello = await login();
      const user = {
        email: hello.additionalUserInfo.profile.email,
        name: hello.additionalUserInfo.profile.name,
      };

      props.updateUser(user);
    } catch (error) {
      console.log("catch ***", error.message);
    }
  };

  return (
    <div className="loginWrapper">
      <div className="login">
        <p className="heading">Queue App</p>
        <button className="fb connect" onClick={loginBtn}>
          Facebook Login
        </button>
          </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("state from Component", state);
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(addUser(user)),
    loggedOutUser: () => dispatch(removeUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
