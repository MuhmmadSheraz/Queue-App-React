import React from "react";
import "./getllcompanies.css";
import {
  Container,
  InputGroup,
  FormControl,
  Row,
  Col,
  Button,
} from "react-bootstrap";

const GetAllCompanies = () => {
  return (
    <div className="custom-shape-divider-top-1600696096">
      <div class="custom-shape-divider-top-1600777182">
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
          <p className="text-center text-light pt-5 display-3">Queue App </p>
          <div className="text-center serachWrapper">
            <InputGroup className="mb-3 w-50 searchBar">
              <FormControl
                className="searchBar"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                placeholder="Search Company"
              />
            </InputGroup>
          </div>
        </Container>
        <div className="content">
          <Row>
            <Container>
              <Col md="12">
                <div className="columnMain">
                  Hello World
                    <Button>Get Tokens</Button>
                </div>
              </Col>
              <Col md="12">
                <div className="columnMain">
                  Hello World
                    <Button>Get Tokens</Button>
                </div>
              </Col>
              <Col md="12">
                <div className="columnMain">
                  Hello World
                    <Button>Get Tokens</Button>
                </div>
              </Col>
              <Col md="12">
                <div className="columnMain">
                  Hello World
                    <Button>Get Tokens</Button>
                </div>
              </Col>
              <Col md="12">
                <div className="columnMain">
                  Hello World
                    <Button>Get Tokens</Button>
                </div>
              </Col>
              <Col md="12">
                <div className="columnMain">
                  Hello World
                    <Button>Get Tokens</Button>
                </div>
              </Col>
              <Col md="12">
                <div className="columnMain">
                  Hello World
                    <Button>Get Tokens</Button>
                </div>
              </Col>
            </Container>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default GetAllCompanies;
