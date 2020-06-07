import { combineReducers } from "redux";
import userReducer from "./userReducer";
import slideReducer from "./slideReducer";
import coordinatorReducer from "./coordinatorReducer";
import adminReducer from "./adminReducer";
import publicReducer from "./publicReducer";

const rootReducer = combineReducers({
  userData: userReducer,
  slideData: slideReducer,
  adminData: adminReducer,
  coordinatorUserData: coordinatorReducer,
  publicData: publicReducer,
});

export default rootReducer;
