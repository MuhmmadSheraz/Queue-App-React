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
  console.log("user Logged In");
  const provider = new firebase.auth.FacebookAuthProvider();
  // provider.addScope("user_birthday");
  firebase.auth().languageCode = "fr_FR";

  provider.setCustomParameters({
    display: "popup",
  });
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      console.log(token);
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
};
const logOut = () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("SignedOut");
    })
    .catch(function (error) {
      // An error happened.
    });
};
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log("UserLoggedIN ****");
  } else {
    console.log("UserLoggedout ****");
    // No user is signed in.
  }
});
export { login, logOut,firebase };
