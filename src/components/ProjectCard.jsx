import { Link } from "react-router-dom";
import "../styles/Card.css";

const ProjectCard = ({ project }) => {
  return (
    <div className="card">

      <img
        src={project.image || "https://via.placeholder.com/350x200"}
        alt={project.title}
        className="card-image"
      />

      <div className="card-body">

        <h3>{project.title}</h3>

        <p>{project.description}</p>

        <span className="category">
          {project.category}
        </span>

        <br /><br />

        <Link
          to={`/project/${project._id}`}
          className="details-btn"
        >
          View Details
        </Link>

      </div>

    </div>
  );
};

export default ProjectCard;