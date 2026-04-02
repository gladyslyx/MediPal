import "./CSS/Bookings.css";
import { useState } from "react";
import { User, Clock, MapPin, Video } from "lucide-react";
import axios from "axios";

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
                <ProviderCard key={i} provider={p} />
            ))}
        </>
    );
}

/* ================= EXPANDABLE CARD ================= */

function ProviderCard({ provider }) {

    const [expanded, setExpanded] = useState(false);
    const [reason, setReason] = useState("");
    const [date, setDate] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const handleBooking = async () => {

        console.log("Booking clicked");

        if (!reason || !date) {
            alert("Please fill in all fields ❗");
            return;
        }

        try {
            const token = localStorage.getItem("accessToken");

            console.log("TOKEN:", token);

            const res = await axios.post(
                "http://localhost:4000/createBooking",
                {
                    doctor: provider.name,
                    role: provider.role,
                    reason: reason,
                    date: date
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("RESPONSE:", res.data);

            if (res.data.success) {
                setShowSuccess(true);
                setExpanded(false);
                setReason("");
                setDate("");

                setTimeout(() => {
                    setShowSuccess(false);
                }, 2000);
            }

        } catch (err) {
            console.error(err);
            alert("Booking failed ❌");
        }
    };

    return (
        <>
            <div className={`provider-card ${expanded ? "expanded" : ""}`}>

                <div className="provider-info">
                    <User size={22} />
                    <div>
                        <h4>{provider.name}</h4>
                        <p>{provider.role}</p>
                    </div>
                </div>

                <button
                    className="book-btn"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? "Cancel" : "Book Appointment"}
                </button>

                {expanded && (
                    <div className="booking-form">

                        <label>Reason for request:</label>
                        <input
                            type="text"
                            placeholder="Type..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />

                        <label>Date:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />

                        <button
                            className="confirm-btn"
                            onClick={handleBooking}
                        >
                            Confirm Booking
                        </button>

                    </div>
                )}
            </div>

            {/* SUCCESS POPUP */}
            {showSuccess && (
                <div className="success-popup">
                    Booking Successful ✅
                </div>
            )}
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