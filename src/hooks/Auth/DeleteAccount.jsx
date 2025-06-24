import { useState } from "react";
import {
  getAuth,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { logout } from "../../store/auth";

const useDeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loggout = async () => {
    await auth.signOut();
    dispatch(logout());
  };

  const deleteAccount = async (password) => {
    setLoading(true);
    setError("");

    const auth = getAuth();
    const db = getFirestore();
    const user = auth.currentUser;

    if (!user) {
      setError("Usuário não autenticado.");
      setLoading(false);
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);

      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);
      await loggout();

      return true;
    } catch (err) {
      if (err.code === "auth/requires-recent-login") {
        setError("É necessário reautenticar.");
      } else {
        setError("Erro: " + err.message);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteAccount,
    loading,
    error,
    setError,
  };
};

export default useDeleteAccount;
