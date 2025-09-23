
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseApiKey, firebaseAppId, firebaseMessagingSenderId } from "../firebaseEnvs";

const firebaseConfig = {
    apiKey: firebaseApiKey,
    authDomain: "acaiwaveplus-f99c3.firebaseapp.com",
    projectId: "acaiwaveplus-f99c3",
    storageBucket: "acaiwaveplus-f99c3.firebasestorage.app",
    messagingSenderId: firebaseMessagingSenderId,
    appId: firebaseAppId
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };