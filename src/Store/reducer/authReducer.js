const authReducer = (state = {}, action) => {
  console.log(action.data);
  switch (action.type) {
    case "ADD_USER_TO_STORE": {
      console.log(action.data);
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
