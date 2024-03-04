// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo04f5uIFmKJMIdbFLV78eFAecnd3J2sw",
  authDomain: "employmanage-5402b.firebaseapp.com",
  projectId: "employmanage-5402b",
  storageBucket: "employmanage-5402b.appspot.com",
  messagingSenderId: "990272189384",
  appId: "1:990272189384:web:5ccd653f7201adb4bd06fd"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const  store = getFirestore(app)
export  const database = getAuth();

