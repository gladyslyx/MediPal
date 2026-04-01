import "./CSS/MedApproval.css";
import { useState } from "react";
import { User } from "lucide-react";

export default function MedApproval({ onClose }) {

    const [activeTab, setActiveTab] = useState("pending");

    return (
        <div className="med-approval-overlay">
            <div className="med-approval-card">

                {/* CLOSE */}
                <button className="close-button" onClick={onClose}>✕</button>

                {/* HEADER */}
                <h2>Approvals</h2>
                <p className="subtitle">
                    Check status of request of data access
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

                    {activeTab === "pending" && <PendingList />}
                    {activeTab === "active" && <ActiveList />}

                </div>
            </div>
        </div>
    );
}

/* ================= PENDING ================= */

function PendingList() {

    const pending = [
        {
            name: "Sharon Tan",
            role: "Patient",
            reason: "As your primary care physician, I would like to review your comprehensive health data to prepare for your annual physical examination scheduled next week.",
            date: "Mar 19, 2026, 05:55 PM"
        }
    ];

    return (
        <>
            {pending.map((p, i) => (
                <div className="approval-item pending" key={i}>

                    <div className="approval-header">
                        <User size={20} />
                        <div>
                            <h4>{p.name}</h4>
                            <p>{p.role}</p>
                        </div>
                    </div>

                    <div className="reason-box">
                        <strong>Request Reason</strong>
                        <p>{p.reason}</p>
                    </div>

                    <p className="date">
                        Request date: {p.date}
                    </p>

                    <button className="action-btn">
                        Request Again
                    </button>

                </div>
            ))}
        </>
    );
}

/* ================= ACTIVE ================= */

function ActiveList() {

    const active = [
        {
            name: "Ms. Olivia Brown",
            role: "Patient",
            date: "Feb 19, 2026, 03:42 PM"
        },
        {
            name: "Mr. James Lee",
            role: "Patient",
            date: "Jan 27, 2026, 11:18 AM"
        }
    ];

    return (
        <>
            {active.map((a, i) => (
                <div className="approval-item active" key={i}>

                    <div className="approval-header">
                        <User size={20} />
                        <div>
                            <h4>{a.name}</h4>
                            <p>{a.role}</p>
                        </div>
                    </div>

                    <div className="approved-box">
                        <strong>Approved:</strong>
                        <p>{a.date}</p>
                    </div>

                    <button className="action-btn">
                        View
                    </button>

                </div>
            ))}
        </>
    );
}