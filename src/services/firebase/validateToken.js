import { auth } from "./firebaseconfig";

const validateToken = async (token, userId) => {
  try {

    const user = auth.currentUser;

    if (!user) {
      console.error("Usuário não está autenticado.");
      return false;
    }


    const decodedToken = await user.getIdTokenResult();


    if (decodedToken.claims.user_id === userId) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Erro ao validar token:", error);
    return false;
  }
};

export default validateToken;
