import { combineReducers } from "redux";

import header from "./headerSlice";
import auth from "./authSlice";
import teams from "./teamSlice";
import projects from "./projectSlice";
import leadSources from "./leadSourcesSlice";
import leads from "./leadSlice";

const rootReducer = combineReducers({
  header,
  auth,
  teams,
  projects,
  leadSources,
  leads,
});
export default rootReducer;
