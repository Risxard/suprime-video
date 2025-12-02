
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseApiKey, firebaseAppId, firebaseMessagingSenderId } from "../config/firebaseEnvs";

const firebaseConfig = {
    apiKey: firebaseApiKey,
    authDomain: "acaiwaveplusapp.firebaseapp.com",
    projectId: "acaiwaveplusapp",
    storageBucket: "acaiwaveplusapp.firebasestorage.app",
    messagingSenderId: firebaseMessagingSenderId,
    appId: firebaseAppId,
    measurementId: "G-08B2SZ7FSH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };