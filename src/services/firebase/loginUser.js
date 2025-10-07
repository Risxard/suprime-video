import { signInWithEmailAndPassword } from "firebase/auth";
import { sendEmailVerificationLink } from "./profileServices";
import { auth } from "./firebaseconfig";

/**
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
