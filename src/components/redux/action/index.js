import {
  FETCH_FIRESTORE_TOPIC_UNIT,
  FETCH_COVID_LIST,
  LOGOUT,
  USER_DATA,
  SLIDE_COUNT,
} from "./types";

import { db, auth } from "../../firebase/Firebase";

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

export const fetchCovidList = () => async (dispatch) => {
  try {
    const covidList = await db.collection("covid").doc("covidList").get();

    if (covidList.data()) {
      console.log("covidList", covidList.data());
      dispatch({ type: FETCH_COVID_LIST, payload: covidList.data() });
    }
  } catch (error) {
    console.log("CovidList does not exist", error);
  }
};

export const fetchUserData = () => (dispatch) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      const uid = user.uid;

      // get the user's data from the userIPC collection
      db.collection("usersIPC")
        .doc(uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("User data:", doc.data());
            dispatch({ type: USER_DATA, payload: doc.data() });
          } else {
            console.log("No such user data!");
          }
        });
    } else {
      console.log("you are signed out");
    }
  });
};

export const logOut = () => async (dispatch) => {
  try {
    await auth.signOut();

    console.log("logout successful");
  } catch (error) {
    console.log("error", error);
  }

  dispatch({
    type: LOGOUT,
  });
};

export const slideCount = (payload) => ({
  type: SLIDE_COUNT,
  payload,
});

export const updateCurrentSlide = (topicImport, unitNum, page) => (
  dispatch,
  getState
) => {
  const userData = getState().userData;
  const userId = userData.userId;

  // update whole unit with new slide
  // shallow copy savedTopic into a new variable
  let topic = { ...userData[topicImport] };

  // changed the currentSlide to its new value
  topic.unit[unitNum].currentSlide = page;
  console.log("savedTopic", topic);

  // if user ID populated from getState() userData then
  // update the document
  if (userId) {
    db.collection("usersIPC")
      .doc(userId)
      .update({
        [topicImport]: topic,
      })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch((err) => {
        console.log("Document did not update correctly", err);
      });
  }

  // dispatch();
  // dispatch({ type: FETCH_TOPIC_LIST, payload: firestoreTopicList });
};
