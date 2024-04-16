import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logoicon from '../images/logo.png';
import DashboardIcon from '../icons/dashboard.png';
import HomeIcon from '../icons/home1.png';
import AddNewIcon from '../icons/add.png';

function Header() {
    const location = useLocation();

    // Check if the user is authenticated (logged in)
    const isAuthenticated = localStorage.getItem('token') !== null;

    // Check if the current page is the home page or login page
    const isHomePage = location.pathname === "/";
    const isLoginPage = location.pathname === "/login";

    // Determine whether to display the navigation panel
    const showNavPanel = isAuthenticated && !isHomePage && !isLoginPage;

    // Logout function
    const handleLogout = () => {
        // Clear token from localStorage or perform any other logout logic
        localStorage.removeItem('token');
        // Redirect to the login page
        window.location.href = '/login';
    };

    return (
        <div>
            {showNavPanel && (
                <nav className="side-nav" style={{ overflowY: 'hidden', maxHeight: 'calc(100vh - 20px)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                        <img src={logoicon} alt="logoIcon" style={{ width: '80px', height: '80px' }} /> 
                    </div>
                    <div className="brand" style={{ color: "#1E421D", fontWeight: "bold", textAlign: "center", fontSize: "18px", marginBottom: "10px" }}>
                        Employee & Attendance Management
                    </div>
                    <div className="navbar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink  exact className="nav-link" activeClassName="active" to="/">
                                    <img src={HomeIcon} alt="Home" className="nav-icon home-icon" />
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/Dashboard">
                                    <img src={DashboardIcon} alt="Dashboard" className="nav-icon" />
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/employee/add">
                                    <img src={AddNewIcon} alt="add" className="nav-icon add-icon" />
                                    Employee
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/EmployeeLeave/add">
                                    <img src={AddNewIcon} alt="add" className="nav-icon add-icon" />
                                    New Leave
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/EmployeeAttendance/add">
                                    <img src={AddNewIcon} alt="add" className="nav-icon add-icon" />
                                    Attendance
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="logout-btn" style={{ marginLeft: '68px',marginRight: "68px" , textAlign: "center" }}>
                        <button onClick={handleLogout} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff" }}>Logout</button>
                    </div>
                </nav>
            )}
        </div>
    );
}

export default Header;
