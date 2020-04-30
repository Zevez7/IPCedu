import { combineReducers } from "redux";
import dataReducer from "./dataReducer";
import firestoreReducer from "./firestoreReducer";
import userReducer from "./userReducer";
import topicListReducer from "./topicListReducer";


const rootReducer = combineReducers({
  data: dataReducer,
  fireData: firestoreReducer,
  userData: userReducer,
  topicListData: topicListReducer
});

export default rootReducer;
