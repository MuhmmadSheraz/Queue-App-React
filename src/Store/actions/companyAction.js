import { firebase } from "../../config/firebase";
const companyAction = (data) => {
  return {
    type: "GET_COMPANY_DATA",
    data: data,
  };
};
const addCompaniesFromDB = (data) => {
  return {
    type: "GET_COMPANY_FROM_DB",
    data: data,
  };
};
const realTime = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("companyList")
      .onSnapshot((res) => {
        const companyList = [];
        res.forEach((x) => {
          companyList.push(x.data());
        });
        dispatch({
          type: "LIVE_UPDATES",
          data: companyList,
        });
      });
  };
};
const removeCompany=(data)=>{
  console.log("datat",data)
  return {
    type:"REMOVE_COMPANY",
    data:data
  }
}
const companyActionNull = () => {
  return {
    type: "REMOVE_ALL_COMPANIES",
    data: "",
  };
};

export { companyAction, companyActionNull, addCompaniesFromDB, realTime,removeCompany };
