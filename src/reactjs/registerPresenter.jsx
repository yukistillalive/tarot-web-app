import { RegisterView } from "/src/views/registerView.jsx";
import { useEffect, useState } from "react";

function Register(props) {
    const [loading, setLoading] = useState(false);
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [avatarFile, setAvatarFile] = useState(null);
    const [error, setError] = useState(null);
    const [avatarPreviewURL, setAvatarPreviewURL] = useState("");

    useEffect(function lifecycleACB() {
        console.log("Register component is born.");
        return function takeDownACB() { console.log("Register component is taken down."); };
    }, []);

    useEffect(function avatarPreviewEffectACB() {
        if (!avatarFile) { setAvatarPreviewURL(""); return; }
        const previewURL = URL.createObjectURL(avatarFile);
        setAvatarPreviewURL(previewURL);
        return function cleanupAvatarPreviewACB() { URL.revokeObjectURL(previewURL); };
    }, [avatarFile]);

    function handleRegister() {
        setLoading(true);
        setError(null);
        props.model.registerWithEmail({ email, password, confirmPassword, displayName, avatarFile })
            .then(function successACB() { window.location.hash = "#/"; })
            .catch(function errorACB(err) { setError(err.message); })
            .finally(function doneACB() { setLoading(false); });
    }

    function handleGoogleRegister() {
        setLoading(true);
        setError(null);
        props.model.registerWithGoogle(avatarFile)
            .then(function successACB() { window.location.hash = "#/"; })
            .catch(function errorACB(err) { setError(err.message); })
            .finally(function doneACB() { setLoading(false); });
    }

    return (
        <RegisterView
            displayName={displayName}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            avatarPreviewURL={avatarPreviewURL}
            avatarFileName={avatarFile?.name || ""}
            error={error}
            loading={loading}
            onDisplayNameChange={setDisplayName}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onAvatarChange={setAvatarFile}
            onRegister={handleRegister}
            onGoogleRegister={handleGoogleRegister}
        />
    );
}

export { Register };
