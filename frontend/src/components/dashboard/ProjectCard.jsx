export default function ProjectCard({ project, onView, onDelete }) {
  return (
    <div className="project-card">
      <div className="card-top">
        <span className="project-icon">{project.icon}</span>
        <h4>{project.title}</h4>
      </div>

      <p className="description">{project.description}</p>
      <p className="sites">📍 {project.sites} sites</p>
      <p className="updated">Last updated: {project.updated_at}</p>

      <div className="card-actions">
        <button className="view-btn" onClick={onView}>
          View
        </button>
        <button className="delete-btn" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
