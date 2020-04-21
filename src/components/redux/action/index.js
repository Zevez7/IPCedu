import {
  GET_DATA,
  FETCH_CLEANING_DATA,
  FETCH_COVID_DATA,
  FETCH_FIRESTORE_TOPIC_UNIT,
} from "./types";

import cleaningData from "../../../Data/cleaningData.json";
import covidData from "../../../Data/covidData.json";
// import disinfectionData from "../../../Data/disinfectionData.json";
// import sterilizationData from "../../../Data/sterilizationData.json";
// import handData from "../../../Data/handData.json";
// import isolationData from "../../../Data/isolationData.json";

import { db } from "../../others/Firebase";

// unit accepted: "Unit 1, Unit 2, Unit 3"
// topic accepted: "covid, cleaning"
export const fireStoreTopicUnitFetch = (topic, unit) => async (dispatch) => {
  let firestoreTopicUnit;

  try {
    firestoreTopicUnit = await db.collection(topic).doc(`Unit ${unit}`).get();
    firestoreTopicUnit = firestoreTopicUnit.data();
    if (firestoreTopicUnit) {
      console.log("firestoreTopicUnit", firestoreTopicUnit);
    } else {
      console.log("firestoreTopicUnit does not exist");
    }
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: FETCH_FIRESTORE_TOPIC_UNIT, payload: firestoreTopicUnit });
};

export const fetchCleaningData = () => (dispatch) => {
  const data = cleaningData;
  dispatch({ type: FETCH_CLEANING_DATA, payload: data });
};

export const fetchCovidData = () => (dispatch) => {
  const data = covidData;
  dispatch({ type: FETCH_COVID_DATA, payload: data });
};
export const getData = (payload) => ({
  type: GET_DATA,
  payload,
});
