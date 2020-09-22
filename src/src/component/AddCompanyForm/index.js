import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import Swal from "sweetalert2/dist/sweetalert2.js";
import MyMapComponent from "../Map/index";
import { companyAction } from "../../Store/actions/companyAction";
import SweetAlert from "sweetalert2-react";

import {
  addCompanyToFirebase,
  currentUser,
  firebase,
  storage,
} from "../../config/firebase";
const AddCompanyForm = (props) => {
  const [companyList, setCompanyList] = useState({});
  const [show, setShow] = useState(true);
  const [getMapData, setMapData] = useState([]);
  const [marker, setMarker] = useState({ lat: -34.397, lng: 150.644 });

  const getArea = (area) => {
    console.log("area", area);
    const a = area.response.venues;
    console.log("parent", a);
    setMarker({ lat: a[0].location.lat, lng: a[0].location.lng });
    console.log(marker)
    setMapData(a);
    console.log(getMapData, "State");
  };

  const addFormData = () => {
    let ref = firebase.firestore().collection("companyList").doc();
    const id = ref.id;
    if (
      !companyList.hasOwnProperty("companyName") ||
      !companyList.hasOwnProperty("since") ||
      !companyList.hasOwnProperty("timingFrom") ||
      !companyList.hasOwnProperty("timingTo") ||
      !companyList.hasOwnProperty("adress")
    ) {
      return Swal.fire("Oops...", "Please Fill All The Fields!", "warning");
    }
    const userId = props.currentUser.user.userId;
    companyList.userId = userId;
    props.addForm((companyList.compId = id));
    console.log(id);
    addCompanyToFirebase(companyList, id);
    handleClose();
  };

  const handleClose = () => setShow(false);
  const getInput = (e) => {
    const { name, value } = e.target;
    setCompanyList((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  return (
    <div>
      {show ? (
        <Modal show={true} onHide={false}>
          <Modal.Header closeButton>
            <Modal.Title>Company Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  name="companyName"
                  required="required"
                  onChange={(e) => {
                    getInput(e);
                  }}
                  type="text"
                  placeholder="Name of Company"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Since</Form.Label>
                <Form.Control
                  name="since"
                  onChange={(e) => {
                    getInput(e);
                  }}
                  type="number"
                  placeholder="Since"
                />
              </Form.Group>
              <Form.Group>
                <Form.File label="Certificates (Max 3 Images)" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Timings</Form.Label>
                <div className="d-flex">
                  <Form.Label> From</Form.Label>
                  <Form.Control
                    name="timingFrom"
                    onChange={(e) => {
                      getInput(e);
                    }}
                    type="time"
                    placeholder="Enter Timing"
                  />
                  <Form.Label className="my-1"> To</Form.Label>
                  <Form.Control
                    name="timingTo"
                    onChange={(e) => {
                      getInput(e);
                    }}
                    type="time"
                    placeholder="Enter Timing"
                  />
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <MyMapComponent
                  hello={getArea}
                  marker={marker}
                  isMarkerShown
                  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select Your Area</Form.Label>
                <Form.Control as="select" custom>
                  {getMapData.map((x) => {
                    return <option>{x.name}</option>;
                  })}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="secondary" onClick={addFormData}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    hello: state.companyReducer,
    currentUser: state.authReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addForm: (companyList) => dispatch(companyAction(companyList)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCompanyForm);
