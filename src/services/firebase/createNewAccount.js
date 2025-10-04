import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebaseconfig";
import { doc, setDoc } from "firebase/firestore";
import { createNewProfile } from "./profileServices";

export const createNewAccount = async ({ email, password, name }) => {
  try {

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = userCredential.user.uid;


    await setDoc(doc(db, "users", userId), {
      email,
      name,
      uid: userId,
    });


    await setDoc(doc(db, "users", userId, "mainAccount", "settings"), {
      theme: "light",
      language: "pt-BR",
    });


    await createNewProfile(name);

    return { success: true, uid: userId };
  } catch (error) {
    console.error("Erro ao criar conta:", error);
    throw error;
  }
};
