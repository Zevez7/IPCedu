const functions = require("firebase-functions");
const admin = require("firebase-admin");
const userPrivacyPaths = require("./user_privacy.json");

admin.initializeApp(functions.config().firebase);

exports.userJoined = functions.auth.user().onCreate((user) => {
  const email = user.email;
  const displayName = user.displayName;
  const userId = user.uid;
  const createdAt = Date.now();

  const dataObjectUserTemplate = {
    displayName,
    email,
    userId,
    createdAt,
    location: "N/A",
    coordinator: "N/A",
    role: "user",
    position: "N/A",
    covid: {
      title: "COVID-19 Infection Control",
      info: "Infection control guide for health care worker",
      topic: "covid",
      unit: {
        "1": {
          info: "OVERVIEW",
          unitNum: 1,
          currentSlide: 0,
          totalSlide: 4,
        },
        "2": {
          info: "RISK FACTORS",
          unitNum: 2,
          currentSlide: 0,
          totalSlide: 2,
        },
        "3": {
          info: "TESTING",
          unitNum: 3,
          currentSlide: 0,
          totalSlide: 7,
        },
        "4": {
          info: "SIGNS & SYMPTOMS",
          unitNum: 4,
          currentSlide: 0,
          totalSlide: 6,
        },
      },
    },
  };

  return admin
    .firestore()
    .collection("usersIPC")
    .doc(`${userId}`)
    .set(dataObjectUserTemplate)
    .then((doc) => console.log("add new user to usersIPC", doc));
});

// The clearData function removes personal data from the RealTime Database,
// Storage, and Firestore. It waits for all deletions to complete, and then
// returns a success message.
//
// Triggered by a user deleting their account.
exports.clearData = functions.auth.user().onDelete((user) => {
  const uid = user.uid;

  const firestorePromise = clearFirestoreData(uid);

  return Promise.all([firestorePromise]).then(() =>
    console.log(`Successfully removed data for user #${uid}.`)
  );
});

// Clear all specified paths from the Firestore Database. To add or remove a
// path, edit the `firestore[clearData]` array in `user_privacy.json`.
//
// This function is called by the top-level `clearData` function.
//
// Returns a list of Promises
const clearFirestoreData = (uid) => {
  const paths = userPrivacyPaths.firestore.clearData;
  const promises = [];

  for (let i = 0; i < paths.length; i++) {
    const entry = paths[i];
    const entryCollection = replaceUID(entry.collection, uid);
    const entryDoc = replaceUID(entry.doc, uid);
    const docToDelete = admin
      .firestore()
      .collection(entryCollection)
      .doc(entryDoc);
    if ("field" in entry) {
      const entryField = replaceUID(entry.field, uid);
      const update = {};
      update[entryField] = FieldValue.delete();
      promises.push(
        docToDelete.update(update).catch((err) => {
          console.error("Error deleting field: ", err);
        })
      );
    } else if (docToDelete) {
      promises.push(
        docToDelete.delete().catch((err) => {
          console.error("Error deleting document: ", err);
        })
      );
    }
  }

  return Promise.all(promises).then(() => uid);
};

const replaceUID = (str, uid) => {
  return str.replace(/UID_VARIABLE/g, uid);
};
