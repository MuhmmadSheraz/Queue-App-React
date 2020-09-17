import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import {companyAction} from "../../Store/actions/companyAction";
import {
  addCompanyToFirebase,
  currentUser,
  firebase,
} from "../../config/firebase";
const AddCompanyForm = (props) => {
  const [companyList, setCompanyList] = useState({});
  const [show, setShow] = useState(true);

  const addFormData = () => {
    const userId = props.currentUser.user.userId;
    companyList.userId = userId
    props.addForm(companyList);
    addCompanyToFirebase(companyList);
    handleClose()
    
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
                <Form.Control
                  name="adress"
                  onChange={(e) => {
                    getInput(e);
                  }}
                  type="text"
                  placeholder="Enter Company Adress"
                />
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
