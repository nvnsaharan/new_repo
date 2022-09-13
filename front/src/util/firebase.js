import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyD4KSaydS9bbM2pPfmFFijtJdeINQr1zok",
  authDomain: "collegetrendd.firebaseapp.com",
  projectId: "collegetrendd",
  storageBucket: "collegetrendd.appspot.com",
  messagingSenderId: "111684000894",
  appId: "1:111684000894:web:c19add6dabc16e9a680c2f",
  measurementId: "G-DRQH8W26ZR"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
