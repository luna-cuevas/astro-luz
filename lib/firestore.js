import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgJeovU6r_yeCN2pKDIPSOq90q0XMPYMs",
  authDomain: "astro-luz.firebaseapp.com",
  projectId: "astro-luz",
  storageBucket: "astro-luz.appspot.com",
  messagingSenderId: "212975089958",
  appId: "1:212975089958:web:122fd6153511037c0c69e7",
  measurementId: "G-TE5FB4T4YT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
