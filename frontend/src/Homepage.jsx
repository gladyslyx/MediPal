import "./Homepage.css";
import UserProfile from "./UserProfile";

export default function Homepage() {

    return (
        <div className="homepage">
            
            {/* <Navbar /> */}
            <div className="content">
                <h1>Welcome back, Olivia</h1>
                <p>Here's your health overview for today.</p>
                <TopRow />
                <BottomRow />
            </div>
        </div>
    );
}

function Card({title, description,variant, icon}){
    return (
        <div className= {`Card ${variant === "primary" ? "card-primary" : "card-secondary"}`}>
            <div className="card-icon">
                {icon}
            </div>
            <h2>{title}</h2>
            <p>{description}</p>
            <span className="open"> Open &gt; </span>
        </div>
    );
}

function TopRow() {
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
                />
            </div>
            <div className="box1">
                {/* profile management */}
                <Card
                    title="Profile Management"
                    description="View and manage family health profiles"
                    variant="primary"
                    icon="👤" 
                />
            </div>  
        </div>
    );
}

function BottomRow() {
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
            <div className="box3">
            {/* chatbot ****figure diff css */}
            <Card 
                title="Chatbot"
                description="FAQs & Assistance"
                icon="🤖"
            />
            </div>
        </div>
    );
}