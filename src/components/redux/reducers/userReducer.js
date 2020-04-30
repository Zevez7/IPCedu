import { USER_DATA, LOGOUT } from "./../action/types";

const initialState = { displayName: null, email: null, uid: null };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_DATA:
      return payload;
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
