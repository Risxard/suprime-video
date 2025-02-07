import { auth } from "./firebaseconfig";

const validateToken = async (token, userId) => {
  try {
    // Atualiza o token e obtém os detalhes do usuário autenticado
    const user = auth.currentUser;

    if (!user) {
      console.error("Usuário não está autenticado.");
      return false;
    }

    // Obtenha o token do usuário atual para validação
    const decodedToken = await user.getIdTokenResult();

    // Valida se o token decodificado corresponde ao ID do usuário fornecido
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
