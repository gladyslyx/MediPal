import "./CSS/Biomarker.css";
import { useState } from "react";
import {
    LineChart, Line, BarChart, Bar,
    XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function BiomarkerPage() {

    const [selectedMetric, setSelectedMetric] = useState(null);

    return (
        <div className="biomarker-page">

            <div className="bio-header">
                <div>
                    <h1>Biomarker Dashboard</h1>
                    <p style={{ color: "black" }}>Track your health data from connected devices</p>
                </div>
                <span className="sync">Synced 2 mins ago</span>
            </div>

            <div className="bio-grid">

                <MetricCard
                    title="Steps"
                    value="6,583 steps"
                    progress="85%"
                    onClick={() => setSelectedMetric("steps")}
                />

                <MetricCard
                    title="Heart Rate"
                    value="73 bpm"
                    progress="85%"
                    onClick={() => setSelectedMetric("heart")}
                />

                <MetricCard
                    title="Sleep Time"
                    value="7.5 hours"
                    progress="70%"
                    onClick={() => setSelectedMetric("sleep")}
                />

                <MetricCard
                    title="Blood Oxygen"
                    value="97%"
                    progress="50%"
                    onClick={() => setSelectedMetric("oxygen")}
                />

                <MetricCard 
                    title="Stress Level" 
                    value="36/100" 
                    progress="70%"
                    onClick={() => setSelectedMetric("stress")}
                />

                <MetricCard 
                    title="Calories Burnt" 
                    value="503 kcal" 
                    progress="70%"
                    onClick={() => setSelectedMetric("calories")}
                />

                <MetricCard 
                    title="Cycles" 
                    value="18 Nov 2025" 
                    progress="67%"
                    onClick={() => setSelectedMetric("cycle")}
                />

                <MetricCard 
                    title="BMI" 
                    value="20.3" 
                    progress="59%"
                    onClick={() => setSelectedMetric("bmi")}
                />
        
            </div>

            {selectedMetric && (
                <DataModal
                    type={selectedMetric}
                    onClose={() => setSelectedMetric(null)}
                />
            )}

        </div>
    );
}

function MetricCard({ title, value, progress, onClick }) {
    return (
        <div className="metric-card" onClick={onClick}>
            <h3>{title}</h3>
            <h2>{value}</h2>

            {progress && (
                <div className="progress-bar">
                    <div style={{ width: progress }}></div>
                </div>
            )}
        </div>
    );
}

/* ================= POPUP GRAPH ================= */

function DataModal({ type, onClose }) {

    const [period, setPeriod] = useState("daily");

    const data = getData(type, period);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>

                <button className="close-button" onClick={onClose}>✕</button>

                <h2>{type.toUpperCase()} DATA</h2>

                <div className="tabs">
                    {["daily", "weekly", "monthly"].map(p => (
                        <button
                            key={p}
                            className={period === p ? "active" : ""}
                            onClick={() => setPeriod(p)}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                <div className="chart-container">

                    <ResponsiveContainer width="100%" height={250}>
                        {type === "steps" ? (
                            <BarChart data={data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip contentStyle={{ background: "#fff", borderRadius: "10px" }}
                                            labelStyle={{ color: "#000" }}/>
                                <Bar dataKey="value" fill="#AA2B3A" />
                            </BarChart>
                        ) : (
                            <LineChart data={data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip contentStyle={{ background: "#fff", borderRadius: "10px" }}
                                            labelStyle={{ color: "#000" }}/>
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#AA2B3A"
                                    strokeWidth={3}
                                />
                            </LineChart>
                        )}
                    </ResponsiveContainer>

                </div>
            </div>
        </div>
    );
}

/* ================= MOCK DATA ================= */

function getData(type, period) {

    const base = {
        daily: [
            { name: "9AM", value: 60 },
            { name: "12PM", value: 80 },
            { name: "3PM", value: 75 },
            { name: "6PM", value: 90 },
            { name: "9PM", value: 65 },
        ],
        weekly: [
            { name: "Mon", value: 8000 },
            { name: "Tue", value: 9500 },
            { name: "Wed", value: 7000 },
            { name: "Thu", value: 10000 },
            { name: "Fri", value: 9800 },
            { name: "Sat", value: 12000 },
            { name: "Sun", value: 8500 },
        ],
        monthly: [
            { name: "Week1", value: 50000 },
            { name: "Week2", value: 60000 },
            { name: "Week3", value: 55000 },
            { name: "Week4", value: 70000 },
        ]
    };

    return base[period];
}