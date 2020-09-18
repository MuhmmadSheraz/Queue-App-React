import React, { useEffect, useRef } from "react";
import useWebAnimations, {
  bounceInLeft,
  backInDown,
  shakeY,
  bounceIn,
  bounceInDown,
} from "@wellyshen/use-web-animations";
import { logOut, firebase } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import { removeUser } from "../../Store/actions/authAction";
import "./homepage.css";
import { Button, Row, Col, Container } from "react-bootstrap";
import MyMapComponent from "../../component/Map";
import { connect } from "react-redux";
import { companyActionNull } from "../../Store/actions/companyAction";
import peopleQueue from "../../assets/peopleWaiting.jpg";

const Homepage = (props) => {
  const { ref3 } = useWebAnimations({ ...bounceInLeft });
  const { ref } = useWebAnimations({ ...bounceInDown });
  // const ref = useRef(ref3,ref2);

  const history = useHistory();
  const goCompany = () => {
    history.push("./company");
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
              <p ref={ref} className="headingMain">
                Queue App
              </p>
              <h4 className=" mb-2 name target" ref={ref}>
                Welcome {props.user && props.user.name}
              </h4>
              <Button
                variant="outline-primary"
                className="m-1  companyBtn"
                onClick={goCompany}
              >
                Are you Company
              </Button>
              <Button variant="outline-primary" className="m-1  waitingBtn">
                Waiting For Tokens{" "}
              </Button>
              <Button
                variant="outline-primary"
                className="m-1  logoutBtn"
                onClick={logoutUser}
              >
                Logout
              </Button>
            </div>
          </div>
        </Col>
        <Col sm="6" className="p-0 m-0">
          <div className="img_wrapper target mx-2" >
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
