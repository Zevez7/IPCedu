import { LOGOUT, DELETE_USER, USER_DATA } from "./../action/userAction";

const initialState = { displayName: null, email: null, uid: null };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_DATA:
      return payload;
    case LOGOUT:
      return initialState;
    case DELETE_USER:
      return state;
    default:
      return state;
  }
};
