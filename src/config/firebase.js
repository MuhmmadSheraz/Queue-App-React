import * as firebase from "firebase";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyBrPwxFtj9z9XFi0gpmGDrwWPdzwgdxE1w",
  authDomain: "queue-app-80606.firebaseapp.com",
  databaseURL: "https://queue-app-80606.firebaseio.com",
  projectId: "queue-app-80606",
  storageBucket: "queue-app-80606.appspot.com",
  messagingSenderId: "938993197648",
  appId: "1:938993197648:web:a48d965063c8026f622755",
  measurementId: "G-VVLKDSGQ1E",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

const login = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().languageCode = "fr_FR";

  provider.setCustomParameters({
    display: "popup",
  });
  return firebase.auth().signInWithPopup(provider);
};
const logOut = () => {
  return firebase.auth().signOut();
};

const addUserToFirebase = (uid, email, userName) => {
  firebase.firestore().collection("user").doc(uid).set({
    userId: uid,
    userEmail: email,
    userName: userName,
  });
};
const addCompanyToFirebase = (companyListInstance, marker, image) => {
  let ref = firebase.firestore().collection("companyList").doc();
  const id = ref.id;
  if (image === "") {
    ref.set({
      companyName: companyListInstance.companyName,
      userId: companyListInstance.userId,
      since: companyListInstance.since,
      timingFrom: companyListInstance.timingFrom,
      timingTo: companyListInstance.timingTo,
      address: companyListInstance.address,
      companyId: id,
      axis: marker,
    });
  } else if (image != "") {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            ref.set({
              companyName: companyListInstance.companyName,
              userId: companyListInstance.userId,
              since: companyListInstance.since,
              timingFrom: companyListInstance.timingFrom,
              timingTo: companyListInstance.timingTo,
              address: companyListInstance.address,
              companyId: id,
              axis: marker,
              image: url,
            });
          });
      }
    );
  }
};
const currentUser = () => {
  return firebase.auth().onAuthStateChanged();
};
const user = () => {
  return firebase.auth().currentUser;
};
const getAllCompanies = (limit) => {
  if (limit)
    return firebase.firestore().collection("companyList").limit(limit).get();
  return firebase.firestore().collection("companyList").get();
};

const getCompanyData = (compId) => {
  return firebase.firestore().collection("companyList").doc(compId).get();
};
const updateDailyDetails = (docId, addTokens, addTime, date) => {
  firebase.firestore().collection("companyList").doc(docId).update({
    timeTurned: addTime,
    totalTokens: addTokens,
    createdOn: date,
    currentTokens: addTokens,
  });
};
const resetTokens = (docId) => {
  firebase.firestore().collection("companyList").doc(docId).update({
    totalTokens: 0,
  });
};

const delete_company = (param) => {
  return firebase.firestore().collection("companyList").doc(param).delete();
};
const purchaseToken = (tokenObj) => {
  return firebase.firestore().collection("buyers").add({
    companyId: tokenObj.companyId,
    buyerId: tokenObj.buyerId,
    tokenNumber: tokenObj.tokenNumber,
    datePurchase: tokenObj.datePurchase,
  });
};
const updateTokens = (id, currTokens) => {
  console.log("Token Updated");
  return firebase
    .firestore()
    .collection("companyList")
    .doc(id)
    .update({
      currentTokens: currTokens - 1,
    });
};

export {
  login,
  logOut,
  addCompanyToFirebase,
  firebase,
  addUserToFirebase,
  currentUser,
  getAllCompanies,
  updateDailyDetails,
  resetTokens,
  delete_company,
  user,
  getCompanyData,
  purchaseToken,
  updateTokens,
  storage,
};
