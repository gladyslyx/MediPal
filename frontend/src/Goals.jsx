import "./CSS/Goals.css";
import { Moon, Droplet, Footprints, Flame } from "lucide-react";

export default function Goals({ onClose }) {
    return (
        <div className="goals-overlay">
            <div className="goals-card">

                <button className="close-button" onClick={onClose}>✕</button>

                <h2 className="goals-title">Goals and Achievements</h2>
                <p className="goals-subtitle">
                    Set targets and track your progress
                </p>

                {/* SCROLLABLE CONTENT */}
                <div className="goals-content">

                    <Achievements />

                    <GoalItem
                        icon={<Footprints size={20} />}
                        title="Daily Steps"
                        current="8542 steps"
                        target="10000 steps"
                        progress={86}
                    />

                    <GoalItem
                        icon={<Flame size={20} />}
                        title="Calorie Burn"
                        current="1550 cal/day"
                        target="2200 cal/day"
                        progress={68}
                    />

                    {/* You can add more here → scroll will handle it */}

                </div>

            </div>
        </div>
    );
}

/* ===== ACHIEVEMENTS ===== */

function Achievements() {
    return (
        <div className="achievements-row">

            <AchievementCard
                icon={<Moon size={22} />}
                title="Sleep Master"
                desc="Achieved 8+ hours of sleep for 14 days"
            />

            <AchievementCard
                icon={<Footprints size={22} />}
                title="First Steps"
                desc="Achieved your first 10,000 steps in a day"
            />

            <AchievementCard
                icon={<Droplet size={22} />}
                title="Hydration Hero"
                desc="Met daily water intake goal for 21 days"
            />

        </div>
    );
}

function AchievementCard({ icon, title, desc }) {
    return (
        <div className="achievement-card">
            <div className="achievement-icon">{icon}</div>
            <h4>{title}</h4>
            <p>{desc}</p>
        </div>
    );
}

/* ===== GOAL ITEM ===== */

function GoalItem({ icon, title, current, target, progress }) {
    return (
        <div className="goal-item">

            <div className="goal-header">
                <div className="goal-title">
                    {icon}
                    <span>{title}</span>
                </div>
            </div>

            <div className="goal-info">
                <div>
                    <p>Current</p>
                    <p>Target</p>
                </div>

                <div className="goal-values">
                    <p>{current}</p>
                    <p>{target}</p>
                </div>
            </div>

            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <div className="progress-text">{progress}%</div>

        </div>
    );
}