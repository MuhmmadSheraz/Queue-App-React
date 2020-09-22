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
const addCompanyToFirebase = (companyListInstance,id) => {
  firebase.firestore().collection("companyList").add({
    companyName: companyListInstance.companyName,
    userId: companyListInstance.userId,
    since: companyListInstance.since,
    timingFrom: companyListInstance.timingFrom,
    timingTo: companyListInstance.timingTo,
    companyId:id
  });
};
const currentUser = () => {
  return firebase.auth().onAuthStateChanged();
};
const getAllCompanies = () => {
  return firebase.firestore().collection("companyList").get();
};
const getId = (param) => {
  return firebase
    .firestore()
    .collection("companyList")
    .where("companyName", "==", param)
    .get();
};
// const getCompId=(param)=>{
//   firebase.firestore().collection("companyList").doc(param)
// }
const updateDailyDetails = (docId, addTokens, addTime, date) => {
  firebase.firestore().collection("companyList").doc(docId).update({
    timeTurned: addTime,
    totalTokens: addTokens,
    createdOn: date,
  });
};
const resetTokens = (docId) => {
  firebase.firestore().collection("companyList").doc(docId).update({
    totalTokens: 0,
  });
};
const getDetails = (docID) => {
  return firebase.firestore().collection("companyList").doc(docID).get();
};
const delete_company = (param) => {
  return firebase.firestore().collection("companyList").doc(param).delete();
};
export {
  login,
  logOut,
  addCompanyToFirebase,
  firebase,
  addUserToFirebase,
  currentUser,
  getAllCompanies,
  getId,
  updateDailyDetails,
  resetTokens,
  getDetails,
  delete_company,
  storage,
};
