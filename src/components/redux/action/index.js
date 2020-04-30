import {
  FETCH_FIRESTORE_TOPIC_UNIT,
  FETCH_TOPIC_LIST,
  LOGOUT,
  USER_DATA,
} from "./types";

import { db, auth } from "../../firebase/Firebase";

// unit accepted: "Unit 1, Unit 2, Unit 3"
// topic accepted: "covid, cleaning"
export const fireStoreTopicUnitFetch = (topic, unit) => async (dispatch) => {
  let firestoreTopicUnit;

  try {
    firestoreTopicUnit = await db.collection(topic).doc(`unit ${unit}`).get();
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

export const fireStoreTopicList = () => async (dispatch) => {
  let firestoreTopicList = [];
  try {
    const TopicList = await db.collection("topicList").get();
    TopicList.forEach((doc) => {
      firestoreTopicList = [...firestoreTopicList, doc.data()];
    });
  } catch (error) {
    console.log("firestoreTopicList does not exist", error);
  }

  dispatch({ type: FETCH_TOPIC_LIST, payload: firestoreTopicList });
};

export const userData = (payload) => ({
  type: USER_DATA,
  payload,
});

export const logOut = () => async (dispatch) => {
  try {
    await auth.signOut();
    //****testing
    console.log("logout successful");
  } catch (error) {
    //****testing
    console.log("error", error);
  }

  dispatch({
    type: LOGOUT,
  });
};
