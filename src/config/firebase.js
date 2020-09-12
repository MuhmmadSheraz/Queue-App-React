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
  console.log("from Firebase ***", uid, email, userName);
  firebase.firestore().collection("user").doc(uid).set({
    userId: uid,
    userEmail: email,
    userName: userName,
  });
};
const addCompanyToFirebase = (companyList,userId) => {
  const obj=companyList;
  obj["userId"]=userId
  firebase.firestore().collection("companyList").add({
   obj
  }); 
};
const currentUser = () => {
  return firebase.auth().onAuthStateChanged();
};
export {
  login,
  logOut,
  addCompanyToFirebase,
  firebase,
  addUserToFirebase,
  currentUser,
};
