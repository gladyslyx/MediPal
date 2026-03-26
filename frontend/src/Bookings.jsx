import "./CSS/Bookings.css";
import { useState } from "react";
import { User, Calendar, Clock, MapPin, Video } from "lucide-react";

export default function Bookings({ onClose }) {

    const [activeTab, setActiveTab] = useState("providers");

    return (
        <div className="bookings-overlay">
            <div className="bookings-card">

                <button className="close-button" onClick={onClose}>✕</button>

                <h2 className="title">Bookings</h2>
                <p className="subtitle">
                    Book and manage healthcare appointments
                </p>

                {/* TOGGLE */}
                <div className="booking-tabs">
                    <button
                        className={activeTab === "providers" ? "active" : ""}
                        onClick={() => setActiveTab("providers")}
                    >
                        Find Providers
                    </button>

                    <button
                        className={activeTab === "my" ? "active" : ""}
                        onClick={() => setActiveTab("my")}
                    >
                        My Bookings
                    </button>
                </div>

                {/* CONTENT */}
                <div className="booking-content">

                    {activeTab === "providers" && <Providers />}
                    {activeTab === "my" && <MyBookings />}

                </div>

            </div>
        </div>
    );
}

/* ================= PROVIDERS ================= */

function Providers() {
    const providers = [
        { name: "Dr. Lisa Thompson", role: "Cardiologist" },
        { name: "Dr. James Chen", role: "Nutritionist" },
        { name: "Dr. William Tan", role: "General Practitioner" }
    ];

    return (
        <>
            {providers.map((p, i) => (
                <div className="provider-card" key={i}>
                    <div className="provider-info">
                        <User size={22} />
                        <div classname="try">
                            <h4>{p.name}</h4>
                            <p>{p.role}</p>
                        </div>
                    </div>

                    <button className="book-btn">
                        Book Appointment
                    </button>
                </div>
            ))}
        </>
    );
}

/* ================= MY BOOKINGS ================= */

function MyBookings() {
    const bookings = [
        {
            date: "Mar 15",
            name: "Dr. James Chen",
            role: "Nutritionist",
            time: "10:00 AM",
            type: "In-Person",
            location: "Heart Care Center",
            join: false
        },
        {
            date: "Apr 28",
            name: "Dr. William Tan",
            role: "General Practitioner",
            time: "8:00 AM",
            type: "Video Call",
            location: "",
            join: true
        }
    ];

    return (
        <>
            {bookings.map((b, i) => (
                <div className="booking-item" key={i}>

                    <div className="date-box">
                        {b.date}
                    </div>

                    <div className="booking-info">
                        <h4>{b.name}</h4>
                        <p>{b.role}</p>

                        <div className="booking-details">
                            <span><Clock size={14}/> {b.time}</span>
                            <span>
                                {b.type === "Video Call" 
                                    ? <Video size={14}/> 
                                    : <MapPin size={14}/>}
                                {b.type}
                            </span>
                        </div>

                        {b.location && (
                            <p className="location">
                                <MapPin size={14}/> {b.location}
                            </p>
                        )}

                        <div className="booking-actions">

                            {b.join && (
                                <button className="join-btn">
                                    Join Call
                                </button>
                            )}

                            <button className="reschedule-btn">
                                Reschedule
                            </button>

                            <button className="cancel-btn">
                                Cancel
                            </button>

                        </div>
                    </div>

                </div>
            ))}
        </>
    );
}