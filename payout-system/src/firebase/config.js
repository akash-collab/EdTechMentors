// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA267J2uTZ9OVvwLqL_nNs_nBhxK6JVhM8",
  authDomain: "edtechpayouts.firebaseapp.com",
  projectId: "edtechpayouts",
  storageBucket: "edtechpayouts.firebasestorage.app",
  messagingSenderId: "783385420810",
  appId: "1:783385420810:web:6e7ec77cb68e596a0debf3",
  measurementId: "G-DN1T21XQZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);