// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWfe8PVtgtqGfkyNCGEzVw7qRQUXbofwA",
  authDomain: "pcglogin-88188.firebaseapp.com",
  projectId: "pcglogin-88188",
  storageBucket: "pcglogin-88188.firebasestorage.app",
  messagingSenderId: "729800491322",
  appId: "1:729800491322:web:03d14f4af75ac912019003",
  measurementId: "G-8HKSM04QF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);