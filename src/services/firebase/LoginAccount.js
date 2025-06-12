import { useDispatch } from "react-redux";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "./firebaseconfig";
import { loginSuccess } from "../../store/auth/index";

const useLoginAccount = () => {
  const dispatch = useDispatch();
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const login = async (email, password) => {
    try {
      const authUser = await signInWithEmailAndPassword(email, password);

      if (authUser) {
        const token = authUser.user.accessToken;
        const user = authUser.user;

        console.log("Token:", token);
        console.log("User:", user);

        dispatch(loginSuccess({ token, user }));
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err.message);
    }
  };

  return { login, loading, error };
};

export default useLoginAccount;
