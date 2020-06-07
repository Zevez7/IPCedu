import history from "../../others/history";
import { db, auth, firebase } from "../../../firebase/Firebase";

export const USER_DATA = "USER_DATA";
export const LOGOUT = "LOGOUT";
export const DELETE_USER = "DELETE_USER";

export const logOut = () => async (dispatch) => {
  try {
    await auth.signOut();

    console.log("logout successful");
  } catch (error) {
    console.log("error", error);
  }

  dispatch({
    type: LOGOUT,
  });
};

export const deleteUser = () => (dispatch) => {
  auth.currentUser
    .reauthenticateWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((userResult) => {
      console.log(`account is deleted ${userResult.user.displayName} `);
      auth.currentUser.delete();
    })
    .then(() => {
      //****testing
      console.log("redirecting to push /");
      history.push("/");
      return window.location.reload();
    })
    .catch((error) => {
      console.log("error", error);
    });
  dispatch({
    type: DELETE_USER,
  });
};

export const fetchUserData = () => (dispatch) => {
  auth.onAuthStateChanged((user) => {
    console.log("authstateChanged called");
    if (user) {
      // User is signed in.
      const uid = user.uid;

      //****testing
      console.log("authstateChanged uid", uid);
      // get the user's data from the userIPC collection
      db.collection("usersIPC")
        .doc(uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("fetchUserData User data:", doc.data());
            dispatch({ type: USER_DATA, payload: doc.data() });
          } else {
            console.log("fetchUserData No such user data!");
          }
        });
    } else {
      console.log("fetchUserData you are signed out");
    }
  });
};

export const editUserData = (data, adminUserId) => async (
  dispatch,
  getState
) => {
  const userData = getState().userData;
  const userId = adminUserId ? adminUserId : userData.userId;

  try {
    await db.collection("usersIPC").doc(userId).update(data);

    console.log("edit user successful");
  } catch (error) {
    console.log("error", error);
  }

  dispatch(fetchUserData());
};
