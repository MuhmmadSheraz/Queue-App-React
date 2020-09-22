import React from "react";
import { Container, Button } from "react-bootstrap";
import "./gettokens.css";
import { BiMap } from "react-icons/bi";

const GetTokens = () => {
  return (
    <div class="custom-shape-divider-top-1600808309">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          class="shape-fill"
        ></path>
      </svg>
      <Container>
        <p className="heading text-light pt-5">Queue App</p>
        <div className="cardWrapperTokens pt-5">
          <div className="card">
            <div className="cardHeader">
              <div className="profileImg rounded-circle">
                <img
                  className="rounded-circle"
                  src="https://avatars1.githubusercontent.com/u/61803642?s=460&u=f0f3428f6ff97c01b59f61add06b9e9bc9727ecc&v=4"
                  alt="profilePic"
                />
              </div>
            </div>
            <div className="cardBody mt-5 pt-2">
              <h3 className="text-center">Company Name</h3>
              <div className="tokensDetails mt-3">
                <div className="currentTokens">
                  <h4>20</h4>
                  <p className="pt-1">Current Token Available</p>
                </div>
                <div className="totalTokens">
                  <h4>30</h4>

                  <p className="pt-1">Total Tokens</p>
                </div>
              </div>
              <div className="companyDetails">
                <h5 className="p-2 m-2">Since: 1999</h5>
                <h5 className="p-2 m-2">Timing To: 9 AM</h5>
                <h5 className="p-2 m-2">Timing From: 10 PM</h5>
                <h5 className="p-2 m-2">Address: Cubic Center</h5>
              </div>
              <Button variant="outline-warning" className="mx-1">
                See Address{" "}
              </Button>
              <Button variant="outline-success">Purchase Token</Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default GetTokens;
