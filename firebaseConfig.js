// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZKRDbcfMtd6LGDMmgblXGHe2wg-T_Wdw",
  authDomain: "zen-life-8adb5.firebaseapp.com",
  projectId: "zen-life-8adb5",
  storageBucket: "zen-life-8adb5.firebasestorage.app",
  messagingSenderId: "235069956114",
  appId: "1:235069956114:web:dcda04aaf0e6ff5e54b8cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

