// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmn48UXjLEK5SC7vdcVxp7BwcoFY0eoU4",
  authDomain: "forogeeks.firebaseapp.com",
  projectId: "forogeeks",
  storageBucket: "forogeeks.appspot.com",
  messagingSenderId: "976570062947",
  appId: "1:976570062947:web:734f8944c4faff2aa40056"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);