import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import "../styles/Home.css";

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = async () => {
        try {
            const res = await API.get("/projects");
            setProjects(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = async () => {
        try {
            if (keyword.trim() === "") {
                getProjects();
                return;
            }

            const res = await API.get(
                `/projects/search?keyword=${keyword}`
            );

            setProjects(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="home-page">

            <div className="home-header">

                <h1>ProjectHub</h1>

                <p>
                    Discover and explore projects created by students.
                </p>

                <div className="search-box">

                    <input
                        type="text"
                        placeholder="🔍 Search projects..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                    />

                    <button onClick={handleSearch}>
                        Search
                    </button>

                </div>

            </div>

            <div className="home-project-grid">

                {projects.length === 0 ? (

                    <div className="no-projects">

                        <h2>No Projects Found</h2>

                        <p>
                            Try searching for another project.
                        </p>

                    </div>

                ) : (

                    projects.map((project) => (

                        <div
                            className="home-project-card"
                            key={project._id}
                        >

                            {project.image ? (

                                <img
                                    src={`http://localhost:5000${project.image}`}
                                    alt={project.title}
                                />

                            ) : (

                                <div className="home-no-image">
                                    No Image
                                </div>

                            )}

                            <div className="home-card-content">

                                <h2>{project.title}</h2>

                                <p>
                                    {project.description}
                                </p>

                                <div className="home-tags">

                                    <span>
                                        {project.technology}
                                    </span>

                                    <span>
                                        {project.category}
                                    </span>

                                </div>

                                <Link
                                    to={`/project/${project._id}`}
                                    className="details-btn"
                                >
                                    View Details →
                                </Link>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
};

export default Home;