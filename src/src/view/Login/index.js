import React, { useState } from "react";
import "./login.css";
import { login, addUserToFirebase } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addUser, removeUser } from "../../Store/actions/authAction";
import { Button } from "react-bootstrap";

const Login = (props) => {
  const history = useHistory();
  console.log("Login Props*****", props);

  let loginBtn = async () => {
    try {
      const hello = await login();
      const uid = hello.user.uid;
      const userDetails = {
        email: hello.additionalUserInfo.profile.email,
        name: hello.additionalUserInfo.profile.name,
        userId: uid,
      };
      console.log("initial User***", userDetails);
      const setUserDB = await addUserToFirebase(
        uid,
        userDetails.email,
        userDetails.name
      );
      props.updateUser(userDetails);
    } catch (error) {
      console.log("catch ***", error.message);
    }
  };

  return (
    <div className="loginWrapper">
      <div className="overlay">
        <div className="login">
          <p className="heading">Queue App</p>
          <button className="fb connect" onClick={loginBtn}>
            Facebook Login
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("state from Component Login", state);
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(addUser(user)),
    loggedOutUser: () => dispatch(removeUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
