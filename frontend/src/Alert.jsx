import "./CSS/Alert.css";
import { useState } from "react";
import { Heart, Battery, Smile } from "lucide-react";

export default function Alerts({ onClose }) {

    const [activeTab, setActiveTab] = useState("biomarkers");

    const alertsData = {
        biomarkers: [
            {
                title: "Heart Rate Alert",
                text: "Your heart rate has exceeded the safe threshold. Please rest and monitor.",
                value: "Current Value: 135 bpm",
                threshold: "Threshold: 100 bpm",
                icon: <Heart size={22} />,
                type: "danger"
            },
            {
                title: "Stress Level High",
                text: "Your stress level has been elevated for 3 hours. Try relaxation techniques.",
                value: "Current Value: 78/100",
                threshold: "Threshold: 60/100",
                icon: <Smile size={22} />,
                type: "danger"
            }
        ],

        devices: [
            {
                title: "Device Battery Low",
                text: "Your Smart Watch battery is at 15%. Consider charging it soon.",
                value: "",
                threshold: "",
                icon: <Battery size={22} />,
                type: "danger"
            }
        ],

        goals: [
            {
                title: "Daily Step Goal Achieved!",
                text: "You've reached your daily goal of 10,000 steps. Keep up the great work!",
                value: "Current Value: 10,000 steps",
                threshold: "",
                icon: <Smile size={22} />,
                type: "success"
            }
        ]
    };

    return (
        <div className="alerts-overlay">
            <div className="alerts-card">

                <button className="close-btn" onClick={onClose}>✕</button>

                <h2 className="alerts-title">Alerts</h2>
                <p className="alerts-subtitle">
                    Select the type of alert you wish to check on
                </p>

                {/* TABS */}
                <div className="alerts-tabs">

                    <button
                        className={activeTab === "biomarkers" ? "active" : ""}
                        onClick={() => setActiveTab("biomarkers")}
                    >
                        Biomarkers
                    </button>

                    <button
                        className={activeTab === "devices" ? "active" : ""}
                        onClick={() => setActiveTab("devices")}
                    >
                        Devices
                    </button>

                    <button
                        className={activeTab === "goals" ? "active" : ""}
                        onClick={() => setActiveTab("goals")}
                    >
                        Goals
                    </button>

                </div>

                {/* ALERT LIST */}
                <div className="alerts-list">

                    {alertsData[activeTab].map((alert, index) => (
                        <AlertItem key={index} {...alert} />
                    ))}

                </div>

            </div>
        </div>
    );
}

function AlertItem({ title, text, value, threshold, icon, type }) {
    return (
        <div className={`alert-item ${type}`}>

            <div className="alert-left">
                <div className="alert-icon">{icon}</div>
            </div>

            <div className="alert-content">
                <h4>{title}</h4>
                <p>{text}</p>

                {value && <span>{value}</span>}
                {threshold && <span>{threshold}</span>}
            </div>

            <button className="alert-close">✕</button>

        </div>
    );
}