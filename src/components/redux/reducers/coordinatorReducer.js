import { FETCH_COORDINATOR_USER } from "../action/coordinatorAction";
const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_COORDINATOR_USER:
      return [...payload];

    default:
      return state;
  }
};
