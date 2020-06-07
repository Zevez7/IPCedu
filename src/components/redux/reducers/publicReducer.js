import {
  FETCH_LOCATION,
  FETCH_ROLE,
  FETCH_COORD,
  FETCH_POSITION,
  FETCH_COVID_LIST,
  FETCH_TOPIC_UNIT,
} from "../action/publicAction";

const initialState = {
  position: {},
  location: {},
  role: {},
  coord: {},
  covidList: {},
  topicUnit: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_COORD:
      return { ...state, coord: payload };
    case FETCH_POSITION:
      return { ...state, position: payload };
    case FETCH_ROLE:
      return { ...state, role: payload };
    case FETCH_LOCATION:
      return { ...state, location: payload };
    case FETCH_COVID_LIST:
      return { ...state, covidList: payload };
    case FETCH_TOPIC_UNIT:
      return { ...state, topicUnit: payload };
    default:
      return state;
  }
};
