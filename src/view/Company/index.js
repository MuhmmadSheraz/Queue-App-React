import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { addUser, removeUser } from "../../Store/actions/authAction";
import { firebase, logOut } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import AddCompanyForm from "../../component/AddCompanyForm";
import "./company.css";
const Company = (props) => {
  // console.log("first Consol Main",props&&props.hello.companyList)
  let companyListArray = props && props.hello.companyList;
  const [showForm, setShowForm] = useState(false);
  const history = useHistory();
  const showFormBtn = () => {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };
  useEffect(() => {
    userStatus();
  }, []);

  let userStatus = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user || props.user) {
        const currUser = { name: user.displayName, email: user.email };
        console.log("From Use Effect ***", currUser);
        props.isLoggedIn(currUser);
      } else {
        history.push("/");
        props.isLoggedIn(null);
      }
    });
  };

  const loggedOut = async () => {
    try {
      await logOut();
      props.isLoggedOut();
      console.log("Logged Out From Are Company");
    } catch (err) {
      console.log(err, "Error from My Company");
    }
  };

  return (
    <div className="companyWrapper">
      <div className="companyContent">
        <h1 className="text-center mb-3">Queue App</h1>
        <ul>
          {companyListArray.map((x, index) => {
           return <li key={index}> {x.companyName}</li>;
          })}
        </ul>
        {showForm ? <AddCompanyForm /> : ""}
        <Button className="btn " onClick={showFormBtn}>
          Add Your Company +
        </Button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(state.companyReducer, "for  All Reducer");
  return { user: state.user, hello: state.companyReducer };
};
const mapDispatchToProps = (dispatch) => {
  return {
    isLoggedIn: (user) => dispatch(addUser(user)),
    isLoggedOut: () => dispatch(removeUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Company);
