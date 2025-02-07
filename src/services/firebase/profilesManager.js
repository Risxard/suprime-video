import { doc, setDoc, updateDoc, deleteDoc, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from './firebaseconfig.js';
import { userProfiles } from "../../store/auth/index.js";

// Função para criar um perfil (ou o perfil principal)
const createNewProfile = async (userId, profileName, newImage) => {
    try {
        const userRef = doc(db, "users", userId);
        const profilesRef = collection(userRef, "profiles");

        // Verifica se o usuário já tem perfis
        const querySnapshot = await getDocs(profilesRef);
        const isMainProfileExists = querySnapshot.empty;

        // Busca as preferências principais
        const mainPreferenceRef = doc(db, "users", userId, "mainAccount", "settings");
        const mainPreferenceSnapshot = await getDoc(mainPreferenceRef);

        if (!mainPreferenceSnapshot.exists()) {
            throw new Error("Preferências principais não encontradas!");
        }

        const mainPreferences = mainPreferenceSnapshot.data();

        // Define os dados para o novo perfil com base nas preferências principais
        const newProfile = {
            name: profileName,
            theme: mainPreferences.theme || "light", // Tema padrão, caso não encontrado
            language: mainPreferences.language || "pt-BR", // Linguagem padrão, caso não encontrado
            img:{
                url: newImage ? newImage : "https://m.media-amazon.com/images/G/02/CerberusPrimeVideo-FN38FSBD/adult-2.png"
            },
            watchlist: [],
        };

        if (isMainProfileExists) {
            // Se for o primeiro perfil, marca como principal
            newProfile.isMain = true;
        }

        // Cria o novo perfil
        const profileRef = doc(profilesRef); // Cria um ID único para o perfil
        await setDoc(profileRef, newProfile);

        console.log("Perfil criado com sucesso com base nas preferências principais!");
        return true

    } catch (error) {
        console.error("Erro ao criar perfil:", error.message);
        return false
    }
};

// Função para atualizar um perfil
const updateProfile = async (userId, profileId, updatedPreferences) => {
    try {
        const profileRef = doc(db, "users", userId, "profiles", profileId);
        await updateDoc(profileRef, updatedPreferences);
        console.log("Perfil atualizado com sucesso!");
        return true
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error.message);
        return false
    }
};

// Função para excluir um perfil
const deleteProfile = async (userId, profileId) => {
    try {
        const userRef = doc(db, "users", userId);
        const profilesRef = collection(userRef, "profiles");
        const profileRef = doc(profilesRef, profileId);

        // Verifica se o perfil a ser excluído é o perfil principal
        const profileDoc = await getDoc(profileRef);
        if (!profileDoc.exists()) {
            console.log("Perfil não encontrado.");
            return false;
        }
        const profileData = profileDoc.data();

        if (profileData.isMain) {
            console.log("O perfil principal não pode ser excluído.");
            return false;
        }

        // Exclui o perfil
        await deleteDoc(profileRef);
        console.log("Perfil excluído com sucesso!");
        return true;
    } catch (error) {
        console.error("Erro ao excluir perfil:", error.message);
        return false;
    }
};


const switchCurrentProfile = () =>{

    const allProfiles = localStorage.getItem('@AuthSV:profiles');
}


const getAllProfiles = async (userId, dispatch) => {
    try {
      // Referência ao documento do usuário
      const userRef = doc(db, "users", userId);
  
      // Obtém os dados do usuário
      const userDoc = await getDoc(userRef);
  
      if (!userDoc.exists()) {
        console.error("Usuário não encontrado!");
        return [];
      }
  
      // Extrai os dados do usuário
      const userData = userDoc.data();
      const { name } = userData;
  
      // Referência à coleção de perfis do usuário
      const profilesRef = collection(userRef, "profiles");
  
      // Busca todos os documentos na coleção de perfis
      const querySnapshot = await getDocs(profilesRef);
  
      // Se não houver perfis, cria um novo
      if (querySnapshot.empty) {
        console.warn("Nenhum perfil encontrado para o usuário. Criando perfil padrão...");
        await createNewProfile(userId, name); // Cria um perfil padrão
        return await getAllProfiles(userId, dispatch); // Rechama para obter o novo perfil criado
      }
  
      // Mapeia os documentos retornados para um array de objetos
      const profiles = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  

  
      // Atualiza o Redux
      dispatch(userProfiles({ profiles }));
  
      // Atualiza o localStorage
      localStorage.setItem("@AuthSV:profiles", JSON.stringify(profiles));
  
      return profiles;
    } catch (error) {
      console.error("Erro ao consultar perfis:", error.message);
      throw error; // Repropaga o erro para que o chamador possa tratá-lo
    }
  };







export { createNewProfile, updateProfile, deleteProfile, getAllProfiles }