import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { getMyTokens, user } from "../../config/firebase";
import useWebAnimations, { shakeY } from "@wellyshen/use-web-animations";
import { connect } from "react-redux";
import "./myTokens.css";

const MyTokens = (props) => {
  const [myTokens, setMyTokens] = useState([]);
  let userId;
  useEffect(() => {
    console.log(props.userInfo.userId);
  }, []);

  const { ref: heading } = useWebAnimations({
    ...shakeY,
    timing: {
      delay: 500,
      duration: 1000 * 20,
      iterations: Infinity,
    },
  });
  const getMyToken = async () => {
    let array1 = [];
    const data = await getMyTokens(props.userInfo.userId);
    data.forEach((x) => {
      array1.push(x.data());
      console.log(array1);
    });
    setMyTokens(array1);
  };
  useEffect(() => {
    getMyToken();
    console.log("useEffect From My Tokens");
    console.log(myTokens);
  }, []);
  return (
    <div className="custom-shape-divider-top-1600808309">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className="shape-fill"
        ></path>
      </svg>
      <Container>
        <p className="text-center text-light display-3 heading" ref={heading}>
          Queue App
        </p>
        <h1 className="text-center text-light compheading">*** My Tokens***</h1>
      </Container>
      <div className="content">
        <Row>
          <Container>
            <Col md="12" key={11244}>
              <div className="columnToken">
                <div className="compName font-weight-bold">Company Name</div>
                <div className="compToken font-weight-bold">Token Number </div>
                <div className="text-danger font-weight-bold">Delete Token</div>
              </div>
            </Col>
            {/* {myTokens.length > 0 &&
              myTokens.map((x) => { */}
            <Col md="12" key={8766}>
              <div className="columnToken">
                <div className="compName">
                  <img className="compImageToken" src="data:image/png;base64,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" />
                  Hello World
                </div>
                <div className="compToken"> 1</div>
                <div className="btn btn-outline-danger">Delete Token</div>
              </div>
            </Col>
            <Col md="12" key={8766}>
              <div className="columnToken">
                <div className="compName">
                  <img className="compImageToken" src="data:image/png;base64,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" />
                  Hello World
                </div>
                <div className="compToken"> 1</div>
                <div className="btn btn-outline-danger">Delete Token</div>
              </div>
            </Col>
            <Col md="12" key={8766}>
              <div className="columnToken">
                <div className="compName">
                  <img className="compImageToken" src="data:image/png;base64,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" />
                  Hello World
                </div>
                <div className="compToken"> 1</div>
                <div className="btn btn-outline-danger">Delete Token</div>
              </div>
            </Col>
            <Col md="12" key={8766}>
              <div className="columnToken">
                <div className="compName">
                  <img className="compImageToken" src="data:image/png;base64,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" />
                  Hello World
                </div>
                <div className="compToken"> 1</div>
                <div className="btn btn-outline-danger">Delete Token</div>
              </div>
            </Col>
            <Col md="12" key={8766}>
              <div className="columnToken">
                <div className="compName">
                  <img className="compImageToken" src="data:image/png;base64,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" />
                  Hello World
                </div>
                <div className="compToken"> 1</div>
                <div className="btn btn-outline-danger">Delete Token</div>
              </div>
            </Col>
            {/* })} */}
          </Container>
        </Row>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userInfo: state.authReducer.user,
  };
};
export default connect(mapStateToProps, null)(MyTokens);
