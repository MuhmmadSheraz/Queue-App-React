const initialState = {
  companyList: [],
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COMPANY_DATA": {
      return { ...state, companyList: [...state.companyList, action.data] };
    }
    case "REMOVE_ALL_COMPANIES": {
      return [];
    }
    case "GET_COMPANY_FROM_DB": {
      return { ...state, companyList: action.data };
    }
    case "LIVE_UPDATES": {
      return { ...state, companyList: action.data };
    }
    case "REMOVE_COMPANY": {
      console.log("Hello Form State");
      return {
        ...state,
        companyList: state.companyList.filter(
          (x) => x.companyId !== action.data
        ),
      };
    }
    default:
      return state;
  }
};
export default companyReducer;
