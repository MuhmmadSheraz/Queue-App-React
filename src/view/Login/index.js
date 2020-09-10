import React, { useState } from "react";
import "./login.css";
import { login, logOut } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addUser,removeUser } from "../../Store/actions/authAction";

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
      //  const user = {
      //   email: "hello@gmail.com",
      //   name: "Hello 007",
      // };
      props.updateUser(user);
      // history.push("/home");
      
      //fun Calling
    } catch (error) {
      console.log("catch ***", error.message);
    }
  };
  console.log("Login Props*****", props.user);

  let logoutBtn = async () => {
    try {
      await logOut();
      props.loggedOutUser();
    } catch (error) {
      console.log(error.message);
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
  console.log("Login Props*****", props.user);
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
