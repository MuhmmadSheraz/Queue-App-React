import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { addUser, removeUser } from "../../Store/actions/authAction";
import { firebase, logOut } from "../../config/firebase";
import { useHistory } from "react-router-dom";

const Company = (props) => {
  const history=useHistory()
  console.log("Company Props*****", props.user);
  useEffect(() => {
    userStatus();
  }, []);
  let userStatus = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const currUser = { name: user.displayName, email: user.email };
        console.log("From Use Effect ***", currUser);
        props.isLoggedIn(currUser);
      } else {
        history.push("/")
        props.isLoggedIn(null);
      }
    });
  };
  const loggedOut = async () => {
    try {
      await logOut();
      props.isLoggedOut()
      console.log("Logged Out From Are Company");
    }
    catch(err){
      console.log(err,"Error from My Company")
    }
  };
  return (
    <>
      <h1>Name : {props.user && props.user.name}</h1>
      <h1>Email : {props.user && props.user.email}</h1>
      <button onClick={loggedOut}>Logged Out</button>
    </>
  );
};
const mapStateToProps = (state) => {
  return { user: state.user };
};
const mapDispatchToProps = (dispatch) => {
  return {
    isLoggedIn: (user) => dispatch(addUser(user)),
    isLoggedOut:()=>dispatch(removeUser())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Company);
