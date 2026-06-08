import { observer } from "mobx-react-lite";
import { LoginView } from "/src/views/loginView.jsx";
import { useEffect, useState } from "react";

const Login = observer(
    function Login(props) {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(false);
        const [resetMessage, setResetMessage] = useState(null);

        useEffect(lifecycleACB, []);

        function lifecycleACB() {
            console.log("Login component is born.");
            return function takeDownACB() { console.log("Login component is taken down."); };
        }
        
        function handleLogin() {
            setLoading(true);
            setError(null);
            setResetMessage(null);
            props.model.loginWithEmail(email, password)
                .then(function successACB() { window.location.hash = "#/tutorial"; })
                .catch(function errorACB(err) { setError(err.message); })
                .finally(function doneACB() { setLoading(false); });
        }

        function handleGoogleLogin() {
            setLoading(true);
            setError(null);
            setResetMessage(null);
            props.model.loginWithGoogle()
                .then(function successACB() { window.location.hash = "#/tutorial"; })
                .catch(function errorACB(err) { setError(err.message); })
                .finally(function doneACB() { setLoading(false); });
        }

        function handleForgotPassword() {
            setError(null);
            setResetMessage(null);
            props.model.resetPassword(email)
                .then(function resetSentACB() { setResetMessage("Password reset email sent. Check your inbox."); })
                .catch(function resetErrorACB(err) { setError(err.message); });
        }

        return (
            <LoginView
                email={email}
                password={password}
                error={error}
                resetMessage={resetMessage}
                loading={loading}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onLogin={handleLogin}
                onGoogleLogin={handleGoogleLogin}
                onForgotPassword={handleForgotPassword}
            />
        );
    }
);

export { Login };
