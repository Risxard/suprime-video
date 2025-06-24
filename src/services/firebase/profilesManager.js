import { doc, setDoc, updateDoc, deleteDoc, collection, getDocs, getDoc, getFirestore } from "firebase/firestore";
import { db } from './firebaseconfig.js';
import { setCurrentProfile, setCurrentWatchlist, userProfiles } from "../../store/auth/index.js";
import { deleteUser, getAuth, reauthenticateWithCredential, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { current } from "@reduxjs/toolkit";

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

const fetchUser = async (userId) => {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) return null;
    return userDoc.data();
};


const fetchProfiles = async (userId) => {
    const profilesRef = collection(db, "users", userId, "profiles");
    const querySnapshot = await getDocs(profilesRef);

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        userInfoData: doc.data().userInfoData,
    }));
};

const fetchProfile = async (userId, profileId) => {
    try {
        const profileRef = doc(db, "users", userId, "profiles", profileId);
        const profileDoc = await getDoc(profileRef);
        if (!profileDoc.exists()) return null;
        return { ref: profileRef, data: profileDoc.data() };
    } catch (error) {
        return null;
    }
};

const getProfileWatchlist = (profileData) => {
    return profileData?.data?.watchlist || { movie: [], tv: [] };
};

const ensureAtLeastOneProfile = async (userId, name) => {
    let profiles = await fetchProfiles(userId);
    if (profiles.length === 0) {
        await createNewProfile(userId, name);
        profiles = await fetchProfiles(userId);
    }
    return profiles;
};


const getAllProfiles = async (userId, dispatch) => {
    try {
        const userData = await fetchUser(userId);
        if (!userData) return [];

        const profiles = await ensureAtLeastOneProfile(userId, userData.name);

        dispatch(userProfiles({ profiles }));
        localStorage.setItem("@AuthSV:profiles", JSON.stringify(profiles));

        return profiles;
    } catch (error) {
        throw error;
    }
};

const getWatchlist = async (userId, profileId, dispatch) => {
    try {
        const profileData = await fetchProfile(userId, profileId);
        if (!profileData) return false;

        const watchlist = getProfileWatchlist(profileData);
        dispatch(setCurrentWatchlist(watchlist));

        return watchlist;
    } catch (error) {
        return false;
    }
};

const toggleMediaInWatchlist = (watchlist, mediaType, mediaId) => {
    const list = watchlist[mediaType] || [];
    const index = list.indexOf(mediaId);

    if (index === -1) {
        list.push(mediaId);
    } else {
        list.splice(index, 1);
    }

    return {
        ...watchlist,
        [mediaType]: list
    };
};

const addToWatchlist = async (userId, profileId, mediaType, mediaId, dispatch) => {
    try {
        const profile = await fetchProfile(userId, profileId);
        if (!profile || !profile.data) return false;

        const currentWatchlist = profile.data.watchlist || { movie: [], tv: [] };

        if (!currentWatchlist[mediaType]) return false;

        const updatedWatchlist = toggleMediaInWatchlist(currentWatchlist, mediaType, mediaId);

        await updateDoc(profile.ref, { watchlist: updatedWatchlist });

        await getWatchlist(userId, profileId, dispatch);


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
        const profile = await fetchProfile(userId, profileId);
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

const fetchUserData = async (userId) => {
    try {
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) return null;
        return userDoc.data();
    } catch (error) {
        return null;
    }
}

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



export {
    createNewProfile,
    updateProfile,
    deleteProfile,
    getAllProfiles,
    getWatchlist,
    addToWatchlist,
    updateProfileLanguage,
    fetchUserData,
    nameAccountUpdate,
    sendResetPasswordEmail,
    sendEmailVerificationLink,
}
