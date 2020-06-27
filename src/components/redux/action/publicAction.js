import location from "../../../Data/selectData/location.json";
import position from "../../../Data/selectData/position.json";
import role from "../../../Data/selectData/role.json";
import coordinator from "../../../Data/selectData/coordinator.json";
import { db } from "../../../firebase/Firebase";

export const FETCH_POSITION = "FETCH_POSITION";
export const FETCH_LOCATION = "FETCH_LOCATION";
export const FETCH_ROLE = "FETCH_ROLE";
export const FETCH_COORD = "FETCH_COORD";
export const FETCH_COVID_LIST = "FETCH_COVID_LIST";
export const FETCH_TOPIC_UNIT = "FETCH_TOPIC_UNIT";

export const fetchLocation = (payload) => ({
  type: FETCH_LOCATION,
  payload: location,
});

export const fetchPosition = (payload) => ({
  type: FETCH_POSITION,
  payload: position,
});

export const fetchRole = (payload) => ({
  type: FETCH_ROLE,
  payload: role,
});

export const fetchCoord = (payload) => ({
  type: FETCH_COORD,
  payload: coordinator,
});

export const fetchCovidList = () => async (dispatch) => {
  try {
    const covidList = await db.collection("covid").doc("covidList").get();

    if (covidList.data()) {
      console.log("covidList", covidList.data());
      dispatch({ type: FETCH_COVID_LIST, payload: covidList.data() });
    }
  } catch (error) {
    console.log("CovidList does not exist", error);
  }
};

export const fetchTopicUnit = (topic, unit) => async (dispatch) => {
  let topicUnit;
  //****testing
  console.log("unit", unit);

  try {
    topicUnit = await db.collection(topic).doc(`unit ${unit}`).get();
    topicUnit = topicUnit.data();
    if (topicUnit) {
      console.log("topicUnit", topicUnit);
    } else {
      console.log("topicUnit does not exist");
    }
  } catch (error) {
    console.log(error);
  }
  dispatch({ type: FETCH_TOPIC_UNIT, payload: topicUnit });
};
