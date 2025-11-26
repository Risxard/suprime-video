import {
  signInWithEmailAndPassword,
  signInAnonymously
} from "firebase/auth";

import { sendEmailVerificationLink } from "./profileServices";
import { auth } from "./firebaseconfig";

/**
 * Login comum com email e senha
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, error?: string, needsVerification?: boolean}>}
 */
export async function loginUser(email, password) {
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

    let message =
      "Não foi possível entrar. Digite seu e-mail e senha novamente ou redefina sua senha.";

    if (err.code === "auth/user-not-found") {
      message = "Usuário não encontrado. Verifique o e-mail informado.";
    } else if (err.code === "auth/wrong-password") {
      message = "Senha incorreta. Tente novamente.";
    } else if (err.code === "auth/invalid-email") {
      message = "E-mail inválido. Digite novamente.";
    }

    return { success: false, error: message };
  }
}

/**
 * Login anônimo (convidado)
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */
export async function loginAsGuest() {
  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;
    
    localStorage.removeItem("auth-data");

    return { success: true, user };


  } catch (err) {
    console.error("Erro ao entrar como convidado:", err);

    let message = "Não foi possível entrar como convidado. Tente novamente.";

    if (err.code === "auth/operation-not-allowed") {
      message = "Login anônimo não está habilitado no Firebase Authentication.";
    }

    return { success: false, error: message };
  }
}
