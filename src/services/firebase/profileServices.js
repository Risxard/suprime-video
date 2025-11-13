import {
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    collection,
    getDocs,
    getDoc
} from "firebase/firestore";
import {
    setCurrentProfile,
    userProfiles
} from "../../store/auth/index.js";
import { sendEmailVerification, sendPasswordResetEmail, } from "firebase/auth";
import { auth, db } from "./firebaseconfig.js";


export const profileService = {

    getAll: async () => {
        const uid = auth.currentUser?.uid;
        if (!uid) throw new Error("Usuário não autenticado");

        const profilesRef = collection(db, "users", uid, "profiles");
        const snapshot = await getDocs(profilesRef);

        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },


    getById: async (profileId) => {
        const uid = auth.currentUser?.uid;
        if (!uid) throw new Error("Usuário não autenticado");

        const profileRef = doc(db, "users", uid, "profiles", profileId);
        const snap = await getDoc(profileRef);

        if (!snap.exists()) return null;
        return { id: snap.id, ...snap.data() };
    },


    create: async ({ name, imgUrl }) => {
        const uid = auth.currentUser?.uid;
        if (!uid) throw new Error("Usuário não autenticado");

        const profilesRef = collection(db, "users", uid, "profiles");
        const snapshot = await getDocs(profilesRef);
        if (snapshot.size >= 5) {
            throw new Error("Número máximo de perfis (5) atingido");
        }

        const newDoc = doc(profilesRef);
        const profileData = {
            id: newDoc.id,
            userInfoData: {
                name,
                theme: "light",
                language: "pt-BR",
                img: {
                    url:
                        imgUrl ||
                        "https://m.media-amazon.com/images/G/02/CerberusPrimeVideo-FN38FSBD/adult-2.png"
                }
            },
            watchlist: []
        };


        await setDoc(newDoc, profileData);
        return profileData;
    },


    update: async (profileId, updates) => {
        const uid = auth.currentUser?.uid;
        if (!uid) throw new Error("Usuário não autenticado");

        const profileRef = doc(db, "users", uid, "profiles", profileId);
        await updateDoc(profileRef, updates);

        const snap = await getDoc(profileRef);
        return { id: snap.id, ...snap.data() };
    },


    remove: async (profileId) => {
        const uid = auth.currentUser?.uid;
        if (!uid) throw new Error("Usuário não autenticado");

        const profileRef = doc(db, "users", uid, "profiles", profileId);
        const snap = await getDoc(profileRef);

        if (!snap.exists()) throw new Error("Perfil não encontrado");
        const data = snap.data();
        if (data.isMain) throw new Error("Não é permitido deletar o perfil principal");

        await deleteDoc(profileRef);
        return { message: "Perfil deletado com sucesso" };
    },


    getWatchlist: async (profileId) => {
        const uid = auth.currentUser?.uid;
        if (!uid) throw new Error("Usuário não autenticado");

        const profileRef = doc(db, "users", uid, "profiles", profileId);
        const snap = await getDoc(profileRef);
        if (!snap.exists()) return [];

        const data = snap.data();
        return data.watchlist || [];
    },


    updateWatchlist: async (profileId, { itemId, mediaType, action }) => {
        const uid = auth.currentUser?.uid;
        if (!uid) throw new Error("Usuário não autenticado");

        const profileRef = doc(db, "users", uid, "profiles", profileId);
        const snap = await getDoc(profileRef);
        if (!snap.exists()) throw new Error("Perfil não encontrado");

        const data = snap.data();


        let currentList = [];

        if (Array.isArray(data.watchlist)) {

            currentList = data.watchlist;
        } else if (data.watchlist && typeof data.watchlist === "object") {

            currentList = [
                ...(data.watchlist.movie || []).map((id) => ({
                    id,
                    media_type: "movie",
                })),
                ...(data.watchlist.tv || []).map((id) => ({
                    id,
                    media_type: "tv",
                })),
            ];
        }


        let updatedList;

        if (action === "add") {
            const exists = currentList.some(
                (item) => item.id === itemId && item.media_type === mediaType
            );

            updatedList = exists
                ? currentList
                : [...currentList, { id: itemId, media_type: mediaType }];
        } else {
            updatedList = currentList.filter(
                (item) => !(item.id === itemId && item.media_type === mediaType)
            );
        }

        await updateDoc(profileRef, { watchlist: updatedList });

        return { code: 200, message: "Watchlist atualizada com sucesso" };
    },


};


