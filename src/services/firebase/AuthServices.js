import {
  signInWithEmailAndPassword,
  signInAnonymously,
  createUserWithEmailAndPassword
} from "firebase/auth";

import { createNewProfile, sendEmailVerificationLink } from "./profileServices";
import { auth, db } from "./firebaseconfig";
import { doc, setDoc } from "firebase/firestore";


let loginUserInProgress = false;
let guestLoginInProgress = false;
let registerUserInProgress = false;


export async function loginUser(email, password) {
  if (loginUserInProgress) {
    console.warn("loginUser: operação já em andamento.");
    return { success: false, error: "Operação já está em andamento." };
  }

  loginUserInProgress = true;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      await sendEmailVerificationLink(user);

      return {
        success: false,
        error: "Seu e-mail ainda não foi verificado. Enviamos um novo link para você.",
        needsVerification: true,
      };
    }

    return { success: true };

  } catch (err) {
    console.error("Erro no login:", err);

    let message = "Não foi possível entrar. Digite seu e-mail e senha novamente.";

    if (err.code === "auth/user-not-found") message = "Usuário não encontrado.";
    if (err.code === "auth/wrong-password") message = "Senha incorreta.";
    if (err.code === "auth/invalid-email") message = "E-mail inválido.";

    return { success: false, error: message };

  } finally {
    loginUserInProgress = false;
  }
}


export async function loginAsGuest() {
  if (guestLoginInProgress) {
    console.warn("loginAsGuest: operação já em andamento.");
    return { success: false, error: "Operação já em andamento." };
  }

  guestLoginInProgress = true;

  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;

    localStorage.removeItem("auth-data");

    return { success: true, user };

  } catch (err) {
    console.error("Erro ao entrar como convidado:", err);

    let message = "Não foi possível entrar como convidado. Tente novamente.";

    if (err.code === "auth/operation-not-allowed") {
      message = "Login anônimo não está habilitado no Firebase.";
    }

    return { success: false, error: message };

  } finally {
    guestLoginInProgress = false;
  }
}

export const registerUser = async ({ email, password, name }) => {
  if (registerUserInProgress) {
    console.warn("registerUser: operação já em andamento.");
    return { success: false, error: "Operação já em andamento." };
  }

  registerUserInProgress = true;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    await setDoc(doc(db, "users", userId), {
      email,
      name,
      uid: userId,
    });

    await setDoc(doc(db, "users", userId, "mainAccount", "settings"), {
      theme: "light",
      language: "pt-BR",
      new_profiles_protection: false,
    });

    await createNewProfile(name);

    return { success: true, uid: userId };

  } catch (error) {
    console.error("Erro ao criar conta:", error);
    return { success: false, error: error.message };

  } finally {
    registerUserInProgress = false;
  }
};
