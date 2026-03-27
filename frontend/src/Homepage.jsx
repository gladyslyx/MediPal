import { useNavigate } from "react-router-dom"; 
import { useState } from "react";
import "./CSS/Homepage.css";
import { getAccessToken, verifyAccessToken } from "./clientSession"
import NavBar from "./NavBar.jsx";
import UserProfile from "./UserProfile.jsx";
import ConnectedDevices from "./ConnectedDevices.jsx";
import Chatbot from "./Chatbot.jsx";

const PROFILE_PAGE = '/user';
const PROFILE_SELECTION_PAGE = '/profile';

export default function Homepage() {

    const [showProfile, setShowProfile] = useState(false);
    const [showDevices, setShowDevices] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false);

    return (
        <div className="homepage">
            
            <NavBar /> 
            
            <div className="content">
                <h1>Welcome back, Olivia</h1>
                <p>Here's your health overview for today.</p>
                <TopRow 
                    openProfile={() => setShowProfile(true)} 
                    openDevices={() => setShowDevices(true)} 
                />
                <BottomRow
                    openChatbot={() => setShowChatbot(true)}
                />
            </div>

            {showProfile && (
                <UserProfile onClose={() => setShowProfile(false)} />
            )}
            {showDevices && (
                <ConnectedDevices onClose={() => setShowDevices(false)} />
            )}
            {showChatbot && (
                <Chatbot onClose={() => setShowChatbot(false)} />
            )}
        </div>
    );
}

function Card({title, description, variant, icon, callback}){

    return (
        <div className= {`Card ${variant === "primary" ? "card-primary" : "card-secondary"}`}>
            <div className="card-icon">
                {icon}
            </div>
            <h2>{title}</h2>
            <p>{description}</p>
            <span className="open" onClick={callback}> Open &gt; </span>
        </div>
    );
}

function TopRow({ openProfile, openDevices }) {

    // const navigateToProfileSelection = () => {
    //     nav(PROFILE_SELECTION_PAGE);
    // };

    return (
        <div className="top-row">
            <div className="box1">
                {/* biomarker data */}
                <Card 
                    title="Biomarker Data"
                    description="Track and analyse health metrics"
                    variant="primary"
                    icon="💉"
                />
            </div>
            <div className="box1">
                {/* connected devices */}
                <Card 
                    title="Connected Devices"
                    description="Manage your health tracking devices"
                    variant="primary"
                    icon="📱"
                    callback={openDevices}
                />
            </div>
            <div className="box1">
                {/* profile management */}
                <Card
                    title="Profile Management"
                    description="View and manage family health profiles"
                    variant="primary"
                    icon="👤" 
                    callback={openProfile}
                />
            </div>  
        </div>
    );
}

function BottomRow({ openChatbot }) {
    return (
        <div className="bottom-row">
            <div className="box2">
                {/* goals */}
                <Card 
                    title="Goals"
                    description="View and set your health goals"
                    icon="🎯"
                />
            </div>
            <div className="box2">
                {/* bookings */}
                <Card 
                    title="Bookings"
                    description="Make bookings with healthcare providers"
                    icon="📅"
                />
            </div>
            <div className="box2">
                {/* alerts */}
                <Card 
                    title="Alerts"
                    description="View and manage health alerts"
                    icon="🔔"
                />
            </div>
            <div className="box2">
                {/* approvals */}
                <Card 
                    title="Approvals"
                    description="Approve or deny access requests"
                    icon="✅"
                />
            </div>
            <div className="box2">
            {/* chatbot ****figure diff css */}
            <Card 
                title="Chatbot"
                description="FAQs & Assistance"
                icon="🤖"
                callback={openChatbot}
            />
            </div>
        </div>
    );
}