export const createNewProfile = async (name, imgUrl) => {
    if (!name) {
        alert("Nome do perfil é obrigatório");
        return false;
    }

    try {
        await profileService.create({ name, imgUrl });
        return true;
    } catch (error) {
        alert(error.message || "Ocorreu um erro ao criar o perfil");
        return false;
    }
};

export const deleteProfile = async (profileId, currentProfile, dispatch) => {
    try {
        const profile = await profileService.getById(profileId);
        if (!profile) return false;
        if (profile.isMain) return false;

        if (currentProfile && currentProfile.id === profileId) {
            localStorage.removeItem("@AuthSV:currentProfile");
            dispatch(setCurrentProfile(null));
        }

        await profileService.remove(profileId);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const getAllProfiles = async (dispatch) => {
    try {
        const profiles = await profileService.getAll();
        if (!profiles) return [];

        dispatch(userProfiles({ profiles }));
        localStorage.setItem("@AuthSV:profiles", JSON.stringify(profiles));
        return profiles;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getWatchlist = async (profileId, dispatch) => {
    try {
        const data = await profileService.getWatchlist(profileId);
        if (!data) return false;

        return data;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const updateWatchlist = async (profileId, mediaType, mediaId, action, dispatch) => {
    try {
        await profileService.updateWatchlist(profileId, {
            itemId: mediaId,
            mediaType,
            action
        });

        if (dispatch) {
            await getWatchlist(profileId, dispatch);
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};


export const updateProfile = async (profileId, updatedPreferences) => {
    try {
        await profileService.update(profileId, { userInfoData: updatedPreferences });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const updateProfileLanguage = async (profileId, language, dispatch) => {
    try {
        await profileService.update(profileId, { "userInfoData.language": language });

        if (dispatch) {
            const profiles = await getAllProfiles(dispatch);
            const updatedProfile = profiles.find((p) => p.id === profileId);
            if (updatedProfile) dispatch(setCurrentProfile(updatedProfile));
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const nameAccountUpdate = async (userId, newName) => {
    try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, { name: newName });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};




export const sendResetPasswordEmail = async (email) => {
    if (!email) {
        console.error("E-mail não fornecido para redefinição de senha.");
        return false;
    }

    try {
        await sendPasswordResetEmail(auth, email, {
            url: "https://richardsonsouza.com/preview/acaiwaveplus",
            handleCodeInApp: false,
        });
        return true;
    } catch (error) {
        console.error("Erro ao enviar e-mail de redefinição:", error);
        return false;
    }
};



export const sendEmailVerificationLink = async (user) => {
    if (!user) return false;
    try {
        await sendEmailVerification(user, {
            url: "https://richardsonsouza.com/preview/acaiwaveplus",
            handleCodeInApp: false
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};



const deleteDocumentRecursively = async (docRef) => {
    const subCollections = await listCollections(docRef);
    for (const subCol of subCollections) {
        await deleteCollectionRecursively(subCol);
    }


    await deleteDoc(docRef);
};

const deleteCollectionRecursively = async (colRef) => {
    const snapshot = await getDocs(colRef);

    for (const docSnap of snapshot.docs) {
        await deleteDocumentRecursively(docSnap.ref);
    }
};

export const deleteUserAccountAndData = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Nenhum usuário logado.");

    const uid = user.uid;
    const userDocRef = doc(db, "users", uid);

    try {
        await deleteDocumentRecursively(userDocRef);

        await deleteUser(user);

    } catch (err) {
        console.error("Erro ao deletar conta e dados:", err);
        throw err;
    }
}; 