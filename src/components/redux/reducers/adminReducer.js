import { FETCH_ALL_USER } from "../action/adminAction";

const initialState = {
  allUser: {},
  someUser: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ALL_USER:
      return { ...state, allUser: payload };

    default:
      return state;
  }
};
