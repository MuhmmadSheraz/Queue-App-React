import React, { useEffect, useRef } from "react";

import { logOut, firebase,askForPermissioToReceiveNotifications } from "../../config/firebase";
import { useHistory, Link } from "react-router-dom";
import { removeUser } from "../../Store/actions/authAction";
import "./homepage.css";
import { Button, Row, Col, Container } from "react-bootstrap";
import MyMapComponent from "../../component/Map";
import { connect } from "react-redux";
import { companyActionNull } from "../../Store/actions/companyAction";
import peopleQueue from "../../assets/peopleWaiting.jpg";
// import {askForPermissioToReceiveNotifications} from "../../push-notification"
import useWebAnimations, {
  shakeY,
  wobble,
  backInDown,
} from "@wellyshen/use-web-animations";

const Homepage = (props) => {
  const { ref: heading } = useWebAnimations({
    ...wobble,
    timing: {
      duration: 1000 * 2,
      iterations: 1,
    },
  });
  const { ref: username } = useWebAnimations({
    ...backInDown,
    timing: {
      duration: 1000 * 1,
      iterations: 1,
    },
  });
  const { ref: image } = useWebAnimations({
    ...shakeY,
    timing: {
      duration: 1000 * 20,
      iterations: Infinity,
    },
  });
  // const ref = useRef(ref3,ref2);

  const history = useHistory();
  const goCompany = () => {
    history.push("./company");
  };
  const allCompanies = () => {
    history.push("./GetAllCompanies");
  };
  const logoutUser = () => {
    logOut();
    props.loggedOutUser();
  };

  return (
    <div className="homeWrapper">
      <Row className="m-0">
        <Col sm="6">
          <div className="home_content_wrapper">
            <div>
              <p ref={heading} className="headingMain">
                Queue App
              </p>
              <h4 className=" mb-2 name target" ref={username}>
                Welcome {props.user && props.user.name}
              </h4>
              <Link to={`/myTokens/`}>
                <Button>Get Tokens</Button>
              </Link>

              <Button
                variant="outline-primary"
                className="m-1  companyBtn"
                onClick={goCompany}
              >
                Are you Company
              </Button>
              <Button
                variant="outline-primary"
                className="m-1  waitingBtn"
                onClick={allCompanies}
              >
                Waiting For Tokens
              </Button>
              <Button
                variant="outline-primary"
                className="m-1  logoutBtn"
                onClick={logoutUser}
              >
                Logout
              </Button>
              <Button onClick={askForPermissioToReceiveNotifications}>Push Notification</Button>

              {/* <button onClick={props.removeAll()}>Remove All</button> */}
            </div>
          </div>
        </Col>
        <Col sm="6" className="">
          <div className="img_wrapper target mx-2" ref={image}>
            <img className="img" src={peopleQueue} />
          </div>
        </Col>
      </Row>
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log("state from Home Component", state);
  return {
    user: state.authReducer.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loggedOutUser: () => dispatch(removeUser()),
    removeAll: () => dispatch(companyActionNull()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
