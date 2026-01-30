import { Line } from "react-chartjs-2";
import "./dash.css";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

export default function DashLanding() {
  const chartData = {
    labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        data: [12, 18, 25, 30, 45, 42, 60],
        fill: true,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76,175,80,0.25)",
        tension: 0.4,
      },
    ],
  };

  const activities = [
    { text: "Site Alpha: Updated Data Sets", date: "Apr 22" },
    { text: "Added New Biodiversity Report", date: "Apr 20" },
    { text: "Sensor Malfunction: Site Beta", date: "Apr 19" },
  ];

  return (
    <>
      <div className="dash">
        {/* Stats */}
        <div className="stats">
          <div className="card">
            <p>Total Sites</p>
            <h2>48</h2>
          </div>
          <div className="card">
            <p>Carbon Offset</p>
            <h2>10,500t</h2>
          </div>
          <div className="card">
            <p>Species Count</p>
            <h2>3,000+</h2>
          </div>
          <div className="card highlight">
            <p>Net Impact Score</p>
            <h2>A+</h2>
          </div>
        </div>

        {/* Middle */}
        <div className="middle">
          <div className="card">
            <h3>Carbon Sequestration Trends</h3>
            <Line data={chartData} options={{ plugins: { legend: { display: false } } }} />
          </div>

          <div className="card">
            <h3>Recent Activity</h3>
            <ul className="activity">
              {activities.map((a, i) => (
                <li key={i}>
                  <span className="dot" />
                  <div>
                    <p>{a.text}</p>
                    <small>{a.date}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Map */}
        <div className="card map">
          <h3>Active Environmental Sites</h3>
          <div className="map-box">🌍 Map Placeholder</div>
        </div>
      </div>
    </>
  );
}
