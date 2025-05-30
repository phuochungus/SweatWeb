import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPSfax7Gsfabm_kNS4-KkFv8pXs_XmQGs",
  authDomain: "sweat-1f376.firebaseapp.com",
  databaseURL:
    "https://sweat-1f376-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sweat-1f376",
  storageBucket: "sweat-1f376.firebasestorage.app",
  messagingSenderId: "723738255512",
  appId: "1:723738255512:web:4f13a69452fb9038a3b0ed",
  measurementId: "G-E6SNJ3VBRT",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
