import "./CSS/MedHomepage.css";
import UserProfile from "./UserProfile";
import { useState } from "react";
import MedReqAccess from "./MedReqAccess.jsx";

export default function Homepage() {
    const [showMedReq, setShowMedReq] = useState(false);

    return (
        <div className="medhomepage">
            
            {/* <Navbar /> */}
            <div className="content">
                <h1>Welcome, Dr. Andy</h1>
                <p>Manage your patient data access and monitor health metrics.</p>
                <TopRow openMedReq={() => setShowMedReq(true)} />
                <BottomRow />
            </div>
            {showMedReq && (
                <MedReqAccess onClose={() => setShowMedReq(false)} />)}
        </div>
    );
}

function Card({title, description,variant, icon, callback}){
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

function TopRow({openMedReq}) {
    return (
        <div className="top-row">
            <div className="box1">
                {/* Request Data Access */}
                <Card 
                    title="Request Data Access"
                    description="Submit new patient data access request"
                    variant="primary"
                    icon="👤"
                    callback={openMedReq}
                />
            </div>
            <div className="box1">
                {/* Check Status */}
                <Card 
                    title="Check Status"
                    description="View pending and approved request"
                    variant="primary"
                    icon =" "
                />
            </div> 
        </div>
    );
}

function BottomRow() {
    return (
        <div className="bottom-row">
            <div className="box2">
                {/* Total Patients */}
                <Card 
                    title="Total Patients"
                    description="24 persons"
                    icon=" "
                />
            </div>
            <div className="box2">
                {/* Pending */}
                <Card 
                    title="Pending"
                    description="5 pending requests"
                    icon=""
                />
            </div>
            <div className="box2">
                {/* active access */}
                <Card 
                    title="Bookings"
                    description="3 Upcoming Appointments"
                    icon=""
                />
            </div>
            <div className="box2">
                {/* Chatbot */}
                <Card 
                    title="Chatbot"
                    description="FAQs & Assistance"
                    icon=""
                />
            </div>
        </div>
    );
}