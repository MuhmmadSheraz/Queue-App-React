import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { addUser, removeUser } from "../../Store/actions/authAction";
import { addCompaniesFromDB } from "../../Store/actions/companyAction";
import { firebase, logOut, getAllCompanies } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import AddCompanyForm from "../../component/AddCompanyForm";
import { Link } from "react-router-dom";
import "./company.css";

const Company = (props) => {
  const companyListArray = props && props.allCompanies;
  console.log("MAP****", companyListArray);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const history = useHistory();
  console.log(companyListArray);
  const allCompaniesList = [];

  const getCompanies = async () => {
    const companies = await getAllCompanies();
    companies.forEach((x) => {
      allCompaniesList.push(x.data().companyListInstance);
    });
    props.addDataToDB(allCompaniesList);
    console.log(allCompaniesList);
  };

  const showFormBtn = () => {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };
  const showDetails = () => {
    if (showDetail) {
      setShowDetail(false);
    } else {
      setShowDetail(true);
    }
  };
  useEffect(() => {
    if (companyListArray === "") {
      console.log("Naya Data Bheja")
      getCompanies();
    }
  }, []);
  useEffect(() => {
    userStatus();
  }, []);

  let userStatus = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user || props.user) {
      } else {
        history.push("/");
        props.isLoggedIn(null);
      }
    });
  };

  return (
    <div className="companyWrapper pb-3">
      <div className="companyContent">
        <h1 className="text-center py-5">Queue App</h1>
        {props.allCompanies && (
          <Container>
            <Row>
              {companyListArray.map((x, index) => {
                if (x.userId === props.user.userId) {
                  return (
                    <Col md="12" className="companyList" key={index}>
                      {x.companyName}
                      <Link to={`/company/${x.companyName}`}>
                        <Button className="btn btn-success">Detail</Button>
                      </Link>
                    </Col>
                  );
                }
              })}
            </Row>
          </Container>
        )}

        {showForm ? <AddCompanyForm /> : ""}
      </div>
      {/* {showAddBtn ? (
            <Button
              className="btn text-center d-flex justify-content-center"
              onClick={showFormBtn}
            >
              Add Your Company +
            </Button>
          ) : (
            <button className="floatBtn btn-primary" onClick={showFormBtn}>
              +
            </button>
          )} */}
      <button className="floatBtn btn-primary" onClick={showFormBtn}>
        +
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(state.companyReducer, "from Company Reducer");
  return {
    user: state.authReducer.user,
    allCompanies: state.companyReducer.companyList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    isLoggedIn: (user) => dispatch(addUser(user)),
    isLoggedOut: () => dispatch(removeUser()),
    addDataToDB: (data) => dispatch(addCompaniesFromDB(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Company);
