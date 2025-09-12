import { doc, setDoc, updateDoc, deleteDoc, collection, getDocs, getDoc, getFirestore } from "firebase/firestore";
import { db } from './firebaseconfig.js';
import { setCurrentProfile, setCurrentWatchlist, userProfiles } from "../../store/auth/index.js";
import { deleteUser, getAuth, reauthenticateWithCredential, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { current } from "@reduxjs/toolkit";
import api from '../api.js';
import { userServices } from "./userServices.js";

const createNewProfile = async (name, imgUrl) => {
    if (!name) {
        alert("Nome do perfil é obrigatório");
        return false;
    }

    try {
        const data = { name: name, imgUrl: imgUrl || null };

        await profileService.create(data);

        return true;
    } catch (error) {
        if (error.response) {
            alert(error.response.data.message);
        } else {
            alert("Ocorreu um erro ao criar o perfil");
        }
        return false;
    }
};



const deleteProfile = async (userId, profileId, currentProfile, dispatch) => {
    try {
        const userRef = doc(db, "users", userId);
        const profilesRef = collection(userRef, "profiles");
        const profileRef = doc(profilesRef, profileId);

        const profileDoc = await getDoc(profileRef);
        if (!profileDoc.exists()) {
            return false;
        }
        const profileData = profileDoc.data();

        if (profileData.isMain) {
            return false;
        }

        if (currentProfile && currentProfile.id === profileId) {
            localStorage.removeItem("@AuthSV:currentProfile");
            dispatch(setCurrentProfile(null));
        }

        await deleteDoc(profileRef);
        return true;
    } catch (error) {
        return false;
    }
};

const getAllProfiles = async (dispatch) => {
    try {
        const profiles = await profileService.getAll();
        if (!profiles) return [];

        dispatch(userProfiles({ profiles }));
        localStorage.setItem("@AuthSV:profiles", JSON.stringify(profiles));

        return profiles;
    } catch (error) {
        console.error("Erro ao buscar perfis:", error);
        throw error;
    }
};


const getWatchlist = async (profileId, dispatch) => {
    try {
        const data = await profileService.getWatchlist(profileId);
        if (!data) return false;

        dispatch(setCurrentWatchlist(data));

        return data;
    } catch (error) {
        return false;
    }
};


const updateWatchlist = async (profileId, mediaType, mediaId, action, dispatch) => {
    try {
        const updatedProfile = await profileService.updateWatchlist(profileId, {
            type: mediaType,
            itemId: mediaId,
            action: action,
        });

        if (!updatedProfile) return false;

        if (dispatch) {
            await getWatchlist(profileId, dispatch);
        }

        return true;
    } catch (error) {
        return false;
    }
};



const updateProfile = async (profileId, updatedPreferences) => {
    try {
        await profileService.update(profileId, {
            userInfoData: updatedPreferences
        });
        return true;
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        return false;
    }
};


const updateProfileLanguage = async (profileId, language, dispatch) => {
    try {

        const langUpdated = await profileService.update(profileId, {
            "userInfoData.language": language
        });

        if (langUpdated && dispatch) {
            const profiles = await getAllProfiles(dispatch);
            const updatedProfile = profiles.find((p) => p.id === profileId);
            if (updatedProfile) {
                dispatch(setCurrentProfile(updatedProfile));
            }
        }

        return true;
    } catch (error) {
        console.error("Erro ao atualizar linguagem:", error);
        return false;
    }
};


const nameAccountUpdate = async (userId, newName) => {
    try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, { name: newName });
        return true;
    } catch (error) {
        return false;
    }
}

const sendResetPasswordEmail = async (email) => {
    const auth = getAuth();
    try {
        await sendPasswordResetEmail(auth, email, {
            url: "https://richardsonsouza.com/preview/acaiwaveplus",
            handleCodeInApp: false,
        });

    } catch (error) {
        throw error;
    }
};


const sendEmailVerificationLink = async (user) => {
    if (!user) {
        return false;
    }

    try {
        await sendEmailVerification(user, {
            url: "https://richardsonsouza.com/preview/acaiwaveplus",
            handleCodeInApp: false,
        });

        return true;
    } catch (error) {
        return false;
    }
};


export const profileService = {
    getAll: async () => {
        const { data } = await api.get("/api/profiles");
        return data;
    },

    getById: async (profileId) => {
        const { data } = await api.get(`/api/profiles/${profileId}`);
        return data;
    },

    create: async (body) => {
        const { data } = await api.post("/api/profiles", body);
        return data;
    },

    update: async (profileId, updates) => {
        const { data } = await api.patch(`/api/profiles/${profileId}`, updates);
        return data;
    },

    remove: async (profileId) => {
        const { data } = await api.delete(`/api/profiles/${profileId}`);
        return data;
    },

    getWatchlist: async (profileId) => {
        const { data } = await api.get(`/api/profiles/${profileId}/watchlist`);
        return data;
    },

    updateWatchlist: async (profileId, payload) => {
        const { data } = await api.patch(`/api/profiles/${profileId}/watchlist`, payload);
        return data;
    },
};



export {
    createNewProfile,
    updateProfile,
    deleteProfile,
    getAllProfiles,
    getWatchlist,
    updateWatchlist,
    updateProfileLanguage,
    nameAccountUpdate,
    sendResetPasswordEmail,
    sendEmailVerificationLink,
}
