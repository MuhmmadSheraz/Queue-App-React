import React, { useState } from "react";
import { Modal ,Form ,Button} from "react-bootstrap";

const Company = () => {
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Add Company Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name of The Company</Form.Label>
              <Form.Control type="text" placeholder="Enter Company Name" />
              
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Since</Form.Label>
              <Form.Control type="number" placeholder="Since" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <button className="btn btn success" onClick={showModal}>
        Add Company
      </button>
    </>
  );
};
export default Company;
