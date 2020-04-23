import { GET_DATA, FETCH_FIRESTORE_TOPIC_UNIT } from "./types";

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

export const getData = (payload) => ({
  type: GET_DATA,
  payload,
});
