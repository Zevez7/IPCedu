import { FETCH_CLEANING_DATA, FETCH_COVID_DATA } from "./../action/types";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CLEANING_DATA:
      //****testing
      console.log("reducer cleaning", payload);
      return payload;
    case FETCH_COVID_DATA:
      //****testing
      console.log("reducer covid", payload);
      return payload;
    default:
      return state;
  }
};
