// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrE0EZOfr2i_pdX0T6Uk4jMSPTu3fZdKw",
  authDomain: "houseworth-115cd.firebaseapp.com",
  projectId: "houseworth-115cd",
  storageBucket: "houseworth-115cd.firebasestorage.app",
  messagingSenderId: "530296202401",
  appId: "1:530296202401:web:0b6d87a9e9d0b668cb7ce0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
