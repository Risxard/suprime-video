import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../firebaseconfig";
import { loginSuccess, logout } from "../../../store/auth";

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      
      if (user) {
        const isGuest = user.isAnonymous === true;
        const isVerifiedUser = user.emailVerified === true;

        if (isGuest || isVerifiedUser) {
          const token = await user.getIdToken();
          dispatch(loginSuccess({ user, token }));
          return;
        }
      }

      dispatch(logout());
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default AuthListener;
