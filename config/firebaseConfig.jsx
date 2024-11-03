// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "inspiro-4e188.firebaseapp.com",
  projectId: "inspiro-4e188",
  storageBucket: "inspiro-4e188.firebasestorage.app",
  messagingSenderId: "99737024092",
  appId: "1:99737024092:web:b43de97f10760bc8fd1899",
  measurementId: "G-P57W53LRW4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);