import { SLIDE_COUNT } from "../action/slideAction";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SLIDE_COUNT:
      return { ...state, slide_counter: payload };
    default:
      return state;
  }
};
