import "./CSS/Biomarker.css";
import NavBar from "./NavBar";
import { useState, useRef } from "react";
import {
    LineChart, Line, BarChart, Bar,
    XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function BiomarkerPage() {

    const [selectedMetric, setSelectedMetric] = useState(null);
    const pageRef = useRef();

    /* ================= EXPORT PDF ================= */
    const handleExport = async () => {
        const canvas = await html2canvas(pageRef.current);
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, width, height);
        pdf.save("MediPal_Report.pdf");
    };

    return (
        <div className="biomarker-page">
            <NavBar />

            <div className="biomarker-content" ref={pageRef}>

                {/* HEADER */}
                <div className="header-row">
                    <div>
                        <h1>Biomarker Dashboard</h1>
                        <p>Track your health data from connected devices</p>
                    </div>

                    <div className="sync-status">
                        Synced 2 mins ago
                    </div>
                </div>

                {/* GRID */}
                <div className="grid">

                    <Card title="Steps" value="6,583 steps" progress={65} onClick={() => setSelectedMetric("steps")} />
                    <Card title="Heart Rate" value="73 bpm" progress={70} onClick={() => setSelectedMetric("heart")} />
                    <Card title="Sleep Time" value="7.5 hours" progress={80} onClick={() => setSelectedMetric("sleep")} />
                    <Card title="Blood Oxygen" value="97%" progress={90} onClick={() => setSelectedMetric("oxygen")} />

                    <Card title="Stress Level" value="36/100" progress={40} onClick={() => setSelectedMetric("stress")} />
                    <Card title="Calories Burnt" value="503 kcal" progress={60} onClick={() => setSelectedMetric("calories")} />
                    <Card title="Cycles" value="18 Nov 2025" progress={75} onClick={() => setSelectedMetric("cycle")} />
                    <Card title="BMI" value="20.3" progress={65} onClick={() => setSelectedMetric("bmi")} />

                </div>

                {/* EXPORT BUTTON */}
                <div className="export-section">
                    <button className="export-btn" onClick={handleExport}>
                        Export Report (PDF)
                    </button>
                </div>

                {/* POPUP GRAPH */}
                {selectedMetric && (
                    <DataModal
                        type={selectedMetric}
                        onClose={() => setSelectedMetric(null)}
                    />
                )}
            </div>
        </div>
    );
}


/* ================= CARD ================= */

