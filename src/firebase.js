import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6DLvUe9egkXruosTJwyksUabkEXcNbVM",
  authDomain: "react-chat-app-7f978.firebaseapp.com",
  projectId: "react-chat-app-7f978",
  storageBucket: "react-chat-app-7f978.appspot.com",
  messagingSenderId: "712253286467",
  appId: "1:712253286467:web:003ed360da4452e24accf6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
