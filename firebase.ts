import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRIeticzm60yWEIVTVqO1adSwS3pu3vGY",
  authDomain: "aiverse-e10c8.firebaseapp.com",
  projectId: "aiverse-e10c8",
  storageBucket: "aiverse-e10c8.appspot.com",
  messagingSenderId: "398191736071",
  appId: "1:398191736071:web:f46ce436fa2410e65301a2",
  measurementId: "G-G12WFJSDWV",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
