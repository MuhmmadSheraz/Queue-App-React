const initialState = {
  companyList: [],
};

const companyReducer = (state = initialState, action) => {
  console.log("Compnay Reducer Chala ");
  switch (action.type) {
    case "GET_COMPANY_DATA": {
      return { ...state, companyList: [...state.companyList, action.data] };
    }
    case "REMOVE_ALL_COMPANIES": {
      return { ...state, state: action.data };
    }
    case "GET_COMPANY_FROM_DB": {
      return { ...state, companyList: [...state.companyList, action.data] };
    }
    default:
      return state;
  }
};
export default companyReducer;
