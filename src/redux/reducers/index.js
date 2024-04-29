import { combineReducers } from "redux";

import header from "./headerSlice";
import auth from "./authSlice";
import teams from "./teamSlice";
import projects from "./projectSlice";

const rootReducer = combineReducers({
  header,
  auth,
  teams,
  projects,
});
export default rootReducer;
