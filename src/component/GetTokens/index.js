import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import "./gettokens.css";
import { BiMap } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { realTime, realTime2 } from "../../Store/actions/companyAction";
import { connect } from "react-redux";
import { MyMapComponents } from "../../component/Map/index";
import {
  user,
  purchaseToken,
  updateTokens,
  getRealSpecific,
  firebase,
  unsubscribe
} from "../../config/firebase.js";
const GetTokens = (props) => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [disableBtn, setDisaleBtn] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    getRealSpecific(slug);
    return(()=>{
      console.log("get Tokens UnMounted")
      unsubscribe()
    })
  }, []);
  const getRealSpecific = (slug) => {
    firebase
      .firestore()
      .collection("companyList")
      .doc(slug)
      .onSnapshot((item) => {
        setSelectedCompany(item.data());
      });
  };

  const buyToken = async () => {
    console.log("purchased");
    console.log(await user().photoURL);
    const a = await user();
    let tokenObj = {
      companyId: slug,
      datePurchase: new Date().toLocaleDateString(),
      tokenNumber: selectedCompany.currentTokens,
      buyerId: a.uid,
      buyerName: a.displayName,
      buyerEmail: a.email,
      buyerProfile: a.photoURL,
    };
    purchaseToken(tokenObj, slug, selectedCompany.currentTokens);
    updateTokens(slug, selectedCompany.currentTokens);
    setDisaleBtn(true);
  };
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
        <p className="heading text-light pt-5">Queue App</p>
        <div className="cardWrapperTokens pt-5">
          <div className="card">
            <div className="cardHeader">
              <div className="profileImg rounded-circle">
                {selectedCompany.image ? (
                  <img
                    className="rounded-circle"
                    src={selectedCompany.image}
                    alt="profilePic"
                  />
                ) : (
                  <img
                    className="rounded-circle"
                    src="https://argauto.lv/application/modules/themes/views/default/assets/images/image-placeholder.png"
                    alt="profilePic"
                  />
                )}
              </div>
            </div>
            <div className="cardBody mt-5 pt-2">
              <h3 className="text-center">{selectedCompany.companyName}</h3>
              {selectedCompany.totalTokens ? (
                <div className="tokensDetails mt-3">
                  <div className="currentTokens">
                    <h4>{selectedCompany.currentTokens}</h4>
                    <p className="pt-1">Current Token Available</p>
                  </div>
                  <div className="totalTokens">
                    <h4>{selectedCompany.totalTokens}</h4>
                    <p className="pt-1">Total Tokens</p>
                  </div>
                </div>
              ) : (
                <div className="tokensDetails mt-3">
                  <div className="currentTokens">
                    <h4>Not Available</h4>
                    <p className="pt-1">Current Token Available</p>
                  </div>
                  <div className="totalTokens">
                    <h4>Not Available</h4>
                    <p className="pt-1">Total Tokens</p>
                  </div>
                </div>
              )}
              <div className="companyDetails">
                <h5 className="p-2 m-2">Since: {selectedCompany.since}</h5>
                <h5 className="p-2 m-2">
                  Timing To: {selectedCompany.timingFrom}
                </h5>
                <h5 className="p-2 m-2">
                  Timing From: {selectedCompany.timingTo}
                </h5>
                <h5 className="p-2 m-2">Address: {selectedCompany.address}</h5>
              </div>
              {showMap && (
                <MyMapComponents
                  marker={{
                    lat: selectedCompany.axis.lat,
                    lng: selectedCompany.axis.lng,
                  }}
                  axis={{
                    lat: selectedCompany.axis.lat,
                    lng: selectedCompany.axis.lng,
                  }}
                  isMarkerShown
                  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              )}
              <Button
                variant="outline-warning"
                className="mx-1"
                onClick={() => setShowMap(true)}
              >
                See Address
              </Button>
              {/* {disableBtn ? (
                <Button variant="outline-success" onClick={buyToken} disabled>
                  Purchase Token
                </Button>
              ) : ( */}
              <Button variant="outline-success" onClick={buyToken}>
                Purchase Token
              </Button>
              {/* )} */}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
// const mapStateToProps = (state) => {
//   return {
//     company: state.companyReducer.companyList,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getRealData: () => dispatch(realTime()),
//     getRealData2: (id) => dispatch(realTime2(id)),
//   };
// };
export default connect(null, null)(GetTokens);
