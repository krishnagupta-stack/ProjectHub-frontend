import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../api/axios";
import "../styles/ProjectDetails.css";

const ProjectDetails = () => {
    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProject();
    }, [id]);

    const getProject = async () => {
        try {
            const res = await API.get(`/projects/${id}`);
            setProject(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="details-page">
                <h2>Loading Project...</h2>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="details-page">
                <h2>Project Not Found</h2>

                <Link to="/">
                    ← Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="details-page">

            <div className="details-card">

                {project.image ? (
                    <img
                        src={`http://localhost:5000${project.image}`}
                        alt={project.title}
                    />
                ) : (
                    <div className="details-no-image">
                        No Project Image
                    </div>
                )}

                <div className="details-content">

                    <Link
                        to="/"
                        className="back-link"
                    >
                        ← Back to Projects
                    </Link>

                    <h1>{project.title}</h1>

                    <p className="details-description">
                        {project.description}
                    </p>

                    <div className="details-info">

                        <p>
                            <strong>Technology:</strong>{" "}
                            {project.technology}
                        </p>

                        <p>
                            <strong>Category:</strong>{" "}
                            {project.category}
                        </p>

                        <p>
                            <strong>Guide:</strong>{" "}
                            {project.guideName || "Not Provided"}
                        </p>

                        {project.createdBy && (
                            <p>
                                <strong>Uploaded By:</strong>{" "}
                                {project.createdBy.name}
                            </p>
                        )}

                    </div>

                    <div className="details-buttons">

                        {project.githubLink && (
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noreferrer"
                                className="github-btn"
                            >
                                GitHub Repository
                            </a>
                        )}

                        {project.pdf && (
                            <a
                                href={`http://localhost:5000${project.pdf}`}
                                target="_blank"
                                rel="noreferrer"
                                className="pdf-btn"
                            >
                                📄 View Project PDF
                            </a>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProjectDetails;