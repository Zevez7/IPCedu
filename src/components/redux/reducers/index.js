import { combineReducers } from "redux";
import dataReducer from "./dataReducer";
import firestoreReducer from "./firestoreReducer";
import userReducer from "./userReducer";
import slideReducer from "./slideReducer";
import covidListReducer from "./covidListReducer";

const rootReducer = combineReducers({
  data: dataReducer,
  fireData: firestoreReducer,
  userData: userReducer,
  slideData: slideReducer,
  covidListData: covidListReducer,
});

export default rootReducer;
