import "./CSS/Chatbot.css";
import { MessageCircle, Send, User } from "lucide-react";
import { useState } from "react";

export default function Chatbot({ onClose }) {

    const [messages, setMessages] = useState([
        {
            sender: "assistant",
            text: "👋 Hi! I'm your MediPal Assistant! I'm here to help you navigate the app, manage your devices, set goals, and celebrate your achievements! How can I help you today?",
            time: "12:05 pm"
        }
    ]);

    const responses = {
        support: "You can contact support via the Help section in Settings or email support@medipal.com.",
        navigation: "Use the homepage cards to access Biomarkers, Devices, Goals, and Alerts. Each section helps manage your health information.",
        goals: "You can set goals from the Goals section. We recommend 8000+ steps daily and regular health monitoring.",
        edit: "To edit your personal health data, open the Profile Management card from the homepage.",
        alert: "Health alerts notify you if biomarker values exceed safe ranges. You can review alerts in the Alerts section."
    };

    function sendResponse(type) {
        const newMessage = {
            sender: "assistant",
            text: responses[type],
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };

        setMessages(prev => [...prev, newMessage]);
    }

    return (
        <div className="chatbot-overlay">
            <div className="chatbot-card">
                <div className="chatbot-header">
                    <div className="chatbot-title">
                        <MessageCircle size={28} />
                        <span>MediPal Assistant</span>
                    </div>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="chatbot-body">

                    {messages.map((msg, index) => (
                        <div key={index} className="message-row">

                            <div className="chatbot-avatar">
                                <User size={20} color="black" />
                            </div>

                            <div className="message-bubble">
                                {msg.text }
                                <span className="message-time">{msg.time}</span>
                            </div>

                        </div>
                    ))}

                    <div className="quick-actions">

                        <button onClick={() => sendResponse("support")}>
                            📞 Contact support
                        </button>

                        <button onClick={() => sendResponse("navigation")}>
                            Navigation help
                        </button>

                        <button onClick={() => sendResponse("goals")}>
                            Set Goals
                        </button>

                        <button onClick={() => sendResponse("edit")}>
                            Edit information
                        </button>

                        <button onClick={() => sendResponse("alert")}>
                            Dismiss alert
                        </button>

                    </div>

                </div>

                <div className="chatbot-input">

                    <input
                        type="text"
                        placeholder="Type your message..."
                    />

                    <Send size={22} color="black"/>

                </div>

            </div>

        </div>
    );
}