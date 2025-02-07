import { useDispatch } from "react-redux";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "../../services/firebase/firebaseconfig";
import { loginSuccess } from "../../store/auth/index";

import { doc, setDoc, updateDoc, deleteDoc, collection, getDocs, getDoc } from "firebase/firestore";
import { getAllProfiles } from "../../services/firebase/profilesManager.js";



const useLogin = () => {
    const dispatch = useDispatch();
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

    const login = async (email, password) => {
        try {
            const authUser = await signInWithEmailAndPassword(email, password);

            if (authUser) {
                const token = authUser.user.accessToken;
                const user = authUser.user;

                await getAllProfiles(authUser.user.uid, dispatch);
                
                dispatch(loginSuccess({ token, user }));
            }
        } catch (err) {
            console.error("Erro ao fazer login:", err.message);
        }
    };

    return { login, loading, error };
};

export default useLogin;
