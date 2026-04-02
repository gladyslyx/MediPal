import "./CSS/MedHomepage.css";
import { useState } from "react";
import MedReqAccess from "./MedReqAccess.jsx";
import MedApproval from "./MedApproval.jsx";
import { UserPlus, ClipboardList, Users, Clock, Calendar, MessageCircle } from "lucide-react";

export default function Homepage() {
    const [showMedReq, setShowMedReq] = useState(false);
    const [showApproval, setShowApproval] = useState(false);

    return (
        <div className="medhomepage">
            <div className="content">
                <h1>Welcome, Dr. Andy</h1>
                <p>Manage your patient data access and monitor health metrics.</p>

                <TopRow 
                    openMedReq={() => setShowMedReq(true)}
                    openMedAppr={() => setShowApproval(true)}
                />

                <BottomRow />
            </div>

            {showMedReq && (
                <MedReqAccess onClose={() => setShowMedReq(false)} />
            )}

            {showApproval && (
                <MedApproval onClose={() => setShowApproval(false)} />
            )}
        </div>
    );
}

function Card({ title, description, variant, icon, callback }) {
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

function TopRow({ openMedReq, openMedAppr }) {
    return (
        <div className="top-row">
            <div className="box1">
                <Card 
                    title="Request Data Access"
                    description="Submit new patient data access request"
                    variant="primary"
                    icon={<UserPlus size={28} />}
                    callback={openMedReq}
                />
            </div>

            <div className="box1">
                <Card 
                    title="Check Status"
                    description="View pending and approved request"
                    variant="primary"
                    icon={<ClipboardList size={28} />}
                    callback={openMedAppr}
                />
            </div> 
        </div>
    );
}

function BottomRow() {
    return (
        <div className="bottom-row">

            <div className="box2">
                <Card 
                    title="Total Patients"
                    description="24 persons"
                    icon={<Users size={26} />}
                />
            </div>

            <div className="box2">
                <Card 
                    title="Pending"
                    description="5 pending requests"
                    icon={<Clock size={26} />}
                />
            </div>

            <div className="box2">
                <Card 
                    title="Bookings"
                    description="3 Upcoming Appointments"
                    icon={<Calendar size={26} />}
                />
            </div>

            <div className="box2">
                <Card 
                    title="Chatbot"
                    description="FAQs & Assistance"
                    icon={<MessageCircle size={26} />}
                />
            </div>

        </div>
    );
}