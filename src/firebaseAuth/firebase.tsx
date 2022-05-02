import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyAmLNW3z9Y7u4vv-3UPlw1ZGIYm6qNSESk",
  authDomain: "okashi-database.firebaseapp.com",
  databaseURL: "https://okashi-database-default-rtdb.firebaseio.com",
  projectId: "okashi-database",
  storageBucket: "okashi-database.appspot.com",
  messagingSenderId: "94642731681",
  appId: "1:94642731681:web:3e6e07c07f3155f5724ee0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export const database = firebase.database();
export default firebaseApp;
