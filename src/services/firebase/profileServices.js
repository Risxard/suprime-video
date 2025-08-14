import { doc, setDoc, updateDoc, deleteDoc, collection, getDocs, getDoc, getFirestore } from "firebase/firestore";
import { db } from './firebaseconfig.js';
import { setCurrentProfile, setCurrentWatchlist, userProfiles } from "../../store/auth/index.js";
import { deleteUser, getAuth, reauthenticateWithCredential, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { current } from "@reduxjs/toolkit";
import api from '../api.js';
import { userServices } from "./userServices.js";

const createNewProfile = async (userId, profileName, newImage) => {
    try {
        const userRef = doc(db, "users", userId);
        const profilesRef = collection(userRef, "profiles");


        const querySnapshot = await getDocs(profilesRef);
        const isMainProfileExists = querySnapshot.empty;

        const mainPreferenceRef = doc(db, "users", userId, "mainAccount", "settings");
        const mainPreferenceSnapshot = await getDoc(mainPreferenceRef);

        if (!mainPreferenceSnapshot.exists()) {
            throw new Error("");
        }

        const mainPreferences = mainPreferenceSnapshot.data();

        const newProfile = {
            userInfoData: {
                name: profileName,
                theme: mainPreferences.theme || "light",
                language: mainPreferences.language || "pt-BR",
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
            newProfile.isMain = true;
        }

        const profileRef = doc(profilesRef);
        await setDoc(profileRef, newProfile);

        return true

    } catch (error) {
        return false
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

const getUserData = async () => {
    const userDoc = await userServices.getUserData();
    if (!userDoc) return null;
    return userDoc;
};


const getProfileById = async (profileId) => {
    try {
        const data = await profileService.getById(profileId);

        return data;
    } catch (err) {
        console.error("Erro ao buscar perfil:", err);
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



const updateProfile = async (userId, profileId, updatedPreferences) => {
    try {
        const profileRef = doc(db, "users", userId, "profiles", profileId);
        const profileDoc = await getDoc(profileRef);

        if (!profileDoc.exists()) {
            return false;
        }

        const profileData = profileDoc.data();
        const updatedUserInfoData = {
            ...profileData.userInfoData,
            ...updatedPreferences
        };

        await updateDoc(profileRef, { userInfoData: updatedUserInfoData });
        return true;
    } catch (error) {
        return false;
    }
};

const updateProfileLanguage = async (userId, profileId, newLanguage, dispatch) => {
    try {
        const profile = await fetchProfile(profileId);
        if (!profile) return false;



        const updatedUserInfoData = {
            ...profile.data.userInfoData,
            language: newLanguage,
        };

        await updateDoc(profile.ref, { userInfoData: updatedUserInfoData });

        if (dispatch) {
            const profiles = await getAllProfiles(userId, dispatch);
            const updatedProfile = profiles.find((p) => p.id === profileId);
            if (updatedProfile) {
                dispatch(setCurrentProfile(updatedProfile));
            }
        }

        return true;
    } catch (error) {
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
        const { data } = await api.get("/profiles");
        return data;
    },

    getById: async (profileId) => {
        const { data } = await api.get(`/profiles/${profileId}`);
        return data;
    },

    create: async (profile) => {
        const { data } = await api.post("/profiles", profile);
        return data;
    },

    update: async (profileId, updates) => {
        const { data } = await api.patch(`/profiles/${profileId}`, updates);
        return data;
    },

    remove: async (profileId) => {
        const { data } = await api.delete(`/profiles/${profileId}`);
        return data;
    },

    getWatchlist: async (profileId) => {
        const { data } = await api.get(`/profiles/${profileId}/watchlist`);
        return data;
    },

    updateWatchlist: async (profileId, payload) => {
        const { data } = await api.patch(`/profiles/${profileId}/watchlist`, payload);
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
