import React, { useState } from "react";
import { Modal, Card, Button } from "react-bootstrap";
import { FaCoins } from "react-icons/fa";
import Swal from 'sweetalert2'

import { BiCoinStack } from "react-icons/bi";
import "./companyDetails.css";

const CompanyDeatils = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const addTokens=()=>{
    Swal.fire({
      title: 'Submit your Github username',
      input: 'text',
      inputAttributes: {
        
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      
      allowOutsideClick: () => !Swal.isLoading()
    })
  }
  return (
    <>
      <Modal show={show} onHide={false}>
        <Modal.Header closeButton onClick={handleClose}>
        </Modal.Header>
        <Modal.Body className="modalWrapper">
          <Card className="card">
            <Card.Body>
              <Card.Title>Company Name </Card.Title>
              <Card.Subtitle className="mb-2 text-dark">
                Addreess helo 47884
              </Card.Subtitle>
              <div className="tokensWrapper">
                <Button className="btn btn-info" onClick={addTokens}>
                  Add Tokens <BiCoinStack />
                </Button>
                <div>
                  {" "}
                  15 <FaCoins />{" "}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CompanyDeatils;
