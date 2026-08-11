import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import "../styles/From.css";

const EditProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        technology: "",
        category: "",
        guideName: "",
        githubLink: ""
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProject();
    }, [id]);

    const getProject = async () => {
        try {
            const res = await API.get(`/projects/${id}`);

            const project = res.data;

            setFormData({
                title: project.title || "",
                description: project.description || "",
                technology: project.technology || "",
                category: project.category || "",
                guideName: project.guideName || "",
                githubLink: project.githubLink || ""
            });

            setLoading(false);

        } catch (error) {
            console.log(error);
            alert("Project Load Failed");
            navigate("/dashboard");
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            await API.put(
                `/projects/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Project Updated Successfully");

            navigate("/dashboard");

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Project Update Failed"
            );
        }
    };

    if (loading) {
        return <div className="form-page">Loading...</div>;
    }

    return (
        <div className="form-page">

            <div className="form-card">

                <h1>Edit Project</h1>

                <p className="form-subtitle">
                    Update your project details
                </p>

                <form onSubmit={handleSubmit}>

                    <label>Project Title</label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <label>Description</label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <label>Technology</label>

                    <input
                        type="text"
                        name="technology"
                        value={formData.technology}
                        onChange={handleChange}
                        required
                    />

                    <label>Category</label>

                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />

                    <label>Guide Name</label>

                    <input
                        type="text"
                        name="guideName"
                        value={formData.guideName}
                        onChange={handleChange}
                    />

                    <label>GitHub Link</label>

                    <input
                        type="url"
                        name="githubLink"
                        value={formData.githubLink}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="submit-btn"
                    >
                        Update Project
                    </button>

                </form>

            </div>

        </div>
    );
};

export default EditProject;