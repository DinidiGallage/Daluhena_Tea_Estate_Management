import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <nav className="side-nav">
            <div className="brand">Employee & Attendance Management</div>
            <div className="navbar">
                <ul className="navbar-nav flex-column">
                    <li className="nav-item">
                        <NavLink  className="nav-link" activeClassName="active" to="/" style={{ color: "#1E421D" }}>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact className="nav-link" activeClassName="active" to="/Dashboard" style={{ color: "#1E421D" }}>DashBoard</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/employee/add" style={{ color: "#1E421D" }}>Add Employee</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/EmployeeLeave/add" style={{ color: "#1E421D" }}>Add Employee Leave</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/EmployeeAttendance/add" style={{ color: "#1E421D" }}>Add Employee Attendance</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/all-employees" style={{ color: "#1E421D" }}>All Employees</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;
