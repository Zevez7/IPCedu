import { db } from "../../../firebase/Firebase";

export const FETCH_COORDINATOR_USER = "FETCH_COORDINATOR_USER";

export const fetchCoordinatorUser = (coordinatorId) => async (dispatch) => {
  const CoordinatorUserList = [];

  try {
    const userQuerySnapShot = await db
      .collection("usersIPC")
      .where("coordinator", "==", coordinatorId)
      .get();

    userQuerySnapShot.forEach((doc) => {
      CoordinatorUserList.push(doc.data());
    });
    dispatch({ type: FETCH_COORDINATOR_USER, payload: CoordinatorUserList });
  } catch (error) {
    console.log("userQuerySnapShot for coordinator's user does not exist");
    //****testing
    console.log("error", "coordinator's user:" + error);
  }
};
