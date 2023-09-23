// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-auth-b19db.firebaseapp.com",
    projectId: "mern-auth-b19db",
    storageBucket: "mern-auth-b19db.appspot.com",
    messagingSenderId: "694518444208",
    appId: "1:694518444208:web:52140b0276327f0d140b75"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);