import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import "../styles/Dashboard.css";

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await API.get("/projects/my-projects", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setProjects(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            await API.delete(`/projects/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Project Deleted Successfully");

            setProjects(
                projects.filter((project) => project._id !== id)
            );

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Delete Failed"
            );
        }
    };

    if (loading) {
        return (
            <div className="dashboard-page">
                <h2>Loading Projects...</h2>
            </div>
        );
    }

    return (
        <div className="dashboard-page">

            <div className="dashboard-header">

                <div>
                    <h1>My Projects</h1>
                    <p>
                        Manage all your uploaded projects
                    </p>
                </div>

                <Link
                    to="/add-project"
                    className="add-project-btn"
                >
                    + Add Project
                </Link>

            </div>

            {projects.length === 0 ? (

                <div className="empty-projects">
                    <h2>No Projects Found</h2>

                    <p>
                        You haven't uploaded any project yet.
                    </p>

                    <Link to="/add-project">
                        Upload Your First Project
                    </Link>
                </div>

            ) : (

                <div className="project-grid">

                    {projects.map((project) => (

                        <div
                            className="project-card"
                            key={project._id}
                        >

                            {project.image ? (
                                <img
                                    src={`http://localhost:5000${project.image}`}
                                    alt={project.title}
                                />
                            ) : (
                                <div className="no-image">
                                    No Image
                                </div>
                            )}

                            <div className="project-card-content">

                                <h2>{project.title}</h2>

                                <p>
                                    {project.description}
                                </p>

                                <div className="project-meta">
                                    <span>
                                        {project.technology}
                                    </span>

                                    <span>
                                        {project.category}
                                    </span>
                                </div>

                                <div className="project-actions">

                                    <Link
                                        to={`/project/${project._id}`}
                                        className="view-btn"
                                    >
                                        View
                                    </Link>

                                    <Link
                                        to={`/edit-project/${project._id}`}
                                        className="edit-btn"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() =>
                                            handleDelete(project._id)
                                        }
                                        className="delete-btn"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default Dashboard;