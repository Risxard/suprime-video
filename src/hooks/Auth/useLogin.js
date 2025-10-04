import { useState } from "react";
import { auth } from "../../services/firebase/firebaseconfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      return userCredential.user;
    } catch (err) {
      setLoading(false);

      if (err.code === "auth/user-not-found") {
        throw { code: "auth/user-not-found", message: "Usuário não encontrado" };
      } else if (err.code === "auth/wrong-password") {
        throw { code: "auth/wrong-password", message: "Senha incorreta" };
      } else if (err.code === "auth/too-many-requests") {
        throw { code: "auth/too-many-requests", message: "Muitas tentativas. Tente mais tarde." };
      } else {
        throw { code: err.code || "auth/unknown", message: err.message || "Erro desconhecido" };
      }
    }
  };

  const signUp = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      return userCredential.user;
    } catch (err) {
      setLoading(false);

      if (err.code === "auth/email-already-in-use") {
        throw { code: err.code, message: "Este email já está em uso" };
      } else if (err.code === "auth/weak-password") {
        throw { code: err.code, message: "Senha muito fraca" };
      } else {
        throw { code: err.code || "auth/unknown", message: err.message || "Erro desconhecido" };
      }
    }
  };

  return { login, signUp, loading };
};

export default useLogin;
