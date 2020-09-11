const companyAction = (data) => {

    // console.log("from Company Action",data)
  return {
    type: "GET_COMPANY_DATA",
    data: data,
  };
};
export default companyAction