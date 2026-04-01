export function checkBiomarkers(data) {
    const alerts = [];

    if (data.heartRate > 100) {
        alerts.push({
            type: "High Heart Rate",
            message: "Your heart rate is elevated. Consider resting or deep breathing."
        });
    }

    if (data.sleep < 5) {
        alerts.push({
            type: "Low Sleep",
            message: "You are sleep deprived. Try to rest earlier tonight."
        });
    }

    if (data.steps < 2000) {
        alerts.push({
            type: "Low Activity",
            message: "You have low activity today. A short walk is recommended."
        });
    }

    return alerts;
}