import { useDispatch } from "react-redux";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase/firebaseconfig";
import { loginSuccess } from "../../store/auth/index";
import { getAllProfiles, sendEmailVerificationLink } from "../../services/firebase/profileServices";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);

  const login = async (email, password) => {
    try {
      const authUser = await signInWithEmailAndPassword(email, password);

      if (authUser) {
        const user = authUser.user;

        if (!user.emailVerified) {
          await sendEmailVerificationLink(user);
          await auth.signOut();
          navigate("/verify");
          return;
        }

        const token = user.accessToken;




        await getAllProfiles(dispatch);
        dispatch(loginSuccess({ token, user }));
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err.message);
    }
  };

  return { login, loading, error };
};

export default useLogin;
