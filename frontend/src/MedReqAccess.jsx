import "./CSS/MedReqAccess.css";
import { Search, UserPlus } from "lucide-react";

export default function MedReqAccess({ onClose }) {
    return (
        <div className="med-overlay" onClick={onClose}>
            <div className="med-card" onClick={(e) => e.stopPropagation()}>

                {/* CLOSE */}
                <button className="close-button" onClick={onClose}>✕</button>

                {/* HEADER */}
                <div className="med-header">
                    <UserPlus size={28} />
                    <div>
                        <h1>Request Patient Data Access</h1>
                        <p>Submit a request to access patient health data</p>
                    </div>
                </div>

                <hr />

                {/* FORM */}
                <div className="med-form">

                    {/* SEARCH */}
                    <label>Search for patient</label>
                    <div className="search-box">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Enter patient name or email..."
                        />
                    </div>

                    {/* REASON */}
                    <label>Reason for request:</label>
                    <textarea placeholder="Type..."></textarea>

                    {/* BUTTON */}
                    <div className="btn-container">
                        <button className="submit-btn">
                            Send request
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}