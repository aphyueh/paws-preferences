import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAyXXjNV9uZxH4OPTmXnvA6zN-h_he7Xic",
  authDomain: "paws-preferences.firebaseapp.com",
  projectId: "paws-preferences",
  storageBucket: "paws-preferences.firebasestorage.app",
  messagingSenderId: "624501647822",
  appId: "1:624501647822:web:35fd1eb8f18009818f639f",
  measurementId: "G-DWVZ4CR9QC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
