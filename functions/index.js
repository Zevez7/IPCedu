const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

const createNotification = (notification) => {
  return admin
    .firestore()
    .collection("notifications")
    .add(notification)
    .then((doc) => console.log("notification added", doc));
};

exports.userJoined = functions.auth.user().onCreate((user) => {
  const email = user.email; // The email of the user.
  const displayName = user.displayName; // The disp
  const userId = user.uid;

  const dataObjectUerTemplate = {
    displayName,
    email,
    userId,
    location: "Tampa Bay",
    supervisor: "N/A",
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
    .set(dataObjectUerTemplate)
    .then((doc) => console.log("add new user to usersIPC", doc));

  // return admin
  //   .firestore()
  //   .collection("usersIPC")
  //   .doc(user.uid)
  //   .get()
  //   .then((doc) => {
  //     const newUser = doc.data();
  //     const notification = {
  //       content: "Joined the party",
  //       user: `${newUser.email} ${newUser.displayName}`,
  //       time: admin.firestore.FieldValue.serverTimestamp(),
  //     };

  //     return createNotification(notification);
  //   });
});

// exports.projectCreated = functions.firestore()
//   .document("usersIPC/{userId}")
//   .onCreate((doc) => {
//     const user = doc.data();
//     const notification = {
//       content: "Added a new unit",
//       user: `${project.firstName}${project.lastName}`,
//       time: admin.firestore.FieldValue.serverTimestamp(),
//     };

//     return createNotification(notification);
//   });
