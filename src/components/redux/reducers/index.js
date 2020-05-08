import { combineReducers } from "redux";
import dataReducer from "./dataReducer";
import firestoreReducer from "./firestoreReducer";
import userReducer from "./userReducer";
import topicListReducer from "./topicListReducer";
import slideReducer from "./slideReducer";

const rootReducer = combineReducers({
  data: dataReducer,
  fireData: firestoreReducer,
  userData: userReducer,
  topicListData: topicListReducer,
  slideData: slideReducer,
});

export default rootReducer;
