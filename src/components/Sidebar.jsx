import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar">

            <h2 className="logo">
                ProjectHub
            </h2>

            <ul>

                <li>
                    <Link to="/">🏠 Home</Link>
                </li>

                <li>
                    <Link to="/dashboard">
                        📊 Dashboard
                    </Link>
                </li>

                <li>
                    <Link to="/add-project">
                        ➕ Add Project
                    </Link>
                </li>

                <li>
                    <Link to="/login">
                        🔐 Login
                    </Link>
                </li>

                <li>
                    <Link to="/register">
                        📝 Register
                    </Link>
                </li>

            </ul>

        </div>
    );
};

export default Sidebar;