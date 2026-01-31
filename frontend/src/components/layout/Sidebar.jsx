import logo from "../../assets/logo.png";

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="dash-sidebar">
      <div className="sidebar-brand">
        <img src={logo} alt="Daruka Earth Logo" />
        <h2>Darukaa.Earth</h2>
      </div>

      <div className="sidebar-divider" />

      <nav className="sidebar-nav">
        <button
          className={activeTab === "dashlanding" ? "active" : ""}
          onClick={() => setActiveTab("dashlanding")}
        >
          Dashboard
        </button>
        <button
          className={activeTab === "projects" ? "active" : ""}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>

        <button
          className={activeTab === "analytics" ? "active" : ""}
          onClick={() => setActiveTab("analytics")}
        >
          Site Analytics
        </button>

      </nav>
    </aside>
  );
}
