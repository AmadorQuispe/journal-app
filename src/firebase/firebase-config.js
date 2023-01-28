// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_VKonSN2E3WdzLvWx9j50c0Ci6OHgREM",
  authDomain: "journalapp-f1758.firebaseapp.com",
  projectId: "journalapp-f1758",
  storageBucket: "journalapp-f1758.appspot.com",
  messagingSenderId: "92812229681",
  appId: "1:92812229681:web:458e289782ac9a1b97a910",
  measurementId: "G-RYNF7RYN23"
};


const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

const db = getFirestore(firebaseApp);

export {
    db,
    googleProvider
}