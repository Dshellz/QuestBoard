// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZDTwbvpnhTaqoI4BOpW8uMAm09HciK88",
  authDomain: "questbboard.firebaseapp.com",
  databaseURL: "https://questbboard-default-rtdb.firebaseio.com",
  projectId: "questbboard",
  storageBucket: "questbboard.firebasestorage.app",
  messagingSenderId: "630451270336",
  appId: "1:630451270336:web:68c8a3fa126f4c1dbe3325",
  measurementId: "G-39ZCX3J1FL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
