import "./CSS/NavBar.css";
import { MessageCircle, Settings, LogOut } from "lucide-react";

export default function NavBar() {
return (
    <div className="navbar">
        {/* LEFT SIDE */}
        <div className="navbar-left">
            <div className="logo-box"></div>

            <div className="brand">
                <h1 className="brand-title">MediPal</h1>
                <p className="brand-subtitle">Your virtual health companion</p>
            </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-right">

            <div className="user-info">
                <div className="profile-pic"></div>
                <span className="username">Olivia Brown</span>
            </div>

            <div className="nav-icons">
                <MessageCircle size={24} />
                <Settings size={24} />
                <LogOut size={24} />
            </div>
        </div>
    </div>
);
}