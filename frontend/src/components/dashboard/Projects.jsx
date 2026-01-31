import { useEffect, useState, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import Site from "./Site";
import "./projects.css";
import { getProjects, createProject, deleteProject } from "../../api/project";
import { toast } from "react-toastify";
import { MdAdd, MdClose, MdPlace, MdAccessTime } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";

import { formatDateIST } from "../../utils/dateUtils";

const normalizeProject = (p) => ({
  ...p,
  sitesData: Array.isArray(p?.sitesData) ? p.sitesData : [],
  sites: typeof p?.sites === "number" ? p.sites : (p?.sitesData?.length || 0),
  updated: p?.updated || new Date().toISOString(),
});

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    icon: "MdPublic",
    description: "",
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAddSiteModal, setShowAddSiteModal] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        const normalized = Array.isArray(data) ? data.map(normalizeProject) : [];
        setProjects(normalized);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchProjects();
  }, []);

  const handleCreateProject = async () => {
    if (!newProject.title.trim()) return;

    try {
      const created = await createProject(newProject);

      const normalizedCreated = normalizeProject(created);

      setProjects([normalizedCreated, ...projects]);
      toast.success("Project added successfully!");
      setNewProject({ title: "", icon: "MdPublic", description: "" });
      setShowCreateModal(false);
    } catch (err) {
      console.error(err.message);
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      toast.success("Project deleted!");
      setProjects((prev) => prev.filter((p) => p.id !== id));

      if (selectedProject?.id === id) {
        setSelectedProject(null);
        setShowAddSiteModal(false);
      }
    } catch (err) {
      console.error(err.message);
      toast.error(err.message);
    }
  };

  // Helper for modal date
  const formattedUpdatedDate = useMemo(() => {
    return formatDateIST(selectedProject?.updated);
  }, [selectedProject]);

  return (
    <div>
      {/* HEADER */}
      <div className="projects-header">
        <button
          className="new-project-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <MdAdd size={20} style={{ marginRight: "5px" }} /> Create Project
        </button>
      </div>

      {/* GRID */}
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onView={() => setSelectedProject(normalizeProject(project))}
            onDelete={() => handleDelete(project.id)}
          />
        ))}
      </div>

      {/* CREATE PROJECT MODAL */}
      {showCreateModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowCreateModal(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Project</h3>
            </div>

            <label>Project Name</label>
            <input
              type="text"
              placeholder="Eg. Wildlife Monitoring"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
            />

            <label>Description</label>
            <textarea
              placeholder="Project description"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
            />

            <label>Choose Icon</label>
            <select
              value={newProject.icon}
              onChange={(e) =>
                setNewProject({ ...newProject, icon: e.target.value })
              }
            >
              <option value="MdPublic">🌍 Earth</option>
              <option value="MdGrass">🌿 Green</option>
              <option value="MdLocalFireDepartment">🔥 Heat</option>
              <option value="MdWater">💧 Water</option>
              <option value="MdTerrain">🌱 Growth</option>
            </select>

            <div className="modal-actions">
              <button onClick={() => setShowCreateModal(false)}>Cancel</button>
              <button onClick={handleCreateProject} className="primary-btn">Create</button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW PROJECT MODAL */}
      {selectedProject && !showAddSiteModal && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedProject(null)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedProject.title}</h3>
            <p>{selectedProject.description}</p>

            <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <MdPlace /> Sites: {selectedProject?.sites ?? 0}
            </p>

            <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <MdAccessTime /> Last updated: {formattedUpdatedDate}
            </p>

            <div className="modal-actions">
              <button onClick={() => setSelectedProject(null)}>Close</button>
              <button onClick={() => setShowAddSiteModal(true)}>
                Add Sites
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SITE MAP MODAL */}
      {showAddSiteModal && selectedProject && (
        <Site
          // ✅ CHANGE 7: ensure project passed to Site ALWAYS has sitesData array
          project={normalizeProject(selectedProject)}
          onClose={() => setShowAddSiteModal(false)}
          onSaveSites={(sitesData) => {
            const safeSitesData = Array.isArray(sitesData) ? sitesData : [];

            // ✅ CHANGE 8: update projects list with sitesData
            setProjects((prev) =>
              prev.map((p) =>
                p.id === selectedProject.id
                  ? {
                    ...p,
                    sitesData: safeSitesData,
                    sites: safeSitesData.length,
                    updated: "Just now",
                  }
                  : p
              )
            );

            // ✅ CHANGE 9: update selectedProject also so it stays synced
            setSelectedProject((prev) =>
              prev
                ? {
                  ...prev,
                  sitesData: safeSitesData,
                  sites: safeSitesData.length,
                  updated: "Just now",
                }
                : prev
            );
          }}
        />
      )}
    </div>
  );
}
