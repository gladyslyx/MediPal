import "./ProfileSelection.css";

export default function ProfilesPopup({ onClose }) {
    return (
        <div className="profiles-overlay" onClick={onClose}>
            <div
                className="profiles-card"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="close-btn" onClick={onClose}>✕</button>

                <h2 className="title">Profiles</h2>
                <p className="subtitle">
                    Manage health profiles for your family members
                </p>

                <hr className="divider" />

                <div className="profiles-list">
                    <ProfileRow
                        name="Olivia Brown"
                        role="Account Owner"
                    />
                    <ProfileRow
                        name="Jack Hudgens"
                        role="Spouse"
                    />
                    <ProfileRow
                        name="Lily Hudgens"
                        role="Daughter"
                    />
                </div>

                <button className="add-profile-btn">
                    + Add New Profile
                </button>
            </div>
        </div>
    );
}

function ProfileRow({ name, role }) {
    return (
        <div className="profile-row">
            <div className="profile-left">
                <div className="profile-avatar"></div>
                <div>
                    <h4>{name}</h4>
                    <p>{role}</p>
                </div>
            </div>

            <span className="arrow">→</span>
        </div>
    );
}
