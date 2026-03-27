import "./CSS/ConnectedDevices.css";
import { Watch, Smartphone, Activity } from "lucide-react";

export default function ConnectedDevices({ onClose }) {
    return (
        <div className="devices-overlay">
            <div className="devices-card">

                <button className="close-button" onClick={onClose}>✕</button>

                <h2 className="devices-title">Connected Devices</h2>
                <p className="devices-subtitle">
                    View and manage your connected health devices
                </p>

                <hr className="devices-divider" />

                <div className="devices-list">

                    <DeviceRow
                        icon={<Watch size={28} />}
                        name="Smart Watch"
                        status="Connected"
                        battery="87%"
                    />

                    <DeviceRow
                        icon={<Smartphone size={28} />}
                        name="Mobile Device"
                        status="Connected"
                        battery="64%"
                    />

                    <DeviceRow
                        icon={<Activity size={28} />}
                        name="Fitness Tracker"
                        status="Syncing..."
                        battery="50%"
                    />

                </div>

                <button className="add-device-btn">
                    + Add New Device
                </button>

            </div>
        </div>
    );
}

function DeviceRow({ icon, name, status, battery }) {
    return (
        <div className="device-row">

            <div className="device-left">
                <div className="device-icon">{icon}</div>
                <span className="device-name">{name}</span>
            </div>

            <div className="device-status">
                <span className="status-text">{status}</span>

                <div className="battery">
                    🔋 {battery}
                </div>
            </div>

        </div>
    );
}