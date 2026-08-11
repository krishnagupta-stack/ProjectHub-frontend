import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/From.css";

const AddProject = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        technology: "",
        category: "",
        guideName: "",
        githubLink: ""
    });

    const [image, setImage] = useState(null);
    const [pdf, setPdf] = useState(null);

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

            const data = new FormData();

            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("technology", formData.technology);
            data.append("category", formData.category);
            data.append("guideName", formData.guideName);
            data.append("githubLink", formData.githubLink);

            if (image) {
                data.append("image", image);
            }

            if (pdf) {
                data.append("pdf", pdf);
            }

            await API.post("/projects", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Project Added Successfully");

            navigate("/dashboard");

        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Project Add Failed"
            );
        }
    };

    return (
        <div className="form-page">

            <div className="form-card">

                <h1>Add New Project</h1>

                <p className="form-subtitle">
                    Upload your project details to ProjectHub
                </p>

                <form onSubmit={handleSubmit}>

                    <label>Project Title</label>

                    <input
                        type="text"
                        name="title"
                        placeholder="Enter project title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <label>Description</label>

                    <textarea
                        name="description"
                        placeholder="Describe your project"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <label>Technology</label>

                    <input
                        type="text"
                        name="technology"
                        placeholder="Example: React, Node.js, MongoDB"
                        value={formData.technology}
                        onChange={handleChange}
                        required
                    />

                    <label>Category</label>

                    <input
                        type="text"
                        name="category"
                        placeholder="Example: Web Development"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />

                    <label>Guide Name</label>

                    <input
                        type="text"
                        name="guideName"
                        placeholder="Enter guide name"
                        value={formData.guideName}
                        onChange={handleChange}
                    />

                    <label>GitHub Link</label>

                    <input
                        type="url"
                        name="githubLink"
                        placeholder="https://github.com/..."
                        value={formData.githubLink}
                        onChange={handleChange}
                    />

                    {/* Image Upload */}

                    <label>Project Image</label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    {/* PDF Upload */}

                    <label>Project PDF</label>

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setPdf(e.target.files[0])}
                    />

                    <button
                        type="submit"
                        className="submit-btn"
                    >
                        Add Project
                    </button>

                </form>

            </div>

        </div>
    );
};

export default AddProject;