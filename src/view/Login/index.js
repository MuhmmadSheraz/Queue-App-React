import React, { useState } from "react";
import "./login.css";
import {
  login,
  addUserToFirebase,
  signUp,
  normalSignIn,
} from "../../config/firebase";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addUser, removeUser } from "../../Store/actions/authAction";
const Login = (props) => {
  const [signInDetails, setSignInDetails] = useState("");
  const [signUpDetails, setSignUpDetails] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const history = useHistory();

  let loginBtn = async () => {
    console.log("Fb Logged In")
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
  const handleToggle = () => {
    showSignUp ? setShowSignUp(false) : setShowSignUp(true);
  };
  const getSignInInfo = (e) => {
    const { name, value } = e.target;
    setSignInDetails((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const getSignUpInfo = (e) => {
    const { name, value } = e.target;
    setSignUpDetails((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const signUpFun = async () => {
    try {
      const hello = await signUp(signUpDetails);
      const uid = hello.user.uid;
       hello.user.updateProfile({
        displayName: signUpDetails.signUpUsername,
      });
      console.log(hello, uid);
      const userDetails = {
        email: signUpDetails.signUpEmail,
        name: signUpDetails.signUpUsername,
        userId: uid,
      };
      console.log("initial User***", userDetails);
      addUserToFirebase(uid, userDetails.email, userDetails.name);
      props.updateUser(userDetails);
    } catch (error) {
      console.log("catch Here", error);
    }
  };
  const signInFun = async () => {
    try {
      const hello = await normalSignIn(signInDetails);
      const uid = hello.user.uid;
      console.log(hello, uid);
      const userDetails = {
        email: hello.user.email,
        name:hello.user.displayName,
        userId: uid,
      };
      console.log("initial User***", userDetails);

      props.updateUser(userDetails);
    } catch (error) {
      console.log("catch Here", error);
    }
  };
  return (
    <div className="loginWrapper">
      <div className="overlay">
        <div className="login p-2">
          {showSignUp ? (
            <div className="SignWrapper ">
              <h1 className="p-3">Sign Up Here</h1>
              <input
                className="authInput d-block"
                type="text"
                name="userName"
                name="signUpUsername"
                onChange={(e) => {
                  getSignUpInfo(e);
                }}
                placeholder="UserName"
              />
              <input
                className="authInput d-block"
                type="email"
                name="signUpEmail"
                placeholder="Email"
                onChange={(e) => {
                  getSignUpInfo(e);
                }}
              />
              <input
                className="authInput d-block"
                type="password"
                name="SignUppassword"
                placeholder="PassWord"
                name="signUpPassword"
                onChange={(e) => {
                  getSignUpInfo(e);
                }}
              />
              <p>
                <button className="authBtnSignUp" onClick={signUpFun}>
                  Sign Up
                </button>
              </p>

              <p className="toggleLink" onClick={handleToggle}>
                {" "}
                Already Have an Account ?
              </p>
            </div>
          ) : (
            <div className="signInWrapper">
              <h1 className="p-3">Login Here</h1>
              <input
                className="authInput d-block"
                type="email"
                name="SignInemail"
                placeholder="Email"
                onChange={(e) => getSignInInfo(e)}
              />
              <input
                className="authInput d-block"
                type="password"
                name="SignInpassword"
                placeholder="PassWord"
                onChange={(e) => getSignInInfo(e)}
              />
              <p>
                <button className="authBtnLogin" onClick={signInFun}>
                  Login In
                </button>
              </p>
              <hr />
              <p className="text-muted text-center" >Sign In With Facebook</p>
              <p>
                <button className="fb" onClick={loginBtn}>Login With Facebook</button>
              </p>
              <p>
                <p className="toggleLink" onClick={handleToggle}>
                  Create An Account
                </p>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("state from Component Login", state.authReducer);
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(addUser(user)),
    loggedOutUser: () => dispatch(removeUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

{
  /* <p className="heading">Queue App</p>
<button className="fb connect" onClick={loginBtn}>
  Facebook Login //{" "}
</button> */
}
