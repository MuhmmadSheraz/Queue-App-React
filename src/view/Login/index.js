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
      const user = {
        email: hello.additionalUserInfo.profile.email,
        name: hello.additionalUserInfo.profile.name,
      };
      // console.log(user.email,user.name,"Checking***8")
      const setUserDB = await addUserToFirebase(uid, user.email, user.name);
      console.log("Firebase ADD DATA", setUserDB);
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
  console.log("state from Component Login", state);
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
