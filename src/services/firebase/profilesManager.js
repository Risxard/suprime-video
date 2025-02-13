import { doc, setDoc, updateDoc, deleteDoc, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from './firebaseconfig.js';
import { setCurrentWatchlist, userProfiles } from "../../store/auth/index.js";

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
        console.error(error.message);
        return false
    }
};

const deleteProfile = async (userId, profileId) => {
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

        await deleteDoc(profileRef);
        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
};

const getAllProfiles = async (userId, dispatch) => {
    try {
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            return [];
        }

        const userData = userDoc.data();
        const { name } = userData;

        const profilesRef = collection(db, "users", userId, "profiles");
        const querySnapshot = await getDocs(profilesRef);

        if (querySnapshot.empty) {
            await createNewProfile(userId, name);
            return await getAllProfiles(userId, dispatch);
        }

        const profiles = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                userInfoData: data.userInfoData,
            };
        });

        dispatch(userProfiles({ profiles }));

        localStorage.setItem("@AuthSV:profiles", JSON.stringify(profiles));

        return profiles;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

const getWatchlist = async (userId, profileId, dispatch) => {
    try {
        const profileRef = doc(db, "users", userId, "profiles", profileId);
        const profileDoc = await getDoc(profileRef);

        if (!profileDoc.exists()) {
            return false;
        }
        const profileData = profileDoc.data();
        const watchlist = profileData.watchlist || { movie: [], tv: [] };
        dispatch(setCurrentWatchlist(watchlist));

        return watchlist;
    } catch (error) {
        console.error(error.message);
        return false;
    }
};

const addToWatchlist = async (userId, profileId, mediaType, mediaId, dispatch) => {
    try {
        const profileRef = doc(db, "users", userId, "profiles", profileId);
        const profileDoc = await getDoc(profileRef);

        if (!profileDoc.exists()) {
            return false;
        }

        const profileData = profileDoc.data();
        const watchlist = profileData.watchlist || { movie: [], tv: [] };

        if (!watchlist[mediaType]) {
            return false;
        }

        const mediaIndex = watchlist[mediaType].indexOf(mediaId);
        if (mediaIndex === -1) {
            watchlist[mediaType].push(mediaId);
        } else {
            watchlist[mediaType].splice(mediaIndex, 1);
        }

        await updateDoc(profileRef, { watchlist });
        await getWatchlist(userId, profileId, dispatch);

        return true;
    } catch (error) {
        console.error(error.message);
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
        console.error(error.message);
        return false;
    }
};

export { createNewProfile, updateProfile, deleteProfile, getAllProfiles, getWatchlist, addToWatchlist }
