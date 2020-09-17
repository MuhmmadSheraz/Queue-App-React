import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { addUser, removeUser } from "../../Store/actions/authAction";
import {
  addCompaniesFromDB,
  realTime,
  removeCompany,
} from "../../Store/actions/companyAction";
import {
  firebase,
  logOut,
  getAllCompanies,
  getId,
  delete_company,
} from "../../config/firebase";
import { useHistory } from "react-router-dom";
import AddCompanyForm from "../../component/AddCompanyForm";
import { Link } from "react-router-dom";
import "./company.css";

const Company = (props) => {
  const companyListArray = props && props.allCompanies;
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const history = useHistory();

  const getCompanies = async () => {
    const companies = await getAllCompanies();
    const companyList = [];
    companies.forEach((x) => {
      companyList.push(x.data().companyListInstance);
    });
    props.addDataToDB(companyList);
  };
  const remove_Company = async (name) => {
    console.log("Delete ID", name);
    const CompanyId = await getId(name);
    const docId = CompanyId.docs[0].id;
    delete_company(docId)
  };
  useEffect(() => {
    if (companyListArray === undefined) {
      getCompanies();
    }
  }, []);

  useEffect(() => {
    userStatus();
    props.getRealData();
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
                      <Button
                        className="btn btn-danger"
                        onClick={() => remove_Company(x.companyName)}
                      >
                        X
                      </Button>
                    </Col>
                  );
                }
              })}
            </Row>
          </Container>
        )}

        {showForm ? <AddCompanyForm /> : ""}
      </div>

      <button className="floatBtn btn-primary" onClick={showFormBtn}>
        +
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {
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
    getRealData: () => dispatch(realTime()),
    deleteCompany: (data) => dispatch(removeCompany(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Company);
