import { auth, googleProvider, storage } from "./firebaseConfig.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
    sendPasswordResetEmail,
    signOut as firebaseSignOut,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export function signInWithEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(function userSignedInACB(userCredential) {
            return userCredential.user;
        });
}

export function signInWithGoogle() {
    return signInWithPopup(auth, googleProvider)
        .then(function googleSignedInACB(userCredential) {
            return userCredential.user;
        });
}

export function createUserWithEmail(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(function userCreatedACB(userCredential) {
            return userCredential.user;
        });
}

export function updateUserProfile(user, profile) {
    return updateProfile(user, profile)
        .then(function profileUpdatedACB() {
            return user;
        });
}

export function sendPasswordReset(email) {
    return sendPasswordResetEmail(auth, email);
}

export function signOut() {
    return firebaseSignOut(auth);
}

export function uploadAvatar(uid, file) {
    const storageRef = ref(storage, `avatars/${uid}`);
    return uploadBytes(storageRef, file)
        .then(function avatarUploadedACB(snapshot) {
            return getDownloadURL(snapshot.ref);
        });
}
