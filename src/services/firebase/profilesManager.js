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
            userInfoData: {
                name: profileName,
                theme: mainPreferences.theme || "light", // Tema padrão, caso não encontrado
                language: mainPreferences.language || "pt-BR", // Linguagem padrão, caso não encontrado
                img: {
                    url: newImage ? newImage : "https://m.media-amazon.com/images/G/02/CerberusPrimeVideo-FN38FSBD/adult-2.png"
                },
            },
            watchlist: {
                movie: [],
                tv: []
            },
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
        const profilesRef = collection(db, "users", userId, "profiles");

        // Busca todos os documentos na coleção de perfis
        const querySnapshot = await getDocs(profilesRef);

        // Se não houver perfis, cria um novo
        if (querySnapshot.empty) {
            console.warn("Nenhum perfil encontrado para o usuário. Criando perfil padrão...");
            await createNewProfile(userId, name); // Cria um perfil padrão
            return await getAllProfiles(userId, dispatch); // Rechama para obter o novo perfil criado
        }

        // Mapeia os documentos retornados para um array de objetos
        const profiles = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                userInfoData: data.userInfoData,
            };
        });

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


const getWatchlist = async (userId, profileId) => {
    try {
        const profileRef = doc(db, "users", userId, "profiles", profileId);
        const profileDoc = await getDoc(profileRef);

        if (!profileDoc.exists()) {
            console.error("Perfil não encontrado!");
            return null;
        }

        const profileData = profileDoc.data();
        const watchlist = profileData.watchlist || { movie: [], tv: [] };

        console.log("Watchlist obtida com sucesso!");
        return watchlist;
    } catch (error) {
        console.error("Erro ao obter watchlist:", error.message);
        return null;
    }
};


const addToWatchlist = async (userId, profileId, mediaType, mediaId) => {
    try {
        const profileRef = doc(db, "users", userId, "profiles", profileId);
        const profileDoc = await getDoc(profileRef);

        if (!profileDoc.exists()) {
            console.error("Perfil não encontrado!");
            return false;
        }

        const profileData = profileDoc.data();
        const watchlist = profileData.watchlist || { movie: [], tv: [] };

        if (!watchlist[mediaType]) {
            console.error("Tipo de mídia inválido!");
            return false;
        }

        const mediaIndex = watchlist[mediaType].indexOf(mediaId);
        if (mediaIndex === -1) {
            watchlist[mediaType].push(mediaId);
            console.log("Item adicionado à watchlist com sucesso!");
        } else {
            watchlist[mediaType].splice(mediaIndex, 1);
            console.log("Item removido da watchlist com sucesso!");
        }

        await updateDoc(profileRef, { watchlist });
        return true;
    } catch (error) {
        console.error("Erro ao atualizar watchlist:", error.message);
        return false;
    }
};







// Função para atualizar um perfil
const updateProfile = async (userId, profileId, updatedPreferences) => {
    try {
        const profileRef = doc(db, "users", userId, "profiles", profileId);
        const profileDoc = await getDoc(profileRef);

        if (!profileDoc.exists()) {
            console.error("Perfil não encontrado!");
            return false;
        }

        const profileData = profileDoc.data();
        const updatedUserInfoData = {
            ...profileData.userInfoData,
            ...updatedPreferences
        };

        await updateDoc(profileRef, { userInfoData: updatedUserInfoData });
        console.log("Perfil atualizado com sucesso!");
        return true;
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error.message);
        return false;
    }
};





export { createNewProfile, updateProfile, deleteProfile, getAllProfiles, getWatchlist, addToWatchlist }