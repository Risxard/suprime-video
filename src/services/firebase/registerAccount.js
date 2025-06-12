import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from './firebaseconfig';
import { doc, setDoc } from 'firebase/firestore';
import { createNewProfile } from './profilesManager';

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

    console.log("Conta criada com sucesso!");


    await setDoc(doc(db, "users", userId, "mainAccount", "settings"), {
      theme: "light",
      language: "en-US",
    });

    console.log("Preferências principais criadas com sucesso!");


    await createNewProfile(userId, name); 

    console.log("Perfil principal criado com sucesso!");

  } catch (error) {
    console.error("Erro ao criar conta:", error.message);
  }
};

export default createNewAccount;
