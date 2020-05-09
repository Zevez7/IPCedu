import { FETCH_COVID_LIST } from "./../action/types";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_COVID_LIST:
      return payload;

    default:
      return state;
  }
};
