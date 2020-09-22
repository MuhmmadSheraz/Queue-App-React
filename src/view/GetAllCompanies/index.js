import React, { useState, useEffect } from "react";
import "./getllcompanies.css";
import {
  Container,
  InputGroup,
  FormControl,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import useWebAnimations, { shakeY } from "@wellyshen/use-web-animations";
import { connect } from "react-redux";

const GetAllCompanies = (props) => {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    setCompanies(props.getCompanyList.companyList);
    console.log(companies);
  }, []);
  const { ref: heading } = useWebAnimations({
    ...shakeY,
    timing: {
      delay: 500,
      duration: 1000 * 20,
      iterations: Infinity,
    },
  });
  const searchCompany = (e) => {
    const entry = e.target.value;
    if (e.key === "Enter") {
      if (entry == "") {
          return setCompanies(props.getCompanyList.companyList);
        }
      setCompanies((prev) => {
        return prev.filter((x) => x.companyName == entry);
      });
    }
    // if(e.key==="Enter")
    // if (entry == "") {
    //   return setCompanies(props.getCompanyList.companyList);
    // } else if(entry != "") {
    //   setCompanies((prev) => {
    //      return prev.filter((x) => x.companyName == entry);
    //     });
    //     //  setCompanies(props.getCompanyList.companyList);
    // }
    // console.log(companies);
  };
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
          <p
            className="text-center text-light  display-3 heading"
            ref={heading}
          >
            Queue App
          </p>
          <div className="text-center serachWrapper">
            <InputGroup className="mb-3 w-50 searchBar">
              <FormControl
                className="searchBar"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                placeholder="Search Company"
                onKeyDown={searchCompany}
              />
            </InputGroup>
          </div>
        </Container>
        <div className="content">
          <Row>
            <Container>
              {companies &&
                companies.map((x) => {
                  return (
                    <Col md="12">
                      <div className="columnMain">
                        {x.companyName}
                        <Button>Get Tokens</Button>
                      </div>
                    </Col>
                  );
                })}
            </Container>
          </Row>
        </div>
      </div>
    </div>
  );
};
const mapSateToProps = (state) => {
  return {
    getCompanyList: state.companyReducer,
  };
};
export default connect(mapSateToProps, null)(GetAllCompanies);
