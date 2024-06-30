// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClZrde7eMEfKegH9gMnFwkEwot1e_uf1U",
  authDomain: "test-app-554c2.firebaseapp.com",
  projectId: "test-app-554c2",
  storageBucket: "test-app-554c2.appspot.com",
  messagingSenderId: "737068064835",
  appId: "1:737068064835:web:b90ac25d805ffe7fa074f6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
