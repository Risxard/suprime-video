
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseApiKey } from "../guestApi";

const firebaseConfig = {
    apiKey: firebaseApiKey,
    authDomain: "suprimevideo-auth.firebaseapp.com",
    projectId: "suprimevideo-auth",
    storageBucket: "suprimevideo-auth.firebasestorage.app",
    messagingSenderId: "545202694087",
    appId: "1:545202694087:web:9483e641cf15ae65669be2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };