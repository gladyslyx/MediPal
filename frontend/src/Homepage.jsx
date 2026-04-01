import { useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react";
import "./CSS/Homepage.css";
import { getAccessToken, verifyAccessToken } from "./clientSession"
import NavBar from "./NavBar.jsx";
import UserProfile from "./UserProfile.jsx";
import ConnectedDevices from "./ConnectedDevices.jsx";
import Chatbot from "./Chatbot.jsx";
import Alerts from "./Alert.jsx";
import Goals from "./Goals.jsx";
import Bookings from "./Bookings.jsx";
import Approvals from "./Approvals.jsx";
import BiomarkerPage from "./Biomarker.jsx";
import Notification from "./Notification.jsx";
import { checkBiomarkers } from "./alertEngine";

// 🔥 ICONS
import { 
    User, 
    Smartphone, 
    Activity, 
    Target, 
    Calendar, 
    Bell, 
    CheckCircle, 
    MessageCircle 
} from "lucide-react";

export default function Homepage() {

    const [showProfile, setShowProfile] = useState(false);
    const [showDevices, setShowDevices] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false);
    const [showAlerts, setShowAlerts] = useState(false);
    const [showGoals, setShowGoals] = useState(false);
    const [showBookings, setShowBookings] = useState(false);
    const [showApprovals, setShowApprovals] = useState(false);
    const [alerts, setAlerts] = useState([]);
    const [showNoti, setShowNoti] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fakeData = {
            heartRate: 110,
            steps: 1200,
            sleep: 4
        };

        const result = checkBiomarkers(fakeData);

        if (result.length > 0) {
            setAlerts(result);
            setShowNoti(true);

            setTimeout(() => {
                setShowNoti(false);
            }, 5000);
        }
    }, []);

    return (
        <div className="homepage">
            
            <NavBar /> 
            
            <div className="content">
                <h1>Welcome back, Olivia</h1>
                <p>Here's your health overview for today.</p>

                <TopRow 
                    openProfile={() => setShowProfile(true)} 
                    openDevices={() => setShowDevices(true)} 
                    openBiomarkers={() => navigate("/biomarker")}
                />

                <BottomRow
                    openChatbot={() => setShowChatbot(true)}
                    openAlert={() => setShowAlerts(true)}
                    openGoals={() => setShowGoals(true)}
                    openBookings={() => setShowBookings(true)}
                    openApprovals={() => setShowApprovals(true)}
                />
            </div>

            {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
            {showDevices && <ConnectedDevices onClose={() => setShowDevices(false)} />}
            {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}
            {showAlerts && <Alerts alerts={alerts} onClose={() => setShowAlerts(false)} />}
            {showGoals && <Goals onClose={() => setShowGoals(false)} />}
            {showBookings && <Bookings onClose={() => setShowBookings(false)} />}
            {showApprovals && <Approvals onClose={() => setShowApprovals(false)} />}
            {showNoti && <Notification alerts={alerts} onClose={() => setShowNoti(false)} />}
        </div>
    );
}

function Card({title, description, variant, icon, callback}) {
    return (
        <div className={`Card ${variant === "primary" ? "card-primary" : "card-secondary"}`}>
            <div className="card-icon">
                {icon}
            </div>
            <h2>{title}</h2>
            <p>{description}</p>
            <span className="open" onClick={callback}> Open &gt; </span>
        </div>
    );
}

/* ================= TOP ================= */

function TopRow({ openProfile, openDevices, openBiomarkers }) {
    return (
        <div className="top-row">

            <div className="box1">
                <Card 
                    title="Biomarker Data"
                    description="Track and analyse health metrics"
                    variant="primary"
                    icon={<Activity size={28} />}
                    callback={openBiomarkers}
                />
            </div>

            <div className="box1">
                <Card 
                    title="Connected Devices"
                    description="Manage your health tracking devices"
                    variant="primary"
                    icon={<Smartphone size={28} />}
                    callback={openDevices}
                />
            </div>

            <div className="box1">
                <Card
                    title="Profile Management"
                    description="View and manage family health profiles"
                    variant="primary"
                    icon={<User size={28} />}
                    callback={openProfile}
                />
            </div>  

        </div>
    );
}

/* ================= BOTTOM ================= */

function BottomRow({ openChatbot, openAlert, openGoals, openBookings, openApprovals }) {
    return (
        <div className="bottom-row">

            <div className="box2">
                <Card 
                    title="Goals"
                    description="View and set your health goals"
                    icon={<Target size={26} />}
                    callback={openGoals}
                />
            </div>

            <div className="box2">
                <Card 
                    title="Bookings"
                    description="Make bookings with healthcare providers"
                    icon={<Calendar size={26} />}
                    callback={openBookings}
                />
            </div>

            <div className="box2">
                <Card 
                    title="Alerts"
                    description="View and manage health alerts"
                    icon={<Bell size={26} />}
                    callback={openAlert}
                />
            </div>

            <div className="box2">
                <Card 
                    title="Approvals"
                    description="Approve or deny access requests"
                    icon={<CheckCircle size={26} />}
                    callback={openApprovals}
                />
            </div>

            <div className="box2">
                <Card 
                    title="Chatbot"
                    description="FAQs & Assistance"
                    icon={<MessageCircle size={26} />}
                    callback={openChatbot}
                />
            </div>

        </div>
    );
}