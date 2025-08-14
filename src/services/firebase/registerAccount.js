import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from './firebaseconfig';
import { doc, setDoc } from 'firebase/firestore';
import { createNewProfile } from './profileServices.js';

const createNewAccount = async (data) => {
  try {
    const { email, password, name } = data;

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const userId = userCredential.user.uid;

    await setDoc(doc(db, "users", userId), {
      email: email,
      name: name,
      uid: userId,
    });

    await setDoc(doc(db, "users", userId, "mainAccount", "settings"), {
      theme: "light",
      language: "pt-BR",
    });

    await createNewProfile(userId, name);
  } catch (error) {
    console.error("Erro ao criar conta:", error.message);
  }
};

export default createNewAccount;
