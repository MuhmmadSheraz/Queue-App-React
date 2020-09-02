import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Homepage from "../view/Homepage";
import Login from "../view/Login";
import '../App.css'

const RouterNav = (props) => {
  const { isLoggedIn,loader } = props;
  if (loader)
    return (
      <img className="loader"src="https://cdn.dribbble.com/users/539495/screenshots/7114120/train_loader.gif" />
    );
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Login}>
            {isLoggedIn ? <Redirect to="/home" /> : <Login />}
          </Route>
          <Route exact path="/home" component={Homepage}>
            {authChecker(isLoggedIn, <Homepage />)}
          </Route>
        </Switch>
      </Router>
    </>
  );
};
export default RouterNav;

let authChecker = (isLoggedIn, component) => {
  console.log("FormRouter************", isLoggedIn);
  return isLoggedIn ? component : <Redirect to="/" />;
};
