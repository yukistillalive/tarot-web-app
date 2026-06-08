export function RegisterView(props) {
    return (
        <div style={{ maxWidth: 400, margin: "60px auto", padding: 24 }}>
            <h2>Register</h2>

            {props.error && (
                <p style={{ color: "red" }}>{props.error}</p>
            )}

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <img
                    src={props.avatarPreviewURL || "https://api.dicebear.com/7.x/personas/svg?seed=tarot"}
                    alt="avatar preview"
                    style={{
                        width: 92,
                        height: 92,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "3px solid #c9a96e",
                    }}
                />
                <label
                    style={{
                        border: "1px solid #c9a96e",
                        borderRadius: 20,
                        color: "#c9a96e",
                        cursor: props.loading ? "default" : "pointer",
                        fontSize: 13,
                        padding: "6px 16px",
                    }}
                >
                    Choose Avatar
                    <input
                        type="file"
                        accept="image/*"
                        disabled={props.loading}
                        onChange={filePickedACB}
                        style={{ display: "none" }}
                    />
                </label>
                {props.avatarFileName && (
                    <span style={{ color: "#777", fontSize: 12 }}>{props.avatarFileName}</span>
                )}
            </div>

            <div style={{ marginBottom: 12 }}>
                <label>Display Name</label>
                <br />
                <input
                    type="text"
                    value={props.displayName}
                    onChange={(e) => props.onDisplayNameChange(e.target.value)}
                    style={{ width: "100%", padding: 8 }}
                />
            </div>

            <div style={{ marginBottom: 12 }}>
                <label>Email</label>
                <br />
                <input
                    type="email"
                    value={props.email}
                    onChange={(e) => props.onEmailChange(e.target.value)}
                    style={{ width: "100%", padding: 8 }}
                />
            </div>

            <div style={{ marginBottom: 12 }}>
                <label>Password</label>
                <br />
                <input
                    type="password"
                    value={props.password}
                    onChange={(e) => props.onPasswordChange(e.target.value)}
                    style={{ width: "100%", padding: 8 }}
                />
            </div>

            <div style={{ marginBottom: 12 }}>
                <label>Confirm Password</label>
                <br />
                <input
                    type="password"
                    value={props.confirmPassword}
                    onChange={(e) => props.onConfirmPasswordChange(e.target.value)}
                    style={{ width: "100%", padding: 8 }}
                />
            </div>

            <button
                onClick={props.onRegister}
                disabled={props.loading}
                style={{ width: "100%", padding: 10, cursor: "pointer" }}
            >
                {props.loading ? "Registering..." : "Register"}
            </button>

            <div style={{ textAlign: "center", margin: "16px 0", color: "#888" }}>
                — OR —
            </div>

            <button
                onClick={props.onGoogleRegister}
                disabled={props.loading}
                style={{
                    width: "100%",
                    padding: 10,
                    cursor: "pointer",
                    backgroundColor: "#4285F4",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                }}
            >
                {props.loading ? "Please wait..." : "Sign up with Google"}
            </button>

            <p style={{ marginTop: 16, textAlign: "center" }}>
                Already have an account?{" "}
                <a href="#/login" style={{ color: "blue" }}>Login</a>
            </p>
        </div>
    );

    function filePickedACB(evt) {
        const file = evt.target.files[0];
        if (file) {
            props.onAvatarChange(file);
        }
    }
}
