import { FETCH_FIRESTORE_TOPIC_UNIT } from "./../action/types";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_FIRESTORE_TOPIC_UNIT:
      console.log("FIRESTORE_TOPIC_UNIT payload", payload);
      return payload;
    default:
      return state;
  }
};
