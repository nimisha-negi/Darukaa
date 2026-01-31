import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
);

export default function SiteAnalytics({ site, projectName, onClose }) {
  const [metrics, setMetrics] = React.useState({
    area: "0",
    treeCount: 0,
    vegetation: "0",
    soilCarbon: "0",
  });

  React.useEffect(() => {
    setMetrics({
      area: (Math.random() * 5000 + 1500).toFixed(2),
      treeCount: Math.floor(Math.random() * 500000 + 150000),
      vegetation: (Math.random() * 30 + 60).toFixed(1),
      soilCarbon: (Math.random() * 5 + 1).toFixed(2),
    });
  }, []);

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


  // ✅ Doughnut chart (Carbon Storage Breakdown)
  const carbonBreakdownData = {
    labels: ["Soil Carbon", "Tree Biomass", "Grassland", "Wetlands"],
    datasets: [
      {
        label: "Carbon Share",
        data: [35, 40, 15, 10],
        backgroundColor: [
          "rgba(46,125,50,0.75)",
          "rgba(25,118,210,0.75)",
          "rgba(255,193,7,0.75)",
          "rgba(156,39,176,0.75)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    },
    cutout: "65%",
  };

  // ✅ Bar chart (Monthly Carbon)
  const carbonBarData = {
    labels,
    datasets: [
      {
        label: "Monthly Carbon (tonnes)",
        data: carbonData,
        backgroundColor: "rgba(46,125,50,0.55)",
        borderRadius: 10,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#eee" } },
    },
  };

  // ✅ Line chart (Biodiversity trend)
  const biodiversityLineData = {
    labels,
    datasets: [
      {
        label: "Biodiversity Score",
        data: biodiversityData,
        borderColor: "#1976d2",
        backgroundColor: "rgba(25,118,210,0.15)",
        pointRadius: 4,
        tension: 0.35,
      },
    ],
  };

  return (
    <div className="sa-overlay" onClick={onClose}>
      <div className="sa-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sa-header">
          <div className="sa-title">
            <h2>
              {projectName} — <span>{site.name}</span>
            </h2>
            <p className="sa-subtitle">Site Analytics Overview</p>
          </div>

          <button className="sa-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Scroll only inside card */}
        <div className="sa-scroll">
          {/* Metrics */}
          <div className="sa-metrics-grid">
            <div className="sa-metric-card">
              <h4>Site Overview</h4>
              <div className="sa-metric-row">
                <span>Area</span>
                <strong>{metrics.area} hectares</strong>
              </div>
              <div className="sa-metric-row">
                <span>Total Carbon</span>
                <strong>{carbonData.at(-1)} tonnes</strong>
              </div>
              <div className="sa-metric-row">
                <span>Biodiversity Score</span>
                <strong>{biodiversityData.at(-1)}</strong>
              </div>
              <div className="sa-metric-row">
                <span>Created</span>
                <strong>{new Date().toLocaleDateString()}</strong>
              </div>
            </div>

            <div className="sa-metric-card">
              <h4>Latest Metrics</h4>
              <div className="sa-metric-row">
                <span>Tree Count</span>
                <strong>{metrics.treeCount.toLocaleString()}</strong>
              </div>
              <div className="sa-metric-row">
                <span>Vegetation Cover</span>
                <strong>{metrics.vegetation}%</strong>
              </div>
              <div className="sa-metric-row">
                <span>Soil Carbon</span>
                <strong>{metrics.soilCarbon}%</strong>
              </div>
              <div className="sa-metric-row">
                <span>Last Updated</span>
                <strong>{new Date().toLocaleDateString()}</strong>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="sa-charts-grid">
            {/* Doughnut */}
            <div className="sa-chart-card">
              <h4>Carbon Storage Breakdown</h4>
              <Doughnut data={carbonBreakdownData} options={doughnutOptions} />
            </div>

            {/* Bar */}
            <div className="sa-chart-card">
              <h4>Monthly Carbon Sequestration</h4>
              <Bar data={carbonBarData} options={barOptions} />
            </div>

            {/* Line */}
            <div className="sa-chart-card sa-chart-wide">
              <h4>Biodiversity Score Trend</h4>
              <Line data={biodiversityLineData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
