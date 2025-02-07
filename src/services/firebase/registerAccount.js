import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from './firebaseconfig';
import { doc, setDoc } from 'firebase/firestore';
import { createNewProfile } from './profilesManager'; // Importando a função de criação de perfil

const createNewAccount = async (data) => {
  try {
    const { email, password, name } = data;
    
    // Criação do usuário com email e senha
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Após o usuário ser criado com sucesso, obtém o userId (uid)
    const userId = userCredential.user.uid;

    // Criação do documento do usuário no Firestore com dados básicos
    await setDoc(doc(db, "users", userId), {
      email: email,
      name: name,
    });

    console.log("Conta criada com sucesso!");

    // Criar as preferências principais do usuário (tema e linguagem) no documento do usuário
    await setDoc(doc(db, "users", userId, "mainAccount", "settings"), {
      theme: "light", // Tema inicial
      language: "en-US", // Linguagem inicial
    });

    console.log("Preferências principais criadas com sucesso!");

    // Criação do primeiro perfil (que será o perfil principal)
    await createNewProfile(userId, name); // Chama a função createNewProfile passando userId e o nome do perfil

    console.log("Perfil principal criado com sucesso!");

  } catch (error) {
    console.error("Erro ao criar conta:", error.message);
  }
};

export default createNewAccount;
