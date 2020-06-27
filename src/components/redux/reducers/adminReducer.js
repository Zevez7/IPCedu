import { FETCH_ALL_USER, FETCH_ALL_UNIT } from "../action/adminAction";

const initialState = {
  allUser: {},
  allUnit: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ALL_USER:
      return { ...state, allUser: payload };
    case FETCH_ALL_UNIT:
      return { ...state, allUnit: payload };
    default:
      return state;
  }
};
