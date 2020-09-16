import React, { useEffect } from "react";
import { logOut, firebase } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import {removeUser} from "../../Store/actions/authAction"
import "./homepage.css";
import { Button } from "react-bootstrap";
import MyMapComponent from "../../component/Map";
import { connect } from "react-redux";
import { companyActionNull } from "../../Store/actions/companyAction";


const Homepage = (props) => {
  // const [mapState, setMapState] = useState();
  console.log(props.user && props.user.name);
  const history = useHistory();
  const goCompany = () => {
    history.push("./company");
  };
  const logoutUser = () => {
    logOut();
    props.loggedOutUser()
  };

  return (
    <div className="homeWrapper">
      <div className="contentWrapper">
        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <h1 className="text-center">Welcome {props.user && props.user.name}</h1>
        <Button className="m-1" onClick={goCompany}>
          Are you Company
        </Button>
        <Button className="m-1"> Waiting For Tokens </Button>
        <Button className="m-1 logoutBtn" onClick={logoutUser}>
          Logout
        </Button>
        <Button className="btn btn-danger " onClick={props.removeAll}>
          Remove All Companies
        </Button>
      </div>
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
