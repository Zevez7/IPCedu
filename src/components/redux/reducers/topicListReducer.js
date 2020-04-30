import { FETCH_TOPIC_LIST } from "./../action/types";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TOPIC_LIST:
      return payload;
    default:
      return state;
  }
};
