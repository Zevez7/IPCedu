import { db } from "../../../firebase/Firebase";

export const FETCH_ALL_USER = "FETCH_ALL_USER";

// only admin can fetch all user

export const fetchAllUser = () => async (dispatch) => {
  const allUserList = [];
  try {
    const userQuerySnapShot = await db.collection("usersIPC").get();

    userQuerySnapShot.forEach((doc) => {
      allUserList.push(doc.data());
    });

    dispatch({ type: FETCH_ALL_USER, payload: allUserList });
  } catch (error) {
    console.log("userQuerySnapShot does not exist");
    //****testing
    console.log("error", error);
  }
};
