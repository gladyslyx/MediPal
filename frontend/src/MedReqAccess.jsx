import "./CSS/MedReqAccess.css";

export default function RequestAccess({ onClose }) {
    return (
        <div className="request-overlay">
            <div className="request-container">

                {/* Close Button */}
                <div className="close-btn" onClick={onClose}>✕</div>

                {/* Title */}
                <h1 className="request-title">👥+ Request Patient Data Access</h1>
                <p className="request-subtitle">
                    Submit a request to access patient health data
                </p>

                <hr />

                {/* Search section */}
                <div className="search-section">
                    <label>Search for patient</label>

                    <div className="search-box">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Enter patient name or email..."
                        />
                    </div>
                </div>

                {/* Button */}
                <div className="request-btn-container">
                    <button className="send-request-btn">
                        Send request
                    </button>
                </div>

            </div>
        </div>
    );
}