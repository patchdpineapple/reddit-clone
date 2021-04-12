import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDdjoirle2eI_UIiF5l7QR6SP6g6CdSAVQ",
  authDomain: "thehub-reddit-clone.firebaseapp.com",
  projectId: "thehub-reddit-clone",
  storageBucket: "thehub-reddit-clone.appspot.com",
  messagingSenderId: "81917814362",
  appId: "1:81917814362:web:4803298807e4ac746b9a63",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage};