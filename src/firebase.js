// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3CRA7mMoa4tqdqa3Ckv8pjDtS34VLZGI",
  authDomain: "robo-trivia-multiplayer.firebaseapp.com",
  projectId: "robo-trivia-multiplayer",
  storageBucket: "robo-trivia-multiplayer.appspot.com",
  messagingSenderId: "744498971587",
  appId: "1:744498971587:web:b70e0e35ac3a54df083376"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;