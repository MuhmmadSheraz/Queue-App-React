import React, { useState, useEffect } from "react";
import { Modal, Card, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaCoins } from "react-icons/fa";
import { BiTimer, BiInfinite } from "react-icons/bi";
import { BiCoinStack } from "react-icons/bi";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getId,
  updateDailyDetails,
  resetTokens,
  getCompanyData,
  seeBuyers,
} from "../../config/firebase";
import "./companyDetails.css";
import { realTime } from "../../Store/actions/companyAction";
import useWebAnimations, { shakeY } from "@wellyshen/use-web-animations";

const CompanyDeatils = (props) => {
  const [addTokens, setAddTokens] = useState("");
  const [addTime, setTime] = useState("");
  const [buyers, setBuyers] = useState([]);
  const { id } = useParams();
  const allCompanies = props && props.company;
  const selectedCompany = allCompanies.filter((x) => x.companyId === id);
  const name = selectedCompany[0].companyName;
  console.log(id)
  // const showBuyers = async () => {
  //   console.log(id);
  //   if (buyers.length == 0) {
  //     const a = [];
  //     const dataBuyer = await seeBuyers(id);
  //     dataBuyer.forEach((x) => a.push(x.data()));
  //     setTimeout(() => {
  //       setBuyers(a);
  //     }, 1000);
  //   } else {
  //     setBuyers(buyers);
  //     console.log(buyers);
  //   }
  // };
  // const helloBuyer = async () => {
  //   const abc = await showBuyers();
  //   setBuyers(abc);
  //   console.log(abc);
  // };
  useEffect(() => {
    props.getRealData();
    resetToken();
  }, []);
  const resetToken = async () => {
    const data = await getCompanyData(id);
    const prevDate = await data.data().createdOn;
    if (new Date().toLocaleDateString() !== prevDate) {
      resetTokens(id);
    }
  };
  const updateDetails = async (name) => {
    let date = new Date().toLocaleDateString();
    await updateDailyDetails(id, addTokens, addTime, date);
    props.getRealData();
  };
  const { keyframes, timing } = shakeY;
  const { ref } = useWebAnimations({
    keyframes,
    timing: {
      ...timing,
      delay: 500,
      iterations: Infinity,
      duration: timing.duration * 10.75,
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
                <p className="my-1">Address : {selectedCompany[0].address} </p>
                <p className="my-1">Since : {selectedCompany[0].since}</p>
                <p className="my-1">
                  Timing : {selectedCompany[0].timingFrom} AM to{" "}
                  {selectedCompany[0].timingTo} PM
                </p>
                <Link to={`buyers/${selectedCompany[0].companyId}`}>
                  <button className="addTokenBtn mt-2">
                    See Buyers
                  </button>
                </Link>
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
            </Col>
          </Row>
          {/* {buyers && (
            <ul>
              {buyers.map((x) => {
                return <li>{x.buyerId}</li>;
              })}
            </ul>
          )} */}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log("state from companyDetails", state);
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
