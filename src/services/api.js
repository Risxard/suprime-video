import axios from "axios";
import { auth } from "./firebase/firebaseconfig";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user) {
    try {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.error("Erro ao pegar token do Firebase:", error);
    }
  } else {
    console.warn("Nenhum usuário logado no momento da requisição.");
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token inválido ou expirado. Redirecionando para login...");
    }
    return Promise.reject(error);
  }
);

export default api;
