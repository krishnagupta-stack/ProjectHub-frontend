import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("Logout Successful");
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="nav-title">
                Project Management System
            </div>

            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>

                {token ? (
                    <>
                        <Link to="/dashboard">
                            Dashboard
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="logout-btn"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                )}

            </div>

        </nav>
    );
};

export default Navbar;