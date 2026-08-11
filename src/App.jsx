import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";
import ProjectDetails from "./pages/ProjectDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";


const Layout = () => {

    const location = useLocation();

    const authPage =
        location.pathname === "/login" ||
        location.pathname === "/register";

    return (
        <>
            {!authPage && <Sidebar />}
            {!authPage && <Navbar />}

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/add-project"
                    element={<AddProject />}
                />

                <Route
                    path="/edit-project/:id"
                    element={<EditProject />}
                />

                <Route
                    path="/project/:id"
                    element={<ProjectDetails />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

            </Routes>
        </>
    );
};


const App = () => {

    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
};


export default App;