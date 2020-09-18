import React, { useState, useEffect } from "react";
import { Modal, Card, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaCoins } from "react-icons/fa";
import { BiTimer, BiInfinite } from "react-icons/bi";
import { BiCoinStack } from "react-icons/bi";
import { connect } from "react-redux";
import {
  getId,
  updateDailyDetails,
  resetTokens,
  getDetails,
} from "../../config/firebase";
import "./companyDetails.css";
import { realTime } from "../../Store/actions/companyAction";
import useWebAnimations, { shakeY } from "@wellyshen/use-web-animations";

const CompanyDeatils = (props) => {
  const [addTokens, setAddTokens] = useState("");
  const [addTime, setTime] = useState("");
  const { id } = useParams();
  const allCompanies = props && props.company;
  const selectedCompany = allCompanies.filter((x) => x.companyName === id);
  const name = selectedCompany[0].companyName;
  useEffect(() => {
    props.getRealData();
    resetToken();
  }, []);

  const resetToken = async () => {
    const CompanyId = await getId(name);
    const docId = CompanyId.docs[0].id;
    const data = await getDetails(docId);
    const prevDate = await data.data().createdOn;
    if (new Date().toLocaleDateString() !== prevDate) {
      await resetTokens(docId);
    }
  };
  const updateDetails = async (name) => {
    const CompanyId = await getId(name);
    const docId = CompanyId.docs[0].id;
    let date = new Date().toLocaleDateString();
    await updateDailyDetails(docId, addTokens, addTime, date);
    props.getRealData();
  };
  const { keyframes, timing } = shakeY;
  const { ref } = useWebAnimations({
    keyframes,
    timing: {
      ...timing,
      delay: 500, // Delay 1s,
      iterations: Infinity,
      duration: timing.duration *10.75, // Speed up the animation
    },
  });
  return (
    <div className="mainWrapper">
      <span className="pt-5">
        <h1 className="text-center  py-5 heading target" ref={ref}>
          Queue App
        </h1>
      </span>
      <div className="detailWrapper">
        <div className="cardWrapper">
          <Row>
            <Col md="6" className="col">
              <div className="contentWrapper">
                <p className="my-1">Name : {selectedCompany[0].companyName}</p>
                <p className="my-1">Address : 455y </p>
                <p className="my-1">Since : {selectedCompany[0].since}</p>
                <p className="my-1">
                  Timing : {selectedCompany[0].timingFrom} AM to{" "}
                  {selectedCompany[0].timingTo} PM
                </p>
                <button className="addTokenBtn mt-2">See Buyers</button>
              </div>
            </Col>
            <Col md="6" className="customLine col">
              <div className="col2">
                <span>Total Tokens </span>
                <span className="ml-auto">
                  {selectedCompany[0].totalTokens}
                  <BiCoinStack />
                </span>
              </div>
              <input
                placeholder="Enter Tokens"
                className="tokenInp my-3"
                onChange={(e) => {
                  setAddTokens(e.target.value);
                }}
              />

              <input
                placeholder="Enter Time For Each Turn"
                className="tokenInp my-3"
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              />

              <button
                className="addTokenBtn"
                onClick={() => updateDetails(name)}
              >
                Update
              </button>
              {/* <button className="addTokenBtn" onClick={() => resetToken(name)}>
                Reset Tokens
              </button> */}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    company: state.companyReducer.companyList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getRealData: () => dispatch(realTime()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CompanyDeatils);
