import { combineReducers } from "redux";
import authReducer from "./reducer/authReducer.js";
import companyReducer from "./reducer/companyReducer.js";
export default combineReducers({
  authReducer,
  companyReducer,
});
