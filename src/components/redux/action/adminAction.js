import { db } from "../../../firebase/Firebase";

export const FETCH_ALL_USER = "FETCH_ALL_USER";
export const FETCH_ALL_UNIT = "FETCH_ALL_UNIT";
export const ADD_NEW_UNIT = "ADD_NEW_UNIT";
export const DELETE_UNIT = "DELETE_UNIT";
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

export const fetchAllUnit = () => async (dispatch) => {
  const allUnitList = [];
  try {
    const unitQuerySnapShot = await db
      .collection("covid")
      .where("list", "==", true)
      .get();

    unitQuerySnapShot.forEach((doc) => {
      allUnitList.push(doc.data());
    });

    //****testing
    console.log("allUnitList", allUnitList);
    dispatch({ type: FETCH_ALL_UNIT, payload: allUnitList });
  } catch (error) {
    console.log("unitQuerySnapShot does not exist");
    //****testing
    console.log("error", error);
  }
};

export const addNewUnit = (collection, doc, data) => async () => {
  try {
    await db.collection(collection).doc(doc).set(data);
    console.log("document added successfully");
  } catch (error) {
    console.error("Adding document", error);
  }
};

export const deleteUnit = (collection, doc) => async (dispatch) => {
  try {
    await db.collection(collection).doc(doc).delete();
    console.log("document added deleted");
  } catch (error) {
    console.error("Adding document", error);
  }
  dispatch(fetchAllUnit());
};
