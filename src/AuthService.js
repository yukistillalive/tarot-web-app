import * as AuthRepository from "./AuthRepository.js";

export function loginWithEmail(email, password) {
    if (!email || !password) {
        return Promise.reject(new Error("Please enter both email and password."));
    }

    return AuthRepository.signInWithEmail(email, password)
        .catch(loginErrorACB);
}

export function loginWithGoogle() {
    return AuthRepository.signInWithGoogle();
}

export function registerWithEmail({ email, password, confirmPassword, displayName, avatarFile }) {
    const trimmedDisplayName = displayName ? displayName.trim() : "";

    if (!email || !password || !trimmedDisplayName) {
        return Promise.reject(new Error("Please fill in all fields."));
    }

    if (password !== confirmPassword) {
        return Promise.reject(new Error("Passwords do not match."));
    }

    if (password.length < 6) {
        return Promise.reject(new Error("Password must be at least 6 characters."));
    }

    const avatarError = validateAvatarFile(avatarFile);
    if (avatarError) return Promise.reject(avatarError);

    return AuthRepository.createUserWithEmail(email, password)
        .then(function userCreatedACB(user) {
            if (!avatarFile) {
                return AuthRepository.updateUserProfile(user, {
                    displayName: trimmedDisplayName,
                });
            }

            return AuthRepository.uploadAvatar(user.uid, avatarFile)
                .then(function avatarUploadedACB(photoURL) {
                    return AuthRepository.updateUserProfile(user, {
                        displayName: trimmedDisplayName,
                        photoURL: photoURL,
                    });
                });
        });
}

export function registerWithGoogle(avatarFile) {
    const avatarError = validateAvatarFile(avatarFile);
    if (avatarError) return Promise.reject(avatarError);

    return AuthRepository.signInWithGoogle()
        .then(function googleUserCreatedACB(user) {
            if (!avatarFile) return user;

            return AuthRepository.uploadAvatar(user.uid, avatarFile)
                .then(function avatarUploadedACB(photoURL) {
                    return AuthRepository.updateUserProfile(user, {
                        photoURL: photoURL,
                    });
                });
        });
}

export function resetPassword(email) {
    if (!email) return Promise.reject(new Error("Please enter your email address."));
    return AuthRepository.sendPasswordReset(email)
        .catch(function resetErrorACB() {
            throw new Error("Could not send reset email. Please check your email address.");
        });
}

export function updateAvatar(user, avatarFile) {
    if (!user) {
        return Promise.reject(new Error("Please log in before changing your avatar."));
    }

    const avatarError = validateAvatarFile(avatarFile);
    if (avatarError) return Promise.reject(avatarError);

    return AuthRepository.uploadAvatar(user.uid, avatarFile)
        .then(function avatarUploadedACB(photoURL) {
            return AuthRepository.updateUserProfile(user, {
                photoURL: photoURL,
            }).then(function profileUpdatedACB() {
                return photoURL;
            });
        });
}

function validateAvatarFile(avatarFile) {
    if (avatarFile && !avatarFile.type.startsWith("image/")) {
        return new Error("Please choose an image file for your avatar.");
    }

    return null;
}

export function logout() {
    return AuthRepository.signOut();
}

function loginErrorACB(err) {
    throw new Error("Please check if your login information is correct.");
}