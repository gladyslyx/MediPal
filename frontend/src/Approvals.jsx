import "./CSS/Approvals.css";
import { useState } from "react";
import { User } from "lucide-react";

export default function Approvals({ onClose }) {

    const [activeTab, setActiveTab] = useState("pending");

    return (
        <div className="approvals-overlay">
            <div className="approvals-card">

                <button className="close-button" onClick={onClose}>✕</button>

                <h2 className="title">Approvals</h2>
                <p className="subtitle">
                    Manage provider access to your health data
                </p>

                {/* TABS */}
                <div className="approval-tabs">

                    <button
                        className={activeTab === "pending" ? "active" : ""}
                        onClick={() => setActiveTab("pending")}
                    >
                        Pending
                    </button>

                    <button
                        className={activeTab === "active" ? "active" : ""}
                        onClick={() => setActiveTab("active")}
                    >
                        Active Access
                    </button>

                </div>

                {/* CONTENT */}
                <div className="approval-content">

                    {activeTab === "pending" && <Pending />}
                    {activeTab === "active" && <Active />}

                </div>

            </div>
        </div>
    );
}

/* ================= PENDING ================= */

function Pending() {
    return (
        <div className="approval-item danger">

            <div className="provider-info">
                <User size={22} />
                <div>
                    <h4>Dr. William Tan</h4>
                    <p>General Practitioner</p>
                </div>
            </div>

            <div className="request-box">
                <strong>Request Reason</strong>
                <p>
                    As your primary care physician, I would like to review your 
                    comprehensive health data to prepare for your annual physical examination.
                </p>
            </div>

            <div className="approval-actions">
                <button className="approve-btn">Approve</button>
                <button className="deny-btn">Deny</button>
            </div>

        </div>
    );
}

/* ================= ACTIVE ================= */

function Active() {

    const activeList = [
        { name: "Dr. James Chen", role: "Nutritionist" },
        { name: "Dr. Ashley Cooper", role: "Cardiologist" }
    ];

    return (
        <>
            {activeList.map((a, i) => (
                <div className="approval-item success" key={i}>

                    <div className="provider-info">
                        <User size={22} />
                        <div>
                            <h4>{a.name}</h4>
                            <p>{a.role}</p>
                        </div>
                    </div>

                    <div className="approved-box">
                        <strong>Approved:</strong>
                        <p>Mar 27, 2026, 02:38 AM</p>
                    </div>

                    <div className="approval-actions">
                        <button className="view-btn">View</button>
                        <button className="revoke-btn">Revoke Access</button>
                    </div>

                </div>
            ))}
        </>
    );
}