import firebase from "firebase/app";
import history from "../components/others/history";
import "firebase/firestore";
import "firebase/auth";

const firebaseApp = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseApp);

const firebaseUiConfig = {
  signInFlow: "popup",
  // signInSuccessUrl: "/",
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
      let isNewUser = authResult.additionalUserInfo.isNewUser;
      // hod to send a hard refresh since a new user needed time
      // for cloud function to add user to userIPC database.
      // the hard refresh would allow authstate to be called again
      // auth state would fetch user data
      if (isNewUser) {
        console.log("refresh whole app");
        history.push("/");
        return window.location.reload(true);
      }
      return false;
    },
  },
  signInOptions: [
    // List of OAuth providers supported.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth, firebaseUiConfig, firebase };
