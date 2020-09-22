const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_USER_TO_STORE": {
      return { ...state, user: action.data };
    }
    case "REMOVE_USER": {
      return { ...state, user: null};
    }
    default:
      return state;
  }
};
export default authReducer;
