// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHyMMkg5nZrq5yOj3I03cdxOaogc2vN3g",
  authDomain: "dailytasks-1dd1d.firebaseapp.com",
  projectId: "dailytasks-1dd1d",
  storageBucket: "dailytasks-1dd1d.appspot.com",
  messagingSenderId: "947206195499",
  appId: "1:947206195499:web:9d5a36f38c49669111dd6e",
  measurementId: "G-KEX4ENVDPZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);