import { db, auth, firebase } from "../../../firebase/Firebase";

export const SLIDE_COUNT = "SLIDE_COUNT";

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
};
