import React, { useState, useEffect } from "react";
import { seeBuyers } from "../../config/firebase";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./buyer.css";

const Buyers = () => {
  const { compID } = useParams();
  const [buyers, setBuyers] = useState([]);
  const showBuyers = async (compID) => {
    console.log(compID);
    const array1 = [];
    const dataBuyer = await seeBuyers(compID);
    console.log(dataBuyer);
    dataBuyer.forEach((x) => array1.push(x.data()));
    setTimeout(() => {
      setBuyers(array1);
    }, 1000);
  };
  useEffect(() => {
    showBuyers(compID);
  }, []);
  return (
    <div className="buyersMainWrapper">
      <div className="buyersContent">
        <span className="pt-5">
          <h1 className="text-center text-dark py-5 heading">Queue App</h1>
          <h1 className="text-center compheading">*** Add Company ***</h1>
        </span>
        <Container>
          <Row>
            {buyers.map((item) => {
             return (<Col md="12" className="companyList">
                <span className="">
                  <img className="profile" src={item.buyerProfile} />
                  <span className="nameBuyer"> {item.buyerName}</span>
                  <h3 className="float-right mt-4"> {item.tokenNumber}</h3>
                </span>
              </Col>);
            })}
          </Row>
        </Container>
      </div>

      {/* <h1>Buyer Here</h1>
      {buyers && (
        <ul>
          {buyers.map((x) => {
            return <li>{x.buyerName}</li>;
          })}
        </ul>
      )} */}
    </div>
  );
};
export default Buyers;
