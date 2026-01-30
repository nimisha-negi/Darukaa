import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function SiteAnalytics({ site, projectName, onClose }) {
  if (!site) return null;

  const labels = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
  const carbonData = [1000, 5000, 10000, 30000, 40000, 45000, 60000, 80000, 120000];
  const biodiversityData = [60, 70, 95, 75, 90, 78, 85, 92, 80];

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
    scales: {
      x: { grid: { color: "#eee" } },
      y: { grid: { color: "#eee" } },
    },
  };

  const area = (Math.random() * 5000 + 1500).toFixed(2);
  const treeCount = Math.floor(Math.random() * 500000 + 150000);
  const vegetation = (Math.random() * 30 + 60).toFixed(1);
  const soilCarbon = (Math.random() * 5 + 1).toFixed(2);

  return (
    <div className="analytics-overlay">
  <div className="analytics-card">
    <button className="close-btn" onClick={onClose}>×</button>

    <div className="modal-scroll">
      <h2>{projectName} - {site.name}</h2>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card">
          <h4>Site Overview</h4>
          <div className="metric-row"><span>Area</span><strong>{area} hectares</strong></div>
          <div className="metric-row"><span>Carbon Sequestration</span><strong>{carbonData.at(-1)} tonnes</strong></div>
          <div className="metric-row"><span>Biodiversity Score</span><strong>{biodiversityData.at(-1)}</strong></div>
          <div className="metric-row"><span>Created</span><strong>{new Date().toLocaleDateString()}</strong></div>
        </div>

        <div className="metric-card">
          <h4>Latest Metrics</h4>
          <div className="metric-row"><span>Tree Count</span><strong>{treeCount.toLocaleString()}</strong></div>
          <div className="metric-row"><span>Vegetation Cover</span><strong>{vegetation}%</strong></div>
          <div className="metric-row"><span>Soil Carbon</span><strong>{soilCarbon}%</strong></div>
          <div className="metric-row"><span>Last Updated</span><strong>{new Date().toLocaleDateString()}</strong></div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h4>Carbon Sequestration Over Time</h4>
          <Line data={{ labels, datasets: [{ label: "Carbon Sequestration", data: carbonData, borderColor: "#4caf50", backgroundColor: "rgba(76,175,80,0.2)", pointRadius: 4, tension: 0.3 }]}} options={chartOptions} />
        </div>

        <div className="chart-card">
          <h4>Biodiversity Score Over Time</h4>
          <Line data={{ labels, datasets: [{ label: "Biodiversity Score", data: biodiversityData, borderColor: "#2196f3", backgroundColor: "rgba(33,150,243,0.2)", pointRadius: 4, tension: 0.3 }]}} options={chartOptions} />
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
