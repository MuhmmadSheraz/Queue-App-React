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
const addCompanyToFirebase = (companyListInstance) => {
  firebase.firestore().collection("companyList").add({
    companyListInstance,
  });
};
const currentUser = () => {
  return firebase.auth().onAuthStateChanged();
};
const getAllCompanies = () => {
  return firebase.firestore().collection("companyList").get();
};
const getId = (param) => {
  console.log(param);
  return firebase
    .firestore()
    .collection("companyList")
    .where("companyListInstance.companyName", "==", param)
    .get();
};
const updateDailyDetails = (docId, addTokens, addTime, date) => {
  console.log(docId);
  firebase.firestore().collection("companyList").doc(docId).update({
    timeTurned: addTime,
    totalTokens:addTokens ,
    createdOn: date,
  });
};
const resetTokens = (docId) => {
  console.log(docId);
  firebase.firestore().collection("companyList").doc(docId).update({
    totalTokens: 0,
  });
};
const getDetails = (docID) => {
  return firebase.firestore().collection("companyList").doc(docID).get();
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
};
