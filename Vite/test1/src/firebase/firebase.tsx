// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAJ6YmxT0YzclhbFqEC-NYXWu2oS_BvMNs",
//   authDomain: "test-300418.firebaseapp.com",
//   projectId: "test-300418",
//   storageBucket: "test-300418.appspot.com",
//   messagingSenderId: "895455444284",
//   appId: "1:895455444284:web:a5bc53e69bac47fcd87239"
// };

const firebaseConfig = {

  apiKey: "AIzaSyA7pnQ-JZtWqwTU9I-zPw7dPNKkknYeHwk",

  authDomain: "westandtogether-bb280.firebaseapp.com",

  projectId: "westandtogether-bb280",

  storageBucket: "westandtogether-bb280.appspot.com",

  messagingSenderId: "923054864666",

  appId: "1:923054864666:web:9f32a65682b180dda114a3"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const Auth = getAuth(app);

export default app