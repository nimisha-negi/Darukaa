import { MdVisibility, MdDelete, MdLocationOn, MdAccessTime, MdPublic, MdGrass, MdLocalFireDepartment, MdWater, MdTerrain } from "react-icons/md";
import { formatDateIST } from "../../utils/dateUtils";

export default function ProjectCard({ project, onView, onDelete }) {
  // Simple icon mapper
  const getIcon = (iconName) => {
    const icons = {
      "MdPublic": <MdPublic size={24} />,
      "MdGrass": <MdGrass size={24} />,
      "MdLocalFireDepartment": <MdLocalFireDepartment size={24} />,
      "MdWater": <MdWater size={24} />,
      "MdTerrain": <MdTerrain size={24} />,
      "🌍": <MdPublic size={24} />,
      "🌿": <MdGrass size={24} />,
      "🔥": <MdLocalFireDepartment size={24} />,
      "💧": <MdWater size={24} />,
      "🌱": <MdTerrain size={24} />,
    };
    return icons[iconName] || <MdPublic size={24} />;
  };

  return (
    <div className="project-card" onClick={onView}>
      <div className="card-top">
        <span className="project-icon">{getIcon(project.icon)}</span>
        <h4>{project.title}</h4>
      </div>

      <p className="description">{project.description}</p>

      <div className="card-meta">
        <p className="sites"><MdLocationOn /> {project.sites} sites</p>
        <p className="updated"><MdAccessTime /> {formatDateIST(project.updated)}</p>
      </div>

      <div className="card-actions">
        <button className="view-btn" onClick={(e) => { e.stopPropagation(); onView(); }}>
          <MdVisibility /> View
        </button>
        <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
          <MdDelete /> Delete
        </button>
      </div>
    </div>
  );
}