function Card({ title, value, progress, onClick }) {
    return (
        <div className="card" onClick={onClick}>
            <h3>{title}</h3>
            <h2>{value}</h2>

            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}


/* ================= MODAL GRAPH ================= */

function DataModal({ type, onClose }) {

    const [period, setPeriod] = useState("weekly");
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
                    <ResponsiveContainer width="100%" height={300}>

                        {type === "steps" || type === "calories" ? (
                            <BarChart data={data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#AA2B3A" />
                            </BarChart>
                        ) : (
                            <LineChart data={data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#28314E"
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


/* ================= FULL DATA (ALL 8 METRICS) ================= */

function getData(type, period) {

    const datasets = {

        /* ================= STEPS ================= */
        steps: {
            daily: [
                { name: "9AM", value: 1200 },
                { name: "12PM", value: 3500 },
                { name: "3PM", value: 5000 },
                { name: "6PM", value: 8000 },
                { name: "9PM", value: 6583 }
            ],
            weekly: [
                { name: "Mon", value: 8000 },
                { name: "Tue", value: 9500 },
                { name: "Wed", value: 7000 },
                { name: "Thu", value: 10000 },
                { name: "Fri", value: 9800 },
                { name: "Sat", value: 12000 },
                { name: "Sun", value: 6583 }
            ],
            monthly: [
                { name: "Week1", value: 50000 },
                { name: "Week2", value: 60000 },
                { name: "Week3", value: 55000 },
                { name: "Week4", value: 70000 }
            ]
        },

        /* ================= HEART ================= */
        heart: {
            daily: [
                { name: "9AM", value: 65 },
                { name: "12PM", value: 75 },
                { name: "3PM", value: 72 },
                { name: "6PM", value: 85 },
                { name: "9PM", value: 70 }
            ],
            weekly: [
                { name: "Mon", value: 70 },
                { name: "Tue", value: 72 },
                { name: "Wed", value: 75 },
                { name: "Thu", value: 73 },
                { name: "Fri", value: 78 },
                { name: "Sat", value: 76 },
                { name: "Sun", value: 73 }
            ],
            monthly: [
                { name: "Week1", value: 72 },
                { name: "Week2", value: 74 },
                { name: "Week3", value: 73 },
                { name: "Week4", value: 75 }
            ]
        },

        /* ================= SLEEP ================= */
        sleep: {
            daily: [
                { name: "Mon", value: 7 },
                { name: "Tue", value: 6.5 },
                { name: "Wed", value: 7.5 },
                { name: "Thu", value: 6 },
                { name: "Fri", value: 8 },
                { name: "Sat", value: 7.8 },
                { name: "Sun", value: 7.5 }
            ],
            weekly: [
                { name: "Week1", value: 7 },
                { name: "Week2", value: 6.8 },
                { name: "Week3", value: 7.2 },
                { name: "Week4", value: 7.5 }
            ],
            monthly: [
                { name: "Jan", value: 7 },
                { name: "Feb", value: 6.9 },
                { name: "Mar", value: 7.3 },
                { name: "Apr", value: 7.5 }
            ]
        },

        /* ================= OXYGEN ================= */
        oxygen: {
            daily: [
                { name: "9AM", value: 96 },
                { name: "12PM", value: 97 },
                { name: "3PM", value: 98 },
                { name: "6PM", value: 97 },
                { name: "9PM", value: 97 }
            ],
            weekly: [
                { name: "Mon", value: 97 },
                { name: "Tue", value: 96 },
                { name: "Wed", value: 97 },
                { name: "Thu", value: 98 },
                { name: "Fri", value: 97 },
                { name: "Sat", value: 98 },
                { name: "Sun", value: 97 }
            ],
            monthly: [
                { name: "Week1", value: 97 },
                { name: "Week2", value: 96 },
                { name: "Week3", value: 98 },
                { name: "Week4", value: 97 }
            ]
        },

        /* ================= STRESS ================= */
        stress: {
            daily: [
                { name: "9AM", value: 30 },
                { name: "12PM", value: 50 },
                { name: "3PM", value: 60 },
                { name: "6PM", value: 70 },
                { name: "9PM", value: 36 }
            ],
            weekly: [
                { name: "Mon", value: 40 },
                { name: "Tue", value: 55 },
                { name: "Wed", value: 60 },
                { name: "Thu", value: 50 },
                { name: "Fri", value: 70 },
                { name: "Sat", value: 45 },
                { name: "Sun", value: 36 }
            ],
            monthly: [
                { name: "Week1", value: 50 },
                { name: "Week2", value: 55 },
                { name: "Week3", value: 60 },
                { name: "Week4", value: 45 }
            ]
        },

        /* ================= CALORIES ================= */
        calories: {
            daily: [
                { name: "Morning", value: 150 },
                { name: "Lunch", value: 200 },
                { name: "Afternoon", value: 100 },
                { name: "Evening", value: 250 },
                { name: "Night", value: 503 }
            ],
            weekly: [
                { name: "Mon", value: 400 },
                { name: "Tue", value: 520 },
                { name: "Wed", value: 480 },
                { name: "Thu", value: 600 },
                { name: "Fri", value: 550 },
                { name: "Sat", value: 700 },
                { name: "Sun", value: 503 }
            ],
            monthly: [
                { name: "Week1", value: 3500 },
                { name: "Week2", value: 4200 },
                { name: "Week3", value: 3900 },
                { name: "Week4", value: 4500 }
            ]
        },

        /* ================= CYCLE ================= */
        cycle: {
            daily: [
                { name: "Day1", value: 1 },
                { name: "Day5", value: 5 },
                { name: "Day10", value: 10 },
                { name: "Day15", value: 15 },
                { name: "Day18", value: 18 }
            ],
            weekly: [
                { name: "Week1", value: 1 },
                { name: "Week2", value: 5 },
                { name: "Week3", value: 10 },
                { name: "Week4", value: 18 }
            ],
            monthly: [
                { name: "Jan", value: 28 },
                { name: "Feb", value: 27 },
                { name: "Mar", value: 29 },
                { name: "Apr", value: 28 }
            ]
        },

        /* ================= BMI ================= */
        bmi: {
            daily: [
                { name: "Mon", value: 20.1 },
                { name: "Tue", value: 20.2 },
                { name: "Wed", value: 20.2 },
                { name: "Thu", value: 20.3 },
                { name: "Fri", value: 20.3 }
            ],
            weekly: [
                { name: "Week1", value: 20.1 },
                { name: "Week2", value: 20.2 },
                { name: "Week3", value: 20.3 },
                { name: "Week4", value: 20.3 }
            ],
            monthly: [
                { name: "Jan", value: 20.1 },
                { name: "Feb", value: 20.2 },
                { name: "Mar", value: 20.3 },
                { name: "Apr", value: 20.3 }
            ]
        }

    };

    return datasets[type]?.[period] || [];
}