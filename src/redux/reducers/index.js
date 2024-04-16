import { combineReducers } from "redux";

import header from "./headerSlice";

const rootReducer = combineReducers({
  header,
});
export default rootReducer;
