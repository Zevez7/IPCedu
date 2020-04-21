import { combineReducers } from "redux";
import dataReducer from "./dataReducer";
import firestoreReducer from "./firestoreReducer";

const rootReducer = combineReducers({
  data: dataReducer,
  fireData: firestoreReducer,
});

export default rootReducer;
