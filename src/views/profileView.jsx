import "/src/style.css";

export function ProfileView(props) {

    return (
        <div className="profileView">
            <div className="profile-avatar-section">
                <img
                    className="profile-avatar"
                    src={props.photoURL || "https://api.dicebear.com/7.x/personas/svg?seed=tarot"}
                    alt="avatar"
                />
                <label className="profile-avatar-btn">
                    Change Avatar
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={filePickedACB}
                    />
                </label>
            </div>

            <div className="profile-info">
                <div className="profile-info-row">
                    <span className="profile-label">Name</span>
                    <span className="profile-value">{props.displayName}</span>
                </div>
                <div className="profile-info-row">
                    <span className="profile-label">Email</span>
                    <span className="profile-value">{props.email}</span>
                </div>
            </div>

            <button className="profile-logout-btn" onClick={props.onLogout}>
                Log Out
            </button>
        </div>
    );

    function filePickedACB(evt) {
        const file = evt.target.files[0];
        if (file) { props.onAvatarChange(file); }
    }
}