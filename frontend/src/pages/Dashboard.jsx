import { useState } from "react";
import "./Dashboard.css"
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Projects from "../components/dashboard/Projects";
import Analytics from "../components/dashboard/Analytics";
import DashLanding from "../components/dashboard/DashLanding";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashlanding");
   const [selectedProject, setSelectedProject] = useState(null);

  
   const renderContent = () => {
    if (selectedProject) {
      return (
        <ProjectDetail
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
        />
      );
    }
    switch (activeTab) {
      case "dashlanding":
        return <DashLanding/>
      case "projects":
        return <Projects />;
      case "analytics":
        return <Analytics />;
      default:
        return <DashLanding />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="dashboard-main">
        <Navbar />
        <div className="dashboard-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
