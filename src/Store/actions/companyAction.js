const companyAction = (data) => {
  console.log("Compnay action Chala ");
  return {
    type: "GET_COMPANY_DATA",
    data: data,
  };
};
const addCompaniesFromDB = (data) => {
  console.log("Compnay action Chala ");
  return {
    type: "GET_COMPANY_FROM_DB",
    data: data,
  };
};

const companyActionNull = () => {
  return {
    type: "REMOVE_ALL_COMPANIES",
    data: "",
  };
};

export { companyAction, companyActionNull, addCompaniesFromDB };
