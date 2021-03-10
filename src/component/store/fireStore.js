import firebase from "firebase/app";
import 'firebase/auth';
import "firebase/firestore";
import "firebase/storage";

const fbConfig = {
  apiKey: "AIzaSyBwK8X-hhD19OhO3lQ_mh3u3hzsF_OK9i0",
  authDomain: "gtj-portfolio-board.firebaseapp.com",
  databaseURL: "https://gtj-portfolio-board-default-rtdb.firebaseio.com",
  projectId: "gtj-portfolio-board",
  storageBucket: "gtj-portfolio-board.appspot.com",
  messagingSenderId: "480993912995",
  appId: "1:480993912995:web:e6f46a40a2b556e7f37716",
  measurementId: "G-Z2Z053PQZX"
};

firebase.initializeApp(fbConfig);

const firestore = firebase;

export default { firestore };
