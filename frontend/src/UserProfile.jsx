import "./UserProfile.css";

export default function UserProfile({ onClose }) {
    return (
        <div className="profile-overlay">
            <div className="profile-card">
                <button className="close-btn" onClick={onClose}>✕</button>
                <HeaderSection />
                <Divider />
                <InfoSection />
            </div>
        </div>
    );
}

function HeaderSection() {
    return (
        <div className="profile-header">
            <div className="avatar"></div>
            <div className="user-info">
                <h2>Olivia Brown</h2>
                <p>Account Owner</p>
            </div>
            <HealthScore score={82} />
        </div>
    );
}

function HealthScore({ score }) {
    return (
        <div className="health-score">
            <span className="label">Health Score:</span>
            <span className="value">{score}</span>
        </div>
    );
}

function Divider() {
    return <hr className="divider" />;
}

function InfoSection() {
    return (
        <div className="info-section">
            <InfoRow label="Gender" value="Female" />
            <InfoRow label="Date of birth" value="18 Jul 1995" />
            <InfoRow label="Height" value="160 cm" />
            <InfoRow label="Weight" value="52 kg" />
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="info-row">
            <span className="info-label">{label}</span>
            <span className="info-value">
                {value}
                <span className="arrow">→</span>
            </span>
        </div>
    );
}
