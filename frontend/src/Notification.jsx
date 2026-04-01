import "./CSS/Notification.css";

export default function Notification({ alerts, onClose }) {
    return (
        <div className="toast-container">
            {alerts.map((a, i) => (
        <div key={i} className="toast">
        <div className="toast-content">
            <h4>⚠️ {a.type}</h4>
            <p>{a.message}</p>
            <small>💡 {a.recommendation}</small>
        </div>

        <button className="toast-close" onClick={onClose}>
            ✕
        </button>

        </div>
        ))} 
        </div>
    );
}