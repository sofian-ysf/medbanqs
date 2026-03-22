// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMKJDFniyFk8jTV8uP8pVpPMfycAn3xTM",
  authDomain: "mastermla.firebaseapp.com",
  projectId: "mastermla",
  storageBucket: "mastermla.firebasestorage.app",
  messagingSenderId: "222936065603",
  appId: "1:222936065603:web:c49236a34db9f12b19d6f6",
  measurementId: "G-Q2XRYK44W3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Functions
const functions = getFunctions(app);

export { functions };
export const auth = getAuth(app);
export const db = getFirestore(app